
type LoadingProps = {
  message?: string;
  fullScreen?: boolean;
};

export default function Loading({
  message = "Cargando...",
  fullScreen = true,
}: LoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen" : "min-h-40 py-10"
      }`}
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-blue-100" />

        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-800" />

        <div className="h-3 w-3 rounded-full bg-blue-800" />
      </div>

      <p className="text-sm font-medium text-gray-600">
        {message}
      </p>

      <span className="sr-only">Por favor, espera.</span>
    </div>
  );
}