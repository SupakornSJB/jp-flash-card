import React, { useRef, useEffect } from "react";

interface ErrorModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, setOpen }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalRef == null) return;
    if (isOpen)
      modalRef.current?.showModal();
    else
      modalRef.current?.close();
  }, [isOpen])

  return (
    <dialog className="modal" ref={modalRef}>
      <div className="modal-box">
        <div className="modal-top">
          <h3 className="font-bold text-2xl">
            Uh Oh!
          </h3>
        </div>
        <div className="modal-action">
          <button className="btn btn-neutral" onClick={() => setOpen(false)}>
            Ok
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ErrorModal;
