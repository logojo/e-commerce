import Link from "next/link";
import { IoArrowBack, IoMailOpen } from "react-icons/io5";

export default function () {
    return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] px-4 py-12 text-zinc-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl"
      />

      <section className="relative w-full max-w-2xl">
        <Link
          href="/"
          className="mb-10 flex items-center justify-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-red-400 font-title">
            T
          </span>

          <div>
            <span className="font-title antialiased font-bold">Teslo</span>
            <span> | Shop</span>
          </div>
        </Link>

        <div className="rounded-3xl border border-zinc-200/80 bg-white p-7 shadow-xl shadow-zinc-900/4 sm:p-10">
          <div className="mb-7 flex justify-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
              <IoMailOpen size={39} strokeWidth={1.6} />

              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>
          </div>

          <div className="text-center">
            <span className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Un último paso
            </span>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
              Verifica tu correo electrónico
            </h1>

            <p className="mt-4 text-sm leading-6 text-zinc-500 sm:text-base">
              ¡Tu cuenta está casi lista! Te hemos enviado un correo
              electrónico con un enlace para confirmar tu dirección.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm font-semibold text-zinc-800">
              ¿Qué tienes que hacer?
            </p>

            <ol className="mt-4 space-y-4">
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-zinc-700 ring-1 ring-zinc-200">
                  1
                </span>
                <p className="pt-1 text-sm leading-5 text-zinc-600">
                  Abre la bandeja de entrada de tu correo.
                </p>
              </li>

              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-zinc-700 ring-1 ring-zinc-200">
                  2
                </span>
                <p className="pt-1 text-sm leading-5 text-zinc-600">
                  Busca el mensaje de verificación que te enviamos.
                </p>
              </li>

              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-zinc-700 ring-1 ring-zinc-200">
                  3
                </span>
                <p className="pt-1 text-sm leading-5 text-zinc-600">
                  Haz clic en el enlace para activar tu cuenta.
                </p>
              </li>
            </ol>
          </div>

          <div className="mt-6 rounded-xl bg-amber-50 px-4 py-3">
            <p className="text-sm leading-5 text-amber-900">
              <strong>¿No encuentras el correo?</strong> Revisa también
              las carpetas de spam o correo no deseado.
            </p>
          </div>

          <div className="mt-7 text-center">
            <p className="text-sm text-zinc-500">
              ¿Necesitas ayuda?{" "}
              <Link
                href="/contact"
                className="font-medium text-zinc-900 underline underline-offset-4 hover:text-blue-700"
              >
                Contáctanos
              </Link>
            </p>
          </div>

          <div className="mt-8 border-t border-zinc-100 pt-6 text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
            >
              <IoArrowBack size={16} />
              Volver al inicio de sesión
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-400">
          Protegemos tu cuenta y la seguridad de tu información.
        </p>
      </section>
    </main>
  );
}