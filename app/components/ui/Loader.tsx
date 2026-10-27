export const Loader = () => {
  return (
    <div className="relative flex h-4 w-4 items-center justify-center fade-in">
        <div className="absolute inset-0 rounded-full border-3 border-blue-100" />

        <div className="absolute inset-0 animate-spin rounded-full border-3 border-transparent border-t-blue-600" />

        <div className="h-1 w-1 rounded-full bg-white" />
    </div>
  )
}

