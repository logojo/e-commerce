import Link from "next/link";
import { IoArrowForwardOutline, IoBagHandleOutline, IoCarOutline, IoCartOutline, IoCheckmarkOutline, IoHeartOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

const benefits = [
  {
    icon: IoCarOutline,
    title: "Envíos seguros",
    description: "Recibe tus compras en casa",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Compra protegida",
    description: "Tus datos siempre seguros",
  },
  {
    icon: IoHeartOutline,
    title: "Selección especial",
    description: "Productos elegidos para ti",
  },
];

const recommendations = [
  {
    category: "LO MÁS VENDIDO",
    name: "Favoritos de la comunidad",
    description: "Descubre lo que todos están eligiendo.",
    href: "/productos?sort=popular",
    color: "bg-orange-100",
    symbol: "✳",
  },
  {
    category: "NOVEDADES",
    name: "Recién llegados",
    description: "Encuentra algo nuevo para ti.",
    href: "/productos?sort=newest",
    color: "bg-emerald-100",
    symbol: "✦",
  },
  {
    category: "PARA TI",
    name: "Explora la colección",
    description: "Inspírate y encuentra tus favoritos.",
    href: "/productos",
    color: "bg-violet-100",
    symbol: "❋",
  },
];

export default function() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#20251f] fade-in">
      {/* Header */}
      <header className="border-b border-black/6 bg-white">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition hover:bg-black/5"
          >
            <IoBagHandleOutline size={17} />
            <span>Seguir comprando</span>
          </Link>
        </div>
      </header>

      {/* Empty cart */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center sm:mb-10 sm:h-56 sm:w-56">
            <div className="absolute inset-0 rounded-full bg-[#e8eee4]" />
            <div className="absolute left-4 top-8 h-9 w-9 rounded-full bg-[#d5a66c] opacity-80" />
            <div className="absolute bottom-7 right-5 h-6 w-6 rounded-full bg-emerald-800/20" />

            <div className="relative flex h-32 w-32 -rotate-6 items-center justify-center rounded-4xl border border-white/80 bg-white shadow-[0_18px_50px_-18px_rgba(30,55,35,0.25)] sm:h-36 sm:w-36">
              <IoBagHandleOutline
                className="h-16 w-16 text-emerald-800"
                strokeWidth={1.15}
                aria-hidden="true"
              />
              <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#e8eee4] bg-[#d5a66c] text-white">
                <span className="text-lg leading-none">0</span>
              </span>
            </div>

            <span className="absolute right-5 top-8 text-2xl text-emerald-800">
              ✳
            </span>
            <span className="absolute bottom-9 left-5 text-xl text-[#bd8950]">
              ✦
            </span>
          </div>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-emerald-800">
            Tu próxima compra comienza aquí
          </p>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl">
            Tu carrito está
            <br />
            <span className="font-serif font-normal italic text-emerald-800">
              esperando algo especial.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base leading-7 text-neutral-500 sm:text-lg">
            Parece que todavía no has agregado nada. Explora nuestra colección
            y encuentra eso que estabas buscando.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-emerald-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
            >
              Explorar productos
              <IoArrowForwardOutline
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/10 bg-white px-7 py-3.5 text-sm font-semibold transition hover:border-black/25 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800"
            >
              Volver al inicio
            </Link>
          </div>

          <p className="mt-5 text-xs text-neutral-400">
            Sin prisa. Encuentra algo que realmente te encante.
          </p>
        </div>

        {/* Benefits */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 border-y border-black/[0.07] py-7 sm:mt-20 sm:grid-cols-3 sm:gap-8 sm:py-9">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-3 sm:justify-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-900/6">
                <Icon size={19} className="text-emerald-800" />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-xs text-neutral-500">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <section className="mx-auto mt-14 max-w-6xl sm:mt-20">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-800">
                Un buen lugar para empezar
              </p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Inspírate un poco
              </h2>
            </div>

            <Link
              href="/productos"
              className="hidden items-center gap-1 text-sm font-medium text-emerald-900 transition hover:opacity-70 sm:inline-flex"
            >
              Ver todo <IoArrowForwardOutline size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {recommendations.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group rounded-2xl border border-black/6 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-900/20 hover:shadow-lg hover:shadow-black/4 sm:p-6"
              >
                <div
                  className={`mb-6 flex h-28 items-center justify-center rounded-xl ${item.color}`}
                >
                  <span className="text-5xl text-emerald-950 transition-transform duration-300 group-hover:scale-110">
                    {item.symbol}
                  </span>
                </div>

                <p className="text-[10px] font-bold tracking-[0.18em] text-emerald-800">
                  {item.category}
                </p>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <h3 className="font-semibold tracking-tight">
                    {item.name}
                  </h3>
                  <IoArrowForwardOutline
                    size={17}
                    className="shrink-0 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-800"
                  />
                </div>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>

          <Link
            href="/productos"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold sm:hidden"
          >
            Ver todos los productos <IoArrowForwardOutline size={16} />
          </Link>
        </section>
      </section>

     
    </main>
  );
}