"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import AuthCard from "./AuthCard";

export default function RegisterForm() {
  const router = useRouter();
  const { register, user, isLoading } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) router.replace("/");
  }, [isLoading, user, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password !== confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setIsSubmitting(true);
    try {
      await register({ nombre, email, password });
      setSuccess(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No fue posible crear la cuenta.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard title={success ? "Cuenta creada" : "Crear cuenta"} description={success ? "Tu registro se completó correctamente." : "Regístrate para guardar y consultar tus pedidos."}>
      {success ? <div className="space-y-4 text-center"><p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-800">Ya puedes ingresar con tu correo y contraseña.</p><Link href="/login" className="inline-block rounded-lg bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-600">Ir a ingresar</Link></div> : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label htmlFor="nombre" className="mb-2 block text-sm font-semibold text-slate-800">Nombre completo</label><input id="nombre" name="nombre" type="text" autoComplete="name" minLength={3} required value={nombre} onChange={(event) => setNombre(event.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="Tu nombre" /></div>
          <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">Correo electrónico</label><input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="tu@correo.com" /></div>
          <div><label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-800">Contraseña</label><input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="Mínimo 8 caracteres" /></div>
          <div><label htmlFor="confirmar-password" className="mb-2 block text-sm font-semibold text-slate-800">Confirmar contraseña</label><input id="confirmar-password" name="confirmar-password" type="password" autoComplete="new-password" minLength={8} required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="Repite la contraseña" /></div>
          <button type="submit" disabled={isSubmitting || isLoading} className="w-full rounded-lg bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">{isSubmitting ? "Creando cuenta…" : "Crear cuenta"}</button>
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        </form>
      )}
      {!success && <p className="mt-6 text-center text-sm text-slate-600">¿Ya tienes una cuenta? <Link href="/login" className="font-semibold text-blue-700 hover:underline">Inicia sesión</Link></p>}
    </AuthCard>
  );
}
