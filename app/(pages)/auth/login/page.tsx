import { Suspense } from "react";
import LoginForm from "./ui/LoginForm";
import Loading from "@/app/loading";


export default function () {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
     
       <h1 className="font-title text-4xl mb-5">Ingresar</h1>

      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}