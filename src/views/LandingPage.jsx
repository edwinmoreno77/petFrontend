import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const LandingPage = () => {
  return (
    <main className="bg-black min-h-screen flex flex-col items-center font-sans">
      {/* Navbar */}
      <nav className="w-full fixed top-0 z-10 bg-opacity-90 backdrop-filter backdrop-blur-lg border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-3xl font-extrabold text-white">
            <span className="hover:opacity-90 transition-opacity duration-300">
              PetCenter
            </span>
          </Link>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-lime-500 font-semibold rounded-md border border-transparent transition-colors duration-300 hover:text-white hover:border-lime-500"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-lime-500 text-gray-900 font-semibold rounded-md transition-colors duration-300 hover:bg-lime-600"
            >
              Registro de usuario
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center pt-20" // added pt-20 for spacing due to fixed navbar
        style={{ backgroundImage: "url('https://example.com/hero-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold"
          >
            Bienvenido a PetCare
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="mt-4 text-lg md:text-2xl max-w-2xl"
          >
            El lugar ideal para encontrar el mejor cuidado para tu mascota
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 px-6 py-3 bg-lime-500 rounded-full text-black text-lg font-semibold hover:bg-lime-400 transition ease-in-out"
          >
            Conócenos
          </motion.button>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6 text-white"
        >
          Nuestras Mascotas
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { delayChildren: 0.3, staggerChildren: 0.2 },
            },
          }}
        >
          {["pet1.jpg", "pet2.jpg", "pet3.jpg", "pet4.jpg", "pet5.jpg"].map(
            (image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={`https://picsum.photos/200/300`}
                  alt={`Mascota ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            )
          )}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-200 w-full text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-10 text-gray-800"
        >
          Testimonios de Clientes Felices
        </motion.h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          {[1, 2].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg shadow-lg bg-white"
            >
              <p className="text-lg font-light text-gray-700">
                Mi mascota ha encontrado el mejor hogar temporal en PetCare. ¡El
                equipo es increíble!
              </p>
              <span className="mt-4 block text-sm font-bold text-black">
                — Cliente Satisfecho
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-16 text-center bg-black text-white">
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
      </section>
    </main>
  );
};
