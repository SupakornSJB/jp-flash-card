import React, { useMemo, useEffect, useRef } from "react";
import useTutorialModalSetup, { ITutorialDetail } from "../hooks/useTutorialModalSetup";

const TUTORIAL_LIST: ITutorialDetail[] = [
  {
    title: "How to Use",
    description: [<p key="How to use 1">Coming Soon!</p>],
  },
  {
    title: "File Uploading",
    description: [<p key="file uploading 1">Coming Soon!</p>],
  },
  {
    title: "Using the Randomizer",
    description: [<p key="randomizer 1">Coming Soon!</p>],
  },
  {
    title: "Setting",
    description: [<p key="Setting 1">Coming Soon!</p>],
  },
  {
    title: "Change Word Sets",
    description: [<p key="change 1">Coming Soon!</p>],
  },
  {
    title: "Legacy Version",
    description: [
      <p key="Legacy 1">Please go to the following link for the legacy version</p>,
      <a key="Legacy 2" className="text-blue-500 underline" href={import.meta.env.BASE_URL + "legacy"}>{import.meta.env.BASE_URL + "legacy"}</a>
    ],
  },
]

interface TutorialModalProps {
  id: string | number,
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ id, isOpen, setOpen }) => {
  const modalId = useMemo(() => "toturial_modal_" + id, [id]);
  const modalRef = useRef<HTMLDialogElement>(null);
  const [tutorialUtil, tutorialStatus] = useTutorialModalSetup(TUTORIAL_LIST);

  useEffect(() => {
    if (!modalRef) return;
    if (isOpen)
      modalRef.current?.showModal();
    else {
      tutorialUtil.reset();
      modalRef.current?.close();
    }
  }, [isOpen])

  return (
    <>
      <dialog id={modalId} className="modal" ref={modalRef}>
        <div className="modal-box">
          <div className="modal-top">
            <h3 className="font-bold text-2xl">{tutorialStatus.current.title}</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setOpen(false)}
            >✕</button>
          </div>
          <div className="py-2">
            {
              tutorialStatus.current.description.map((tutor) => {
                if (typeof (tutor) == "string")
                  return <p key={tutor}>{tutor}</p>
                return tutor;
              })
            }
          </div>
          <div className="modal-action gap-2">
            {
              !tutorialStatus.isFirst &&
              <button className="btn btn-neutral" onClick={tutorialUtil.prev}>
                Previous
              </button>
            }
            {
              !tutorialStatus.isLast &&
              <button className="btn btn-primary" onClick={tutorialUtil.next}>
                Next
              </button>
            }
            {
              tutorialStatus.isLast &&
              <button className="btn btn-error" onClick={() => setOpen(false)}>
                Close
              </button>
            }
          </div>
        </div>
      </dialog >
    </>
  )
}

export default TutorialModal;
