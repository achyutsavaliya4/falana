"use client";

import { checkArray, hasKeys } from "@/commonJS/commonHelper/commonHelper";
import { mainMenu } from "@/commonJson/modules/auth/navbar";
import { RootState } from "@/redux";
import { setUserRolePermission } from "@/redux/actions/userAction/userAction";
import { dispatch } from "@/redux/store";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

const NavMenuBar = () => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const { userDetails } = useSelector((state: RootState) => state.auth);

  const [menus, setMenus] = useState<any[]>([]);
  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null);

  const permissionIndex = useMemo(() => {
    if (typeof localStorage === "undefined") return;
    const localTenantId = localStorage.getItem("tenant_id")?.trim();
    const tenant = userDetails?.tenants?.find(
      (t) => String(t.tenant_id) === localTenantId,
    );
    if (!tenant?.tenant_id) return {};
    const localFacilityId = localStorage.getItem("facility_id")?.trim();
    const facility = tenant?.facilities?.find(
      (f) => String(f?.facility_id) === localFacilityId,
    );
    if (!facility?.role_id) {
      const defaultRoles = Object.keys(tenant?.roles || {});
      return tenant?.roles[defaultRoles?.[0]]?.permission_index || {};
    }
    return tenant?.roles[facility?.role_id]?.permission_index || {};
  }, [userDetails]);

  const checkPermissions = () => {
    if (!permissionIndex) return [];
    const allowedModules: any[] = [];

    mainMenu.map((ele) => {
      const sub_mod: any[] = [];
      let isAllowed = false;

      if (checkArray(ele?.child)) {
        ele?.child?.map((sub_menu) => {
          isAllowed =
            permissionIndex[
              [ele?.fieldKey, sub_menu?.fieldKey, "view"].join(".")
            ];
          if (isAllowed) sub_mod.push(sub_menu);
        });

        if (checkArray(sub_mod)) {
          allowedModules.push({
            ...ele,
            child: sub_mod,
          });
        }
      } else {
        isAllowed =
          permissionIndex[[ele?.fieldKey, ele?.fieldSubKey, "view"].join(".")];
        if (isAllowed) {
          allowedModules.push({
            ...ele,
            child: [],
          });
        }
      }
    });

    setMenus(allowedModules);
  };

  const handleHideToggleMenu = () => {
    const menu = document.getElementById("main-menu");
    if (menu) {
      menu.classList.toggle("header-toggled");
    }
  };

  const normalizePath = (p?: string) => {
    if (!p) return "";
    return p.split("?")[0].replace(/\/$/, "");
  };

  const isRouteActive = (pathname: string, href?: string) => {
    const cleanPath = normalizePath(pathname);
    const cleanHref = normalizePath(href);

    if (!cleanHref) return false;

    return cleanPath === cleanHref || cleanPath.startsWith(cleanHref + "/");
  };

  const isMenuActive = (pathname: string, menu: any) => {
    if (checkArray(menu?.child)) {
      return menu.child.some((c: any) =>
        isRouteActive(pathname, c?.redirectUrl),
      );
    }

    return isRouteActive(pathname, menu?.redirectUrl);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setOpenDropdownKey(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // close dropdown on route change
  useEffect(() => {
    setOpenDropdownKey(null);
  }, [pathname]);

  useEffect(() => {
    checkPermissions();
  }, [userDetails]);

  useEffect(() => {
    if (hasKeys(permissionIndex)) {
      dispatch(setUserRolePermission(permissionIndex));
    }
  }, [permissionIndex]);

  return (
    <nav id="main-menu" className="mk-navbar">
      <div className="nav-container" ref={menuRef}>
        <div className="mk-navbar-inner">
          <ul className="mk-nav-list">
            {menus?.map((ele: any, i: number) => {
              const hasChild = checkArray(ele?.child);
              const isOpen = openDropdownKey === ele?.fieldKey;
              const isActive = isMenuActive(pathname, ele);
              return (
                <li
                  key={"mainli" + i}
                  className={clsx("mk-nav-item", isActive && "active")}
                >
                  {hasChild ? (
                    <div
                      className="mk-dropdown-wrapper"
                      onMouseEnter={() => setOpenDropdownKey(ele?.fieldKey)}
                      onMouseLeave={() => setOpenDropdownKey(null)}
                    >
                      <button
                        type="button"
                        className="mk-nav-link has-dropdown"
                      >
                        <Image
                          width={20}
                          height={20}
                          src={ele.imageUrl}
                          alt="menu-icon"
                          className="mk-nav-icon"
                        />
                        <span className="mk-nav-title">{ele.title}</span>

                        <Image
                          width={16}
                          height={16}
                          src={
                            process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                            "/icons/down-arrow-black.svg"
                          }
                          alt="arrow"
                          className="mk-nav-arrow"
                        />
                      </button>

                      <div className={clsx("mk-submenu", isOpen && "show")}>
                        <ul className="mk-submenu-list">
                          {ele?.child?.map((item: any) => (
                            <li key={item.title} className="mk-submenu-item">
                              <Link
                                href={item.redirectUrl}
                                className={clsx(
                                  "mk-submenu-link",
                                  isRouteActive(pathname, item.redirectUrl) &&
                                    "active",
                                )}
                                onClick={() => {
                                  setOpenDropdownKey(null);
                                  handleHideToggleMenu();
                                }}
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={ele.redirectUrl ?? "/"}
                      className="mk-nav-link"
                      onClick={() => {
                        setOpenDropdownKey(null);
                        handleHideToggleMenu();
                      }}
                    >
                      <Image
                        width={18}
                        height={18}
                        src={ele.imageUrl}
                        alt="menu-icon"
                        className="mk-nav-icon"
                      />
                      <span className="mk-nav-title">{ele.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMenuBar;
