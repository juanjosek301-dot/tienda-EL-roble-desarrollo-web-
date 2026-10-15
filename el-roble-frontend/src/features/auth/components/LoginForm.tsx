"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { AuthServiceError } from "../services/authService";
import AuthCard from "./AuthCard";

function getNextPath() {
  const requestedPath = new URLSearchParams(window.location.search).get("next");
  return requestedPath?.startsWith("/") && !requestedPath.startsWith("//") ? requestedPath : "/";
}

export default function LoginForm() {
  const router = useRouter();
  const { login, user, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [credentialsError, setCredentialsError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) router.replace(getNextPath());
  }, [isLoading, user, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setCredentialsError("");
    setIsSubmitting(true);
    try {
      await login({ email, password });
      router.push(getNextPath());
    } catch (cause) {
      if (cause instanceof AuthServiceError && cause.status === 401) {
        setCredentialsError(cause.message);
      } else {
        setError(cause instanceof Error ? cause.message : "No fue posible iniciar sesión.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthCard title="Ingresar" description="Accede a tu cuenta para continuar con tu pedido.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">Correo electrónico</label><input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="tu@correo.com" /></div>
        <div><label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-800">Contraseña</label><input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={Boolean(credentialsError)} aria-describedby={credentialsError ? "credentials-error" : undefined} className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="Tu contraseña" />{credentialsError && <p id="credentials-error" role="alert" className="mt-1 text-sm text-red-700">{credentialsError}</p>}</div>
        <button type="submit" disabled={isSubmitting || isLoading} className="w-full rounded-lg bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">{isSubmitting ? "Ingresando…" : "Ingresar"}</button>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">¿No tienes una cuenta? <Link href="/registro" className="font-semibold text-blue-700 hover:underline">Regístrate</Link></p>
    </AuthCard>
  );
}
