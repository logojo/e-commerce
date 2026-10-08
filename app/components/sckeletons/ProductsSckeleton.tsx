

export const ProductsSckeleton = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="aspect-3/4 animate-pulse rounded-xl bg-zinc-200"
          />
        ))}
      </div>
    </div>
  );
}

