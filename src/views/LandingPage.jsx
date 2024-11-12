import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import crear_cuenta from "../assets/crear_cuenta_pc_2.png";
// import landing from "../assets/landing.jpg";
import logo from "../assets/logo.png";

export const LandingPage = () => {
  return (
    <main className="container-fluid bg-black min-h-screen flex flex-col items-center font-sans bg-image-motivo z-0">
      {/* Navbar */}
      <nav className="w-full fixed top-0 z-10 bg-opacity-90 backdrop-filter backdrop-blur-lg border-b border-gray-700">
        <div className="container-fluid mx-auto px-6 py-4 flex justify-between md:ms-16 md:me-16 items-center">
          <Link
            to="/home"
            className=" flex justify-between items-center gap-3 md:gap-5 text-3xl font-extrabold text-white"
          >
            <div className="h-10 w-10 md:h-16 md:w-16">
              <img className="hover:brightness-150" src={logo} alt="logo" />
            </div>
            <span className="text-base md:text-4xl hover:opacity-90 transition-opacity duration-300">
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
              Registro de usuario
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center pt-20"
        // style={{
        //   backgroundImage: `url('${crear_cuenta}')`,
        // }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col justify-center items-center text-white text-center px-4">
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

      {/* Testimonials Section */}
      <div className="container-fluid bg-white">
        <section className="py-16 w-full text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-10 text-black"
          >
            Testimonios de Clientes Felices
          </motion.h2>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-white text-5xl font-extrabold"
            >
              Control de Vacunas
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg bg-white"
            >
              <img
                src={crear_cuenta}
                className="object-cover h-full w-full"
                alt=""
              />
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section 2 */}
        <section className="py-16  w-full text-center">
          <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg  bg-white"
            >
              <img
                src={crear_cuenta}
                className="object-cover h-full w-full"
                alt=""
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg  bg-white"
            >
              <img
                className="object-cover h-full w-full"
                src={crear_cuenta}
                alt=""
              />
            </motion.div>
          </div>
        </section>
      </div>

      {/* Contact Section */}
      <footer className="w-full py-16 text-center bg-black text-white">
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
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="px-8 py-4 bg-lime-500 rounded-full text-lg font-semibold hover:bg-gray-800 transition"
        >
          Escríbenos
        </motion.button>
      </footer>
    </main>
  );
};
