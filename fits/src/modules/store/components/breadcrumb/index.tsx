"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BreadcrumbProducts() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean).splice(1);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    ...segments.map((segment, i) => {
      const href = "/" + segments.slice(0, i + 1).join("/");
      const name = decodeURIComponent(segment)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      return { name, href };
    }),
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <div key={crumb.href} className="inline-flex items-center gap-1.5">
              <BreadcrumbItem>
                {index === 0 ? (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>
                      <HomeIcon size={18} />
                    </Link>
                  </BreadcrumbLink>
                ) : isLast ? (
                  <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
