interface Props {
  width?: string;
  height?: string;
  border?: string;
}

export const Loader = ({ width='w-4', height='h-4', border='border-3'}: Props) => {
  return (
    <div className={`relative flex ${width} ${height} items-center justify-center fade-in`}>
        <div className={`absolute inset-0 rounded-full ${ border } border-blue-100`} />

        <div className={`absolute inset-0 animate-spin rounded-full ${ border } border-transparent border-t-blue-600`} />

        <div className="h-1 w-1 rounded-full bg-white" />
    </div>
  )
}

