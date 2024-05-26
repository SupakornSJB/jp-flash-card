import React, { useEffect } from "react"
import useJsonWordList from "../hooks/useJsonWordList"
import SelectFileCard from "../components/SelectFileCard";
import RandomWordCard from "../components/RandomWordCard";
import { useRootContext } from "./Root";

const App: React.FC = () => {
  const [ready, error, wordList, fileHandler, reset] = useJsonWordList();
  const { isRandom, onReadyStateChange, hasScheduleReset, setHasScheduleReset, ..._ } = useRootContext();

  useEffect(() => {
    onReadyStateChange(ready);
  }, [ready])

  useEffect(() => {
    if (!hasScheduleReset) return;
    reset();
    setHasScheduleReset(false);
  }, [reset, hasScheduleReset])

  return (
    <>
      <div className="card card-bordered border-white w-4/5 lg:w-1/2 border-2">
        <SelectFileCard ready={ready} error={error} fileHandler={fileHandler} />
        <RandomWordCard ready={ready} isRandom={isRandom} words={wordList} />
      </div>
    </>
  )
}

export default App
