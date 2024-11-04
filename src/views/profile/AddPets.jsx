import { CreatePetForm } from "../../components/profile/CreatePetForm";

export const AddPets = () => {
  return (
    <main className="container-fluid z-0 bg-image-motivo bg-black flex flex-col items-center justify-center  min-h-screen p-5 transition-all duration-200 ease-in-out">
      <section className="flex flex-col z-10 justify-center items-center p-3 duration-200 ease-in-out cursor-pointer text-center w-full max-w-4xl xl:max-w-5xl rounded-xl bg-black border-2 border-slate-800 shadow-slate-600 shadow-md text-white mb-4">
        <CreatePetForm />
        <div className="flex items-center justify-around w-full min-w-72 p-2 lg:p-5 rounded-xl mb-5 md:mb-2"></div>
      </section>
    </main>
  );
};
