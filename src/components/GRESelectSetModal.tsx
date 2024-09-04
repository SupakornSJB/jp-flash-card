import { useEffect, useRef } from "react"
// import HelpLogo from "./../assets/help-circle-outline.svg?react";
import SettingLogo from "./../assets/settings-outline.svg?react";
import { useGREMultiList } from "../hooks/useGREMultiList";

interface GRESelectSetModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GRESelectSetModal: React.FC<GRESelectSetModalProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { util, info } = useGREMultiList();

  const handleCloseModal = () => {
    props.setIsOpen(false);
  }

  useEffect(() => {
    if (props.isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [props.isOpen])

  return (
    <dialog id="setting_modal" className="modal" ref={modalRef}>
      <div className="modal-box">
        <div className='modal-top'>
          <div className="flex items-center gap-2">
            <SettingLogo className="h-8 w-8" />
            <h3 className="font-bold text-2xl">Setting</h3>
          </div>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
          >✕</button>
        </div>
        <div>
          {
            Object.entries(info.state.set).map(([setName, enabled]) => (
              <div key={setName} className="flex justify-between py-2 items-center">
                <div className="flex gap-1 items-center">
                  <span>{setName}</span>
                </div>
                <input type="checkbox" className="toggle toggle-success" onChange={() => util.toggleSet(setName)} checked={enabled} />
              </div>
            ))
          }
        </div>
        <div className="modal-action mt-3">
          <button className="btn btn-neutral" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  )
}
