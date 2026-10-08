"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    // En producción puedes enviar el error a Sentry,
    // Datadog, etc.
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-zinc-50 px-6 py-16">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <section
          role="alert"
          aria-labelledby="error-title"
          className="w-full text-center"
        >
          {/* Icon */}
          <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/60">
            <svg
              className="size-9 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86l-8.1 14a2 2 0 001.73 3h16.16a2 2 0 001.73-3l-8.1-14a2 2 0 00-3.46 0z"
              />
            </svg>
          </div>

          {/* Content */}
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-500">
            Algo salió mal
          </p>

          <h1
            id="error-title"
            className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl"
          >
            No pudimos cargar esta página
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-zinc-600">
            Ocurrió un problema inesperado al procesar tu solicitud.
            Puedes intentar nuevamente o regresar al inicio de la tienda.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-950 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            >
              Intentar nuevamente
            </button>

            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-700 shadow-sm transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
            >
              Volver al inicio
            </Link>
          </div>

          {/* Technical information */}
          {error.digest && (
            <p className="mt-8 text-xs text-zinc-400">
              Código de referencia:{" "}
              <span className="font-mono">{error.digest}</span>
            </p>
          )}
        </section>
      </div>
    </main>
  );
}