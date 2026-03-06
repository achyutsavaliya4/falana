"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { RootState } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import {
  checkArray,
  checkString,
  hasKeys,
} from "@/commonJS/commonHelper/commonHelper";
import { Tenant } from "@/redux/sagas/handlers/authHandler/authHandlerInterface";
import { userLogout } from "@/redux/actions/authAction/authAction";
import Link from "next/link";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state: RootState) => state.auth);
  const [currentTenant, setCurrentTenant] = useState<Tenant>();
  const onLogout = () => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (refreshToken) {
      dispatch(userLogout({ refresh_token: refreshToken }));
    }
  };
  const convertShortUsername = useMemo(() => {
    const name = userDetails?.profile?.name || "User";

    if (!checkString(name)) return "";
    return name
      ?.split(" ")
      ?.reduce((acc, name) => acc + name?.substring(0, 1), "");
  }, [userDetails?.profile?.name]);

  useEffect(() => {
    const localTenantId = localStorage.getItem("tenant_id")?.trim();
    const matchedTenant = userDetails?.tenants?.find(
      (t) => String(t.tenant_id) === localTenantId,
    );
    if (hasKeys(matchedTenant)) {
      setCurrentTenant(matchedTenant);
    }
  }, [userDetails?.tenants]);

  return (
    <nav className="navbar top-navbar">
      <div className="nav-container">
        <div className="d-flex justify-content-between align-items-center navbar-content">
          <Link className="navbar-brand" href="/">
            <Image
              width={124}
              height={33}
              src={process.env.NEXT_PUBLIC_IMAGES_ASSETS + "/medkart-logo.webp"}
              alt="Medkart Logo"
              className="cover"
            />
            <span className="text-light fs-5 header">MK Retail Excellence</span>
          </Link>
          <div className="d-flex align-items-center">
            <Dropdown as="div" className="d-flex align-items-center p-2">
              <Dropdown.Toggle className="position-relative text-primary navbar-custom-dropdown">
                {currentTenant?.tenant_name || "Tenament"}
                <Image
                  width={18}
                  height={18}
                  src={
                    process.env.NEXT_PUBLIC_IMAGES_ASSETS +
                    "/icons/down-arrow-white.svg"
                  }
                  alt="Select Tenant"
                  className="position-absolute top-50 start-100 translate-middle cover select-tenant"
                />
              </Dropdown.Toggle>
              {checkArray(userDetails?.tenants) ? (
                <Dropdown.Menu className="tenant-dropdown">
                  {userDetails?.tenants?.map((val, idx) => {
                    if (val?.tenant_name) {
                      return (
                        <Dropdown.Item
                          onClick={() => {
                            setCurrentTenant(val);
                          }}
                          key={"idx" + idx}
                          as="div"
                        >
                          <span>{val?.tenant_name}</span>
                        </Dropdown.Item>
                      );
                    }
                  })}
                </Dropdown.Menu>
              ) : (
                <></>
              )}
            </Dropdown>
            <Dropdown as="div" drop="down" className="profile">
              <Dropdown.Toggle
                as="button"
                className="profile-button"
                id="profile-toggle"
                bsPrefix="dropdown-toggle-no-caret"
              >
                {checkString(userDetails?.profile?.name) && (
                  <span className="d-block username rounded-circle">
                    {convertShortUsername?.substring(0, 2)}
                  </span>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu as="div">
                <div className="d-flex flex-column align-items-center border-bottom px-5 py-3">
                  <div>
                    {checkString(userDetails?.profile?.name) && (
                      <span>{userDetails?.profile?.name}</span>
                    )}
                  </div>
                  <div>
                    {checkString(userDetails?.profile?.email) && (
                      <span>{userDetails?.profile?.email}</span>
                    )}
                  </div>
                </div>
                <Dropdown.Item
                  as="div"
                  className="d-flex justify-content-center logout"
                  onClick={() => onLogout()}
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
