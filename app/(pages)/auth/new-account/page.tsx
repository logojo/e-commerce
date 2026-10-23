import FormRegister from './ui/FormRegister';

export default function () {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">

      <h1 className="font-title text-4xl mb-5">Crear cuenta</h1>

      <FormRegister />
    </div>
  );
}