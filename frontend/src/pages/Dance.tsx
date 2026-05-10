import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Dance() {
  return (
    <motion.div
      className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 overflow-hidden"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <Link
        to="/"
        className="absolute top-6 left-6 bg-[#2E8B57] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#256d47] transition"
      >
        ← Back to Home
      </Link>

      <motion.h1
        className="text-5xl font-bold mb-6 text-primary text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Traditional Tajik Dance 💃
      </motion.h1>

      <motion.video
        controls
        className="rounded-xl shadow-lg w-full max-w-3xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <source src="/videos/dance.mp4" type="video/mp4" />
      </motion.video>

      <motion.p
        className="text-lg text-gray-700 mt-6 max-w-2xl text-center leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        Feel the rhythm and grace of Tajik dances — a joyful expression of culture and identity.
      </motion.p>
    </motion.div>
  );
}
