import type { OrderContact, PaymentMethod } from "../domain/types";

interface PaymentAndNotesProps {
  paymentMethod: PaymentMethod | "";
  observations: string;
  paymentError?: string;
  onPaymentChange: (value: PaymentMethod) => void;
  onObservationsChange: (value: OrderContact["observaciones"]) => void;
}

export default function PaymentAndNotes({
  paymentMethod,
  observations,
  paymentError,
  onPaymentChange,
  onObservationsChange,
}: PaymentAndNotesProps) {
  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-blue-900">3. Método de pago</h2>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="flex items-center gap-3 rounded-xl border border-blue-100 p-4">
          <input type="radio" name="metodo-pago" value="efectivo" checked={paymentMethod === "efectivo"} onChange={() => onPaymentChange("efectivo")} />
          Efectivo contra entrega
        </label>
        <label className="flex items-center gap-3 rounded-xl border border-blue-100 p-4">
          <input type="radio" name="metodo-pago" value="nequi" checked={paymentMethod === "nequi"} onChange={() => onPaymentChange("nequi")} />
          Nequi / Daviplata
        </label>
      </div>
      {paymentError && <p className="mt-2 text-sm text-red-700" role="alert">{paymentError}</p>}
      <label htmlFor="observaciones" className="mt-6 block font-semibold text-slate-800">Observaciones <span className="font-normal text-slate-500">(opcional)</span></label>
      <textarea id="observaciones" value={observations} onChange={(event) => onObservationsChange(event.target.value)} rows={4} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Indicaciones adicionales para la entrega" />
    </section>
  );
}
