"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { UserRole } from "../domain/types";
import { useAuth } from "../hooks/useAuth";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const hasRequiredRole = !requiredRole || user?.role === requiredRole;

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    } else if (!hasRequiredRole) {
      router.replace("/mis-pedidos");
    }
  }, [hasRequiredRole, isLoading, pathname, router, user]);

  if (isLoading || !user || !hasRequiredRole) {
    return (
      <div className="flex min-h-[45vh] items-center justify-center px-4 text-center" role="status">
        <p className="rounded-xl bg-white px-6 py-4 font-medium text-slate-700 shadow-sm">
          {isLoading ? "Comprobando sesión…" : "Verificando permisos…"}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
