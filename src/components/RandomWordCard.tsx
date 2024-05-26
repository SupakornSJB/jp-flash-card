import React, { useEffect, useMemo, useState } from "react";

interface RandomWordCardProps {
  ready: boolean,
  isRandom: boolean,
  words: string[] | null,
}

const RandomWordCard: React.FC<RandomWordCardProps> = ({ ready, isRandom, words }) => {
  const [count, setCount] = useState<number>(0);
  const { wordNo, word } = useMemo(() => {
    if (!words) return { word: "", wordNo: -1 }
    if (isRandom) {
      const randIndex = Math.floor(Math.random() * words.length);
      return {
        wordNo: randIndex,
        word: words[randIndex],
      }
    }
    const idx = count % words.length;
    return {
      word: words[idx],
      wordNo: idx,
    }
  }, [count, isRandom, words])

  const getNewWord = () => {
    setCount(prev => prev + 1);
  }

  useEffect(() => {
    setCount(0);
  }, [ready])

  return (
    <>
      {
        ready &&
        <>
          <div className="flex flex-col p-6 gap-4 justify-center items-center">
            <div className="text-center">
              <p className="font-thin inline">
                Number: {count + 1}, {" "}
              </p>
              <p className="font-thin inline">
                Current word number: {wordNo + 1}
              </p>
            </div>
            <p className="font-bold text-3xl text-center">
              {word}
            </p>
            <div className="w-full card-actions justify-center">
              <button onClick={getNewWord} className="btn btn-primary max-w-32 w-1/2">
                Next Word
              </button>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default RandomWordCard;
