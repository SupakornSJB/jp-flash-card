import React, { useMemo, useState } from "react";
import { Outlet, useLocation, useOutletContext } from 'react-router';
import { Link } from "react-router-dom";
import TutorialModal from "../components/TutorialModal";
import SettingModal from "../components/SettingModal";
import SettingLogo from "./../assets/settings-outline.svg?react"
import TutorialLogo from "./../assets/help-circle-outline.svg?react";
import CloseLogo from "./../assets/close-circle-outline.svg?react";

type RandomContextType = {
  isRandom: boolean,
  setIsRandom: React.Dispatch<React.SetStateAction<boolean>>,
  hasScheduleReset: boolean;
  setHasScheduleReset: React.Dispatch<React.SetStateAction<boolean>>;
  onReadyStateChange: (state: boolean) => void;
};

const Root: React.FC = () => {
  const [tutorialOpen, setTutorialOpen] = useState<boolean>(false);
  const [isRandom, setIsRandom] = useState<boolean>(true);
  const [isResettable, setIsResettable] = useState<boolean>(false);
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [hasScheduleReset, setHasScheduleReset] = useState<boolean>(false);
  const location = useLocation();
  const showCurrentLink = useMemo<boolean>(() =>
    location.pathname === import.meta.env.BASE_URL + "legacy", [location])

  const onReadyStateChange = (state: boolean) => {
    setIsResettable(state);
  }

  const scheduleReset = () => {
    setHasScheduleReset(true);
  }

  return (
    <>
      <div className="relative w-screen h-screen">
        <div className='w-full h-screen'>
          <div className="flex items-center justify-center h-full">
            <Outlet
              context={{
                isRandom,
                setIsRandom,
                hasScheduleReset,
                setHasScheduleReset,
                onReadyStateChange
              }} />
          </div>
        </div>
        <div className="w-full absolute top-0 left-0 flex justify-end p-2 gap-2">
          {
            isResettable &&
            <button className="btn btn-circle" onClick={scheduleReset}>
              <CloseLogo className="w-8 h-8 fill-neutral-content" />
            </button>
          }
          <button className="btn btn-circle">
            <TutorialLogo className="w-8 h-8 fill-neutral-content" onClick={() => setTutorialOpen(prev => !prev)} />
          </button>
          <button className="btn btn-circle" onClick={() => setIsSettingOpen(prev => !prev)}>
            <SettingLogo className="w-6 h-6" />
          </button>
        </div>
        {
          showCurrentLink &&
          <div className="w-full h-screen absolute top-0 left-0 flex flex-col justify-end pointer-events-none">
            <div className="footer footer-center p-10">
              <span className="inline pointer-events-auto">
                You are currently using the legacy version, Click {" "}
                <Link to={import.meta.env.BASE_URL} className="underline text-blue-500">
                  Here
                </Link>
                {" "} to go to the current version
              </span>
            </div>
          </div>
        }
      </div>
      <TutorialModal id="totorial" isOpen={tutorialOpen} setOpen={setTutorialOpen} />
      <SettingModal
        isOpen={isSettingOpen}
        setIsOpen={setIsSettingOpen}
        isRandom={isRandom}
        setIsRandom={setIsRandom} />
    </>
  )
}

export const useRootContext = () => {
  return useOutletContext<RandomContextType>();
}

export default Root;
