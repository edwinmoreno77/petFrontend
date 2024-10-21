import { FormLogin } from "../components/auth/FormLogin";
import pets_register from "../assets/pet_register.png";

export function Login() {
  return (
    <main className="container-fluid lg:flex justify-between bg-slate-100  h-screen">
      <FormLogin />
      <section className="hidden lg:flex w-full bg-black justify-center items-center">
        <img
          className="object-cover h-full w-full"
          src={pets_register}
          alt="image of pets in user registration"
        />
      </section>
    </main>
  );
}
