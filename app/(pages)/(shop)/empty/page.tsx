import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function() {
  return (
    <div className="flex flex-col justify-center items-center h-200">
      <IoCartOutline size={150} className="mx-5" />
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Tu carrito es vacío</h1>
      </div>

      <Link href="/" className="underline"> 
        Regresar
      </Link>
      
    </div>
  );
}