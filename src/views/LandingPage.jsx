import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import landing2 from "../assets/landing2.jpg";
import vaccines from "../assets/vaccinesVideo.mp4";
import calendar from "../assets/calendarVideo.mp4";
import dewormings from "../assets/dewormingsVideo.mp4";
import logo from "../assets/logo.png";

export const LandingPage = () => {
  return (
    <main className=" bg-black min-h-screen flex flex-col items-center font-sans z-0 ">
      <nav className="w-full z-10 fixed bg-black bg-opacity-60 border-b border-gray-700">
        <div className="mx-auto px-6 py-1 flex justify-between lg:ms-16 lg:me-16 items-center">
          <Link
            to="/home"
            className=" flex justify-between items-center gap-3 md:gap-5 text-3xl font-extrabold text-white"
          >
            <div className="h-10 w-10 md:h-16 md:w-16">
              <img className="hover:brightness-150" src={logo} alt="logo" />
            </div>
            <span className="text-base md:text-4xl hover:opacity-90 transition-opacity duration-300 text-lime-500">
              PetCenter
            </span>
          </Link>
          <div className="text-xxs md:text-base lg:text-lg flex gap-1 md:gap-8">
            <Link
              to="/login"
              className=" px-2 py-1 md:px-4 md:py-2 text-lime-500 font-semibold rounded-md border border-transparent transition-colors duration-300 hover:text-white hover:border-lime-500"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="px-2 py-1 md:px-4 md:py-2 bg-lime-500 text-gray-900 font-semibold rounded-md transition-colors duration-300 hover:brightness-150"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </nav>

      <section
        className="container-fluid relative w-full h-screen bg-fixed bg-cover bg-top"
        style={{
          backgroundImage: `url('${landing2}')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-2xl md:text-6xl font-bold"
          >
            Bienvenido a PetCenter
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="mt-4 text-base md:text-2xl max-w-2xl font-extralight"
          >
            El lugar ideal para el cuidado de tu mascota.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 px-6 py-3 bg-lime-500 rounded-full text-black text-sm md:text-lg font-semibold hover:brightness-150 transition ease-in-out"
          >
            <Link to={"/home"}>Conócenos</Link>
          </motion.button>
        </div>
      </section>

      <div className="container-fluid bg-white">
        <section className="py-10 w-full text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl lg:text-6xl font-extrabold mb-4 md:mb-10 text-lime-500"
          >
            ¡NO MÁS PAPELEO!
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 3 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-10 text-gray-500"
          >
            Digitaliza los controles de tus mascotas.
          </motion.h2>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 px-6">
            <div className="flex items-center justify-center">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg text-lime-500 bg-white text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold"
              >
                CONTROL DE VACUNAS
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 3 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-white"
            >
              <video
                src={vaccines}
                className="object-cover h-full w-full"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
          </div>
        </section>

        <section className="container-fluid py-0 md:py-16 z-10 w-full text-center">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 px-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 3 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-white order-2 md:order-1"
            >
              <video
                src={dewormings}
                className="object-cover h-full w-full"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
            <div className="flex items-center justify-center order-1 md:order-2">
              <motion.h1
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg text-lime-500 bg-white text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold"
              >
                CONTROL DE DESPARASITACIONES
              </motion.h1>
            </div>
          </div>
        </section>

        <section className="py-10 w-full text-center">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 px-6">
            <div className="flex items-center justify-center ">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg text-lime-500 bg-white text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold"
              >
                CONTROL DE CITAS
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 3 }}
              viewport={{ once: true }}
              className="p-1 rounded-lg bg-white"
            >
              <video
                src={calendar}
                className="object-cover h-full w-full"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
          </div>
        </section>
      </div>

      <footer className="w-full container-fluid  py-16 text-center bg-black text-white bg-image-motivo">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          ¡Contáctanos!
        </motion.h2>
        <p className="text-lg font-light mb-8 max-w-2xl mx-auto">
          Si tienes alguna pregunta, no dudes en comunicarte con nosotros.
          ¡Estamos aquí para ayudarte y para cuidar de tu mascota!
        </p>
        <motion.button
          initial={{ opacity: 0.8, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="px-8 py-4  transition"
        >
          <div className="w-28 h-28 md:w-36 md:h-36">
            <img className="object-cover w-full h-full" src={logo} alt="" />
          </div>
        </motion.button>
      </footer>
    </main>
  );
};
