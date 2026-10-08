export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Galería */}
        <div className="col-span-1 md:col-span-2">

          {/* Mobile */}
          <div className="block md:hidden">
            <div className="aspect-square w-full rounded-xl bg-gray-200" />
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">

              {/* Imagen principal */}
              <div className="col-span-2 aspect-square rounded-xl bg-gray-200" />

              {/* Thumbnails */}
              <div className="flex gap-3">
                <div className="size-20 rounded-lg bg-gray-200" />
                <div className="size-20 rounded-lg bg-gray-200" />
                <div className="size-20 rounded-lg bg-gray-200" />
              </div>

            </div>
          </div>
        </div>

        {/* Información del producto */}
        <div className="col-span-1 px-5">

          {/* Título */}
          <div className="h-7 w-3/4 rounded-md bg-gray-200" />

          {/* Precio */}
          <div className="mt-3 mb-5 ml-auto h-6 w-28 rounded-md bg-gray-200" />

          {/* Selector de tallas */}
          <div className="mb-6">
            <div className="mb-3 h-4 w-16 rounded bg-gray-200" />

            <div className="flex gap-2">
              <div className="h-10 w-10 rounded-lg bg-gray-200" />
              <div className="h-10 w-10 rounded-lg bg-gray-200" />
              <div className="h-10 w-10 rounded-lg bg-gray-200" />
              <div className="h-10 w-10 rounded-lg bg-gray-200" />
            </div>
          </div>

          {/* Selector de cantidad */}
          <div className="mb-5">
            <div className="mb-3 h-4 w-20 rounded bg-gray-200" />

            <div className="flex h-10 w-32 items-center justify-between rounded-lg bg-gray-200 px-3">
              <div className="size-5 rounded bg-gray-300" />
              <div className="h-4 w-6 rounded bg-gray-300" />
              <div className="size-5 rounded bg-gray-300" />
            </div>
          </div>

          {/* Botón */}
          <div className="my-5 h-11 w-full rounded-lg bg-gray-200" />

          {/* Descripción */}
          <div className="mb-3 h-5 w-28 rounded bg-gray-200" />

          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
            <div className="h-4 w-4/6 rounded bg-gray-200" />
          </div>

        </div>
      </div>
    </div>
  );
}