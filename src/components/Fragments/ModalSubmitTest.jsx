import { useEffect } from "react";
import useOrder from "../../hooks/useOrder";
import { ButtonPrimary, ButtonWhite } from "../Elements/button";
import Modal from "../Elements/Modal";
import useLesson from "../../hooks/useLesson";

export default function ModalSubmitTest({ isOpen, onClose, totalAnswer, totalQuestions, testNo, orderId, type, setModalOpen }) {
  if (!isOpen) return null;
  const {submitTest,submitStatus} = useLesson();

  const SubmitTest = (e) => {
    e.preventDefault()
    if (totalAnswer != totalQuestions) {
        alert("Jawaban belum lengkap");
        setModalOpen(false);
        return false;
    }
      submitTest({id:testNo});
  };
  useEffect(() => {
    if (submitStatus) {
        window.location.href = `/class/${orderId}/${type}/${testNo}/result`
    }
  }, [submitStatus]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        <img src="/assets/submitTest.svg" alt="" />
        <p className="text-center mb-4">
          Apakah kamu yakin untuk menyelesaikan pretest ini?
        </p>
        {/* BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ButtonWhite onClick={onClose} >
            Batal
          </ButtonWhite>
          <ButtonPrimary className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" onClick={(e) => SubmitTest(e)}>
            Selesai
          </ButtonPrimary>
        </div>
      </>
    </Modal>
  );
}
