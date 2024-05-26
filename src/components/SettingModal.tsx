import React, { useEffect, useMemo, useRef, useState } from "react";
import HelpLogo from "./../assets/help-circle-outline.svg?react";
import SettingLogo from "./../assets/settings-outline.svg?react";

interface SettingModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRandom: boolean;
  setIsRandom: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingModal: React.FC<SettingModalProps> = ({ isOpen, setIsOpen, isRandom, setIsRandom }) => {
  const [isLocalRandom, setIsLocalRandom] = useState<boolean>(isRandom);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [justSave, setJustSave] = useState<boolean>(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const confirmRef = useRef<HTMLDialogElement>(null);
  const hasDataChanged = useMemo(() => {
    return isLocalRandom !== isRandom;
  }, [isLocalRandom, isRandom])

  useEffect(() => {
    if (!modalRef) return;
    if (isOpen) {
      syncSetting();
      modalRef.current?.showModal();
    }
    else
      modalRef.current?.close();
  }, [isOpen])

  useEffect(() => {
    if (!confirmRef) return;
    if (isConfirmOpen)
      confirmRef.current?.showModal();
    else
      confirmRef.current?.close();
  }, [isConfirmOpen])

  const syncSetting = () => {
    setIsLocalRandom(isRandom);
    setJustSave(false);
  }

  const applySetting = () => {
    setIsRandom(isLocalRandom);
    setJustSave(true);
  }

  const handleSettingModalClose = () => {
    if (hasDataChanged) {
      setIsConfirmOpen(true);
      return;
    }
    setIsOpen(false);
  }

  const handleDiscardSettingAndClose = () => {
    syncSetting();
    setIsConfirmOpen(false);
    setIsOpen(false);
  }

  const handleConfirmModalGoBack = () => {
    setIsConfirmOpen(false);
  }

  return (
    <>
      <dialog id="setting_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <div className='modal-top'>
            <div className="flex items-center gap-2">
              <SettingLogo className="h-8 w-8" />
              <h3 className="font-bold text-2xl">Setting</h3>
            </div>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleSettingModalClose}
            >✕</button>
          </div>
          <div className="flex justify-between py-2 items-center">
            <div className="flex gap-1 items-center">
              <span>Use Random Word</span>
              <div className="tooltip" data-tip="If On, the word order will be randomized.">
                <HelpLogo className="w-6 h-6 fill-neutral-content" />
              </div>
            </div>
            <input type="checkbox" className="toggle toggle-success" onChange={e => setIsLocalRandom(e.target.checked)} checked={isLocalRandom} />
          </div>
          {
            justSave &&
            <p className="font-thin text-success">
              Setting saved successfully.
            </p>
          }
          <div className="modal-action mt-3">
            <button className="btn btn-neutral" onClick={handleSettingModalClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={applySetting} disabled={!hasDataChanged}>
              Confirm
            </button>
          </div>
        </div>
      </dialog>
      <dialog id="confirm_unsaved_exit_modal" className="modal" ref={confirmRef}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Unsaved Change</h3>
          <p className="py-4">Would you like to discard change and exit</p>
          <div className="modal-action">
            <button className="btn btn-neutral" onClick={handleConfirmModalGoBack}>
              No
            </button>
            <button className="btn btn-error" onClick={handleDiscardSettingAndClose}>
              Yes
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default SettingModal;
