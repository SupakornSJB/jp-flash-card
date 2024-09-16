import { useContext, useMemo, useState, useRef } from "react";
import set1List from "./../../src/gre_set_1.json";
import set2List from "./../../src/gre_set_2.json";
import set3List from "./../../src/gre_set_3.json";
import set4List from "./../../src/gre_set_4.json";
import { useRootContext } from "../pages/Root";
import { createContext } from "react";

export const EnabledSetListContext = createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>]>([[], () => { }])

export const ASSET_LIST = [set1List, set2List, set3List, set4List]
export const ASSET_OBJ = ASSET_LIST
  .reduce<{ [setName: string]: IGreJson }>((accumulator, currentAsset) => {
    if (currentAsset.words.length !== currentAsset.translations.length)
      console.error(`Word List Length (${currentAsset.words.length}) 
                    and Translation List Length (${currentAsset.translations.length}) 
                    of '${currentAsset.setName}' is not equal`)
    accumulator[currentAsset.setName] = currentAsset
    return accumulator;
  }, {})

export interface IGreJson {
  setName: string,
  words: string[],
  translations: string[]
}

export interface IGreListCurrentQuestionDetail {
  questionNumber: number;
  question: string,
  answer: string,
  setName: string,
  count: number,
}

export interface IGreListUtil {
  next: () => void;
  toggleSet: (setName: string) => void;
}

export const useGREMultiList = (): { enabled: string[], current: IGreListCurrentQuestionDetail, util: IGreListUtil } => {
  const { isRandom } = useRootContext();
  const [count, setCount] = useState(0);
  const [questionEnableState, setQuestionEnableState] = useContext(EnabledSetListContext);

  const getQuestion = (setName: string, questionNumber: number) => (
    {
      question: ASSET_OBJ[setName].words[questionNumber],
      answer: ASSET_OBJ[setName].translations[questionNumber],
      setName,
      questionNumber,
    }
  )

  const previouslyRandom = useRef(isRandom);
  const previousCount = useRef(count);
  const previous = useRef(getQuestion(ASSET_LIST[0].setName, 0))

  // This current memo turns out to be a lot more complicated than I wanted lol
  const current = useMemo(() => {
    let nextQuestionNumber: number;
    let nextSetName: string;
    let resetQuestion = false;

    if (isRandom) {
      nextSetName = questionEnableState[Math.floor(Math.random() * questionEnableState.length)];
      nextQuestionNumber = Math.floor(Math.random() * ASSET_OBJ[nextSetName].words.length);
      previouslyRandom.current = true;
    } else {
      nextSetName = previous.current.setName;
      nextQuestionNumber = previous.current.questionNumber;

      if (previousCount.current !== count) nextQuestionNumber++;
      if (questionEnableState.includes(nextSetName)) {
        if (nextQuestionNumber >= ASSET_OBJ[nextSetName].words.length) {
          nextQuestionNumber = 0;
          const nextSetNameIndex = questionEnableState.indexOf(nextSetName) + 1;
          nextSetName = questionEnableState[nextSetNameIndex >= questionEnableState.length ? 0 : nextSetNameIndex];
        }
      } else
        resetQuestion = true;

      if (previouslyRandom.current) {
        previouslyRandom.current = false;
        resetQuestion = true;
      }

      if (resetQuestion) {
        nextSetName = questionEnableState[0];
        nextQuestionNumber = 0;
      }
    }

    const currentQuestion = getQuestion(nextSetName, nextQuestionNumber);
    previous.current = currentQuestion;
    previousCount.current = count;
    return getQuestion(nextSetName, nextQuestionNumber)
  }, [isRandom, count, questionEnableState])

  const toggleSet = (setName: string) => {
    setQuestionEnableState((prev) => {
      let arrCopy = [...prev];
      if (prev.includes(setName))
        arrCopy = arrCopy.filter((prevSetName) => prevSetName !== setName);
      else {
        arrCopy.push(setName);
        arrCopy.sort((item1, item2) => {
          const index1 = ASSET_LIST.findIndex((value) => value.setName === item1);
          const index2 = ASSET_LIST.findIndex((value) => value.setName === item2);
          return index1 - index2
        })
      }
      return arrCopy;
    })
  }

  const nextQuestion = () => {
    setCount((prev) => prev + 1);
  }

  return {
    enabled: questionEnableState,
    current: {
      ...current,
      count
    },
    util: {
      next: nextQuestion,
      toggleSet,
    }
  }
}
