export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* MODAL */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 shadow-lg z-50">
        {children}
      </div>
    </div>
  );
}
