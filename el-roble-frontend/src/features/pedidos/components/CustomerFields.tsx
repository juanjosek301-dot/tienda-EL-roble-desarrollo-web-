import type { OrderContact, OrderFieldErrors } from "../domain/types";

interface CustomerFieldsProps {
  contact: OrderContact;
  errors: OrderFieldErrors;
  onChange: (field: keyof OrderContact, value: string) => void;
}

const fields = [
  { name: "nombre", label: "Nombre completo", type: "text" },
  { name: "email", label: "Correo electrónico", type: "email" },
  { name: "telefono", label: "Teléfono", type: "tel" },
  { name: "direccion", label: "Dirección de entrega", type: "text" },
] as const;

export default function CustomerFields({ contact, errors, onChange }: CustomerFieldsProps) {
  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-blue-900">2. Información del cliente</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const error = errors[field.name];
          const errorId = `${field.name}-error`;
          return (
            <div key={field.name}>
              <label htmlFor={field.name} className="mb-2 block font-semibold text-slate-800">{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={contact[field.name]}
                onChange={(event) => onChange(field.name, event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-300" : "border-slate-300 focus:ring-blue-500"}`}
              />
              {error && <p id={errorId} className="mt-1 text-sm text-red-700" role="alert">{error}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
