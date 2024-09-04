import { useState } from "react";
import { useGREMultiList } from "../hooks/useGREMultiList";
import { GRESelectSetModal } from "../components/GRESelectSetModal";

export const GREPage: React.FC = () => {
  const { util, current } = useGREMultiList();
  const [isShowingAnswer, setIsShowingAnswer] = useState<boolean>();
  const [isSettingModalOpen, setIsSettingModalOpen] = useState<boolean>(false);

  const openSettingModal = () => {
    setIsSettingModalOpen(true);
  }

  const handleClickNext = () => {
    if (isShowingAnswer) {
      util.next();
      setIsShowingAnswer(false);
      return;
    }
    setIsShowingAnswer(true);
  }

  return (
    <>
      <div className="card card-bordered border-neutral w-4/5 lg:w-1/2 h-1/2 border-2">
        <div className="card-body p-4 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center border-neutral-50 bg-neutral p-3 rounded-xl w-full h-2/3 grow">
            <span className="font-bold text-3xl ">{current.question}</span>
            <div className="pt-3">
              {
                isShowingAnswer ?
                  <div className="text-center">
                    <span className="">{current.answer}</span>{" "}
                    <span className="font-bold">({current.setName})</span>
                  </div>
                  : <p className="text-error text-center">Click "Show Answer" to reveal answer</p>
              }
            </div>
          </div>
          <div className="p-0 sm:p-3 border-0 rounded-xl sm:border card-actions border-neutral flex sm:flex-row-reverse justify-center items-center w-full ">
            <button className="btn btn-outline border-0 btn-sm w-full sm:w-auto" onClick={openSettingModal}>
              Option
            </button>
            <button className={`btn ${isShowingAnswer ? "btn-secondary" : "btn-primary"} btn-sm w-full sm:w-auto`} onClick={handleClickNext}>
              {isShowingAnswer ? "Next Question" : "Show Answer"}
            </button>
          </div>
        </div>
      </div>
      <GRESelectSetModal isOpen={isSettingModalOpen} setIsOpen={setIsSettingModalOpen} />
    </>
  )
}
