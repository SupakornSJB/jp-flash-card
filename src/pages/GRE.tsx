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
      <div className="card card-bordered border-white w-4/5 lg:w-1/2 border-2">
        <div className="card-body flex justify-center items-center">
          <p className="font-bold text-3xl">{current.question}</p>
          {
            isShowingAnswer ?
              <div>
                <span>{current.answer}</span>{" "}
                <span className="font-bold">({current.setName})</span>
              </div>
              : <p className="text-error">Click "Show Answer" to reveal answer</p>
          }
          <div className="card-actions ">
            <button className="btn btn-primary" onClick={handleClickNext}>
              {isShowingAnswer ? "Next" : "Show Answer"}
            </button>
            <button className="btn btn-neutral" onClick={openSettingModal}>
              Option
            </button>
          </div>
        </div>
      </div>
      <GRESelectSetModal isOpen={isSettingModalOpen} setIsOpen={setIsSettingModalOpen} />
    </>
  )
}
