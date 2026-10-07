import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex justify-center text-gray-500 text-sm  mb-6">
        <Link href="/">
         <span className="font-title font-bold antialiased">Teslo | Shop </span>
         <span>© { new Date().getFullYear() } derechos reservados</span>
        </Link>

        <Link href="/" className="mx-3">
          Privacidad & Legal
        </Link>

        <Link href="/" className="mx-3">
          Ubicaciones
        </Link>
    </div>
  )
}

