export function OrderSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Título */}
      <div className="mb-8 h-9 w-48 rounded-lg bg-gray-200" />

      <div className="grid grid-cols-1 items-start gap-10 sm:grid-cols-2">

        {/* Productos */}
        <div className="mt-5 flex flex-col">

          {/* Estado */}
          <div className="mb-5 flex h-11 items-center rounded-lg bg-gray-200 px-3.5">
            <div className="size-7 rounded-full bg-gray-300" />
            <div className="ml-3 h-4 w-20 rounded bg-gray-300" />
          </div>

          {/* Producto 1 */}
          <div className="mb-5 flex">
            <div className="mr-5 h-25 w-25 shrink-0 rounded bg-gray-200" />

            <div className="flex flex-col justify-center gap-3">
              <div className="h-4 w-48 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-4 w-40 rounded bg-gray-200" />
            </div>
          </div>

          {/* Producto 2 */}
          <div className="mb-5 flex">
            <div className="mr-5 h-25 w-25 shrink-0 rounded bg-gray-200" />

            <div className="flex flex-col justify-center gap-3">
              <div className="h-4 w-44 rounded bg-gray-200" />
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-4 w-36 rounded bg-gray-200" />
            </div>
          </div>

          {/* Producto 3 */}
          <div className="mb-5 flex">
            <div className="mr-5 h-25 w-25 shrink-0 rounded bg-gray-200" />

            <div className="flex flex-col justify-center gap-3">
              <div className="h-4 w-52 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-4 w-40 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Resumen */}
        <div className="rounded-xl p-7 shadow-xl">

          {/* Dirección */}
          <div className="mb-2 h-7 w-52 rounded bg-gray-200" />

          <div className="mb-10 flex flex-col gap-3">
            <div className="h-5 w-36 rounded bg-gray-200" />
            <div className="h-4 w-56 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-4 w-48 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-200" />
          </div>

          {/* Separador */}
          <div className="mb-10 h-0.5 w-full rounded bg-gray-100" />

          {/* Resumen de orden */}
          <div className="mb-2 h-7 w-48 rounded bg-gray-200" />

          <div className="grid grid-cols-2 gap-y-4">

            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="ml-auto h-4 w-24 rounded bg-gray-200" />

            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="ml-auto h-4 w-20 rounded bg-gray-200" />

            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="ml-auto h-4 w-20 rounded bg-gray-200" />

            <div className="mt-5 h-8 w-20 rounded bg-gray-200" />
            <div className="mt-5 ml-auto h-8 w-28 rounded bg-gray-200" />
          </div>

          {/* Estado */}
          <div className="mt-5 mb-2">
            <div className="flex h-11 items-center rounded-lg bg-gray-200 px-3.5">
              <div className="size-7 rounded-full bg-gray-300" />
              <div className="ml-3 h-4 w-20 rounded bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}