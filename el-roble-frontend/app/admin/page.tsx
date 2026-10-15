import AuthGuard from "@/features/auth/components/AuthGuard";
import AdminCatalog from "@/features/productos/components/AdminCatalog";

export default function AdminRoute() {
  return (
    <AuthGuard requiredRole="admin">
      <AdminCatalog />
    </AuthGuard>
  );
}
