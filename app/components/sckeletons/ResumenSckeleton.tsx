export const ResumenSckeleton = () => {
  return (
    <div className="flex-1">
        {/* Título */}
        <div className="mb-3 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />

        {/* Precio */}
        <div className="mb-4 h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />

        {/* QuantitySelector */}
        <div className="h-8 w-28 rounded bg-gray-200 dark:bg-gray-700" />

        {/* Botón remover */}
        <div className="mt-3 h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}

