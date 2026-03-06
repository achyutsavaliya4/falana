"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type BreadCrumbItem = {
  title: string;
  path: string;
};

interface BreadCrumbProps {
  breadCrumsPath?: BreadCrumbItem[];
}

const formatTitle = (segment: string) => {
  if (!segment) return "";

  const parts = segment.split("-").map((p) => {
    if (p === "and") return "&";
    return p.charAt(0).toUpperCase() + p.slice(1);
  });

  return parts.join(" ");
};

const BreadCrumbs = ({ breadCrumsPath }: BreadCrumbProps) => {
  const pathname = usePathname();

  const [pathArr, setPathArr] = useState<BreadCrumbItem[]>([
    { title: "", path: "/" },
  ]);

  const computedCrumbs = useMemo<BreadCrumbItem[]>(() => {
    // if custom breadcrumbs provided, use them
    if (breadCrumsPath?.length) return breadCrumsPath;

    const safePath = pathname ?? "/";
    const segments = safePath.split("/").filter(Boolean);

    // always start with home
    const crumbs: BreadCrumbItem[] = [{ title: "", path: "/" }];

    let prev = "";
    segments.forEach((seg) => {
      prev += `/${seg}`;
      crumbs.push({
        title: formatTitle(seg),
        path: prev,
      });
    });

    return crumbs;
  }, [breadCrumsPath, pathname]);

  useEffect(() => {
    setPathArr(computedCrumbs);
  }, [computedCrumbs]);

  return (
    <div className={`breadcums d-flex align-items-center p-0`}>
      {pathArr.map((data, ind) => {
        const isLast = ind === pathArr.length - 1;
        return (
          <div
            key={`${data.path}-${ind}`}
            className="d-flex align-items-center gap-2"
          >
            {/* HOME ICON */}
            {ind === 0 ? (
              <>
                <Link
                  href={data.path}
                  className="home-link d-flex align-items-center"
                  onClick={(e) => {
                    if (isLast) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                >
                  <Image
                    width={24}
                    height={24}
                    src={`${process.env.NEXT_PUBLIC_IMAGES_ASSETS}/icons/home-grey.svg`}
                    alt="home-icon"
                    unoptimized
                  />
                </Link>

                {!isLast && (
                  <Image
                    width={9}
                    height={9}
                    src={`${process.env.NEXT_PUBLIC_IMAGES_ASSETS}/icons/right-arrow-grey.svg`}
                    alt="arrow-icon"
                    unoptimized
                  />
                )}
              </>
            ) : (
              <>
                <Link
                  href={data.path}
                  className={`breadcums-title d-flex align-items-center ps-2 ${isLast ? "active" : ""}`}
                  onClick={(e) => {
                    if (isLast) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                >
                  <span>{data.title}</span>
                </Link>

                {!isLast && (
                  <Image
                    width={9}
                    height={9}
                    src={`${process.env.NEXT_PUBLIC_IMAGES_ASSETS}/icons/right-arrow-grey.svg`}
                    alt="arrow-icon"
                    unoptimized
                  />
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
