import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Error 404</p>
      <h1 className="mt-3 text-4xl font-extrabold text-slate-900">No encontramos esa página</h1>
      <p className="mt-4 max-w-lg text-slate-600">La dirección puede haber cambiado o ya no estar disponible.</p>
      <Link href="/" className="mt-7 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-600">Volver al inicio</Link>
    </main>
  );
}
