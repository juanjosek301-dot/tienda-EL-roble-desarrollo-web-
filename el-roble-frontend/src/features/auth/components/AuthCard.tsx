import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-blue-50 px-4 py-12 sm:px-6">
      <section className="w-full max-w-md rounded-2xl border border-blue-100 bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-7 text-center">
          <span className="text-3xl" aria-hidden="true">🏪</span>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-700">El Roble</p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900">{title}</h1>
          <p className="mt-2 text-slate-600">{description}</p>
        </div>
        {children}
      </section>
    </div>
  );
}
