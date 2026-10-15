import AuthGuard from "@/features/auth/components/AuthGuard";
import MyOrdersPage from "@/features/pedidos/components/MyOrdersPage";

export default function MisPedidosRoute() {
  return (
    <AuthGuard>
      <MyOrdersPage />
    </AuthGuard>
  );
}
