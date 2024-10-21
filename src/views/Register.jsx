import { FormRegister } from "../components/auth/FormRegister";
import pets_register from "../assets/pet_register.png";

export const Register = () => {
  return (
    <>
      <main className="container-fluid lg:flex justify-between h-screen">
        <section className="flex flex-col justify-center items-center bg-slate-100 text-slate-600 lg:-me-4 lg:py-3 rounded-e-2xl z-10 lg:w-full min-h-screen">
          <h1 className="font-bold text-2xl">Crear cuenta</h1>
          <FormRegister />
        </section>
        <section className="hidden lg:flex w-full min-h-screen bg-black justify-center items-center">
          <img
            className="object-cover h-full w-full"
            src={pets_register}
            alt="image of pets in user registration"
          />
        </section>
      </main>
    </>
  );
};
