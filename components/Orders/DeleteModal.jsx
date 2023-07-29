import { motion, AnimatePresence } from "framer-motion";

export default function DeleteModal({ onCancel, onDelete }) {
  return (
    <AnimatePresence>
      <div
        id="modal-backdrop"
        className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"
      ></div>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-50 flex flex-col max-w-sm mx-auto mb-8 bg-white p-6 rounded-lg"
      >
        <p className="text-center text-xl font-noto">
          Are you sure you want to delete the order?
        </p>
        <div className="text-center mt-5">
          <button
            onClick={onCancel}
            className="bg-green-800 hover:bg-green-600 text-white px-4 py-2 rounded-full"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-full ml-2"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
