import React, { useState, useMemo } from "react";
import allQuestion from ".././assets/normalQuestion.json";
import allVocabQuestions from ".././assets/normalQuestion.json";

const LegacyApp: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [vocabMode, setVocabMode] = useState<boolean>(false);
  const randomWord = useMemo(() => {
    if (!vocabMode)
      return allQuestion.words[Math.floor(Math.random() * (allQuestion.words.length))]
    return allVocabQuestions.words[Math.floor(Math.random() * (allVocabQuestions.words.length))]
  }, [count, vocabMode])

  return (
    <div className="flex flex-col gap-3 border-2 rounded max-w-7xl w-5/6 lg:w-2/5 p-10 sm:w-4/5 ">
      {
        !vocabMode &&
        <div className='font-bold text-3xl flex justify-center'>
          {randomWord}
        </div>
      }
      {
        vocabMode &&
        <div className='text-xl flex justify-center items-center flex-col gap-2'>
          {vocabMode && <p>Meaning, Group, and Te form?</p>}
          <p className="text-3xl font-bold">
            {randomWord}
          </p>
        </div>
      }
      <span className="font-thin m-auto">
        Number: {count + 1}
      </span>
      <div className="flex justify-center">
        <div className="flex gap-2 flex-col sm:flex-row">
          <button className='btn-neutral btn max-w-60 m-auto' onClick={() => setVocabMode((prev) => !prev)}>
            {vocabMode ? "Switch to sentence" : "Switch to Vocab"}
          </button>
          <button onClick={() => setCount((current) => current + 1)} className="btn btn-primary max-w-60 m-auto">
            Next Question
          </button>
        </div>
      </div>
    </div>
  )
}

export default LegacyApp;
