interface OrderSummaryProps {
  total: number;
}

export default function OrderSummary({ total }: OrderSummaryProps) {
  const formattedTotal = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(total);

  return (
    <p className="rounded-xl bg-blue-50 p-4 text-right text-lg text-slate-800">
      Total estimado: <strong className="text-blue-800">{formattedTotal}</strong>
    </p>
  );
}
