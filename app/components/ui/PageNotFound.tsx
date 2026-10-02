import Image from "next/image"
import Link from "next/link"

export const PageNotFound = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row h-200 w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className="font-title font-bold antialiased text-9xl">404</h2>
        <p className="font-semibold text-xl">Whoops!! Página no encontrada</p>
        <p className="font-light">
            <span>Puede regresar al </span>
            <Link href="/" className="hover:underline transition-all">Inicio</Link>
        </p>
      </div>

      <div className="px-5 mx-5">
         <Image 
            src="/imgs/starman_750x750.png"
            alt="Starman"
            className="p-5 sm:p-0"
            width={550}
            height={550}
            loading="eager"
         />
      </div>
    </section>
  )
}
