import { CreatePetForm } from "../components/profile/CreatePetForm";

export const AddPets = () => {
  return (
    <main className="container-fluid bg-slate-100 flex flex-col items-center  min-h-screen p-5 transition-all duration-200 ease-in-out">
      <section className="flex flex-col justify-center items-center p-3 shadow-xl duration-200 ease-in-out cursor-pointer text-center w-full max-w-3xl rounded-xl bg-black text-white mb-4">
        <CreatePetForm />
        <div className="flex items-center justify-around w-full min-w-72 p-2 lg:p-5 rounded-xl mb-5 md:mb-2"></div>
      </section>
    </main>
  );
};
