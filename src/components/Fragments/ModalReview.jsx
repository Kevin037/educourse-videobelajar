import { useEffect, useState } from "react";
import useOrder from "../../hooks/useOrder";
import { ButtonPrimary, ButtonWhite } from "../Elements/button";
import Modal from "../Elements/Modal";

export default function ModalReview({ isOpen, onClose, id, user_rating }) {
  if (!isOpen) return null;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const {createReview,status} = useOrder();
  const [showForm, setShowForm] = useState(user_rating != null ? false : true);

  const SubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Pilih Rating Terlebih Dahulu");
      return false;
    }
    createReview({ order_id:id,rating:rating,description:review });
  };

  useEffect(() => {
    if (status) {
      window.location.reload();
    }
  }, [status]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
              {!showForm ? (
          <>
                            <h2 className="text-center text-lg font-bold mb-4">Review Sudah Terkirim</h2>
        <p className="text-center mb-4">
          Apakah kamu mau hapus review sebelumnya untuk membuat baru?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ButtonWhite onClick={onClose} >
            Batal
          </ButtonWhite>
          <ButtonPrimary className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={() => setShowForm(true)}>
            Ya, hapus dan lanjutkan
          </ButtonPrimary>
        </div>
          </>
        ) : (
          <>
                  <h2 className="text-center text-lg font-bold mb-4">Tulis Review Terbaikmu!</h2>
        <p className="text-center mb-4">
          Apakah kamu yakin untuk menyelesaikan pretest ini?
        </p>
        <div className="flex justify-center mb-4 text-2xl text-yellow-400 cursor-pointer">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              onClick={() => setRating(i + 1)}
              className={i < rating ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>

        {/* TEXTAREA */}
        <textarea
          placeholder="Masukkan Review"
          className="w-full border rounded-lg p-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3" onChange={e => setReview(e.target.value)}
        />

        {/* BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ButtonWhite onClick={onClose} >
            Batal
          </ButtonWhite>
          <ButtonPrimary className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={(e) => SubmitReview(e)}>
            Selesai
          </ButtonPrimary>
        </div>
          </>
        )}
    </Modal>
  );
}
