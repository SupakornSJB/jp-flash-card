import { useState, useMemo, useRef, useEffect } from "react";
import set1List from "./../../src/gre_set_1.json";
import { useRootContext } from "../pages/Root";

const ASSET_LIST = [set1List]

export interface IGreJson {
  setName: string,
  words: string[],
  translations: string[]
}

export interface IGreListInfo {
  state: {
    set: {
      [setName: string]: boolean
    }
  },
  nameOfEnabledSet: string[]
}

export interface IGreListCurrentQuestionDetail {
  questionNumber: number;
  question: string,
  answer: string,
  setName: string,
}

export interface IGreListUtil {
  next: () => void;
  toggleSet: (setName: string) => void;
}

export const useGREMultiList = (): { info: IGreListInfo, current: IGreListCurrentQuestionDetail, util: IGreListUtil } => {
  const { isRandom } = useRootContext();
  const [count, setCount] = useState(0);
  const [questionEnableState, setQuestionEnableState]
    = useState<IGreListInfo>({
      state: {
        set: ASSET_LIST.reduce<{ [setName: string]: boolean }>((accumulator, currentSet) => {
          accumulator[currentSet.setName] = true;
          return accumulator;
        }, {})
      },
      nameOfEnabledSet: ASSET_LIST.map((asset) => asset.setName)
    })

  const questionSet = useMemo<{
    set: {
      [setName: string]: { word: string, translation: string }[],
    },
    numberOfQuestionForEachSet: {
      [setName: string]: number;
    },
    totalQuestionNumber: number;
  }>(() => {
    const currentList: { [setName: string]: { word: string, translation: string }[] } = {}
    const numberOfQuestionForEachSet: { [setName: string]: number } = {};
    let totalQuestionNumber = 0;
    ASSET_LIST.forEach((asset) => {
      if (!questionEnableState.state.set[asset.setName]) return;
      if (asset.words.length !== asset.translations.length)
        console.warn(`Words List Length (${asset.words.length}) and Translation List Length (${asset.translations.length}) of set ${asset.setName} is not equal.`)
      currentList[asset.setName] = asset.words.map((word, index) => ({ word, translation: asset.translations[index] }))
      numberOfQuestionForEachSet[asset.setName] = asset.words.length;
      totalQuestionNumber += asset.words.length;
    })
    return { set: currentList, numberOfQuestionForEachSet, totalQuestionNumber }
  }, [questionEnableState])

  const previous = useRef({ questionNumber: -1, setName: ASSET_LIST[0].setName });
  const current = useMemo<IGreListCurrentQuestionDetail>(() => {
    if (isRandom) {
      const randomSetName = questionEnableState.nameOfEnabledSet[Math.floor(Math.random() * questionEnableState.nameOfEnabledSet.length)];
      const randomQuestionNumber = Math.floor(Math.random() * questionSet.numberOfQuestionForEachSet[randomSetName]);
      const randomQuestion = questionSet.set[randomSetName][randomQuestionNumber];
      return {
        question: randomQuestion.word,
        answer: randomQuestion.translation,
        setName: randomSetName,
        questionNumber: randomQuestionNumber,
      }
    } else {
      let nextQuestionNumber: number = previous.current.questionNumber + 1;
      let nextSetName: string = previous.current.setName;
      if (nextQuestionNumber >= questionSet.numberOfQuestionForEachSet[previous.current.setName]) {
        nextQuestionNumber = 0;
        const nextSetNameIndex = questionEnableState.nameOfEnabledSet.indexOf(nextSetName) + 1;
        if (nextSetNameIndex >= questionEnableState.nameOfEnabledSet.length) {
          nextSetName = questionEnableState.nameOfEnabledSet[0];
        } else {
          nextSetName = questionEnableState.nameOfEnabledSet[nextSetNameIndex]
        }
      }
      previous.current.setName = nextSetName;
      previous.current.questionNumber = nextQuestionNumber;

      return {
        questionNumber: nextQuestionNumber,
        setName: nextSetName,
        question: questionSet.set[nextSetName][nextQuestionNumber].word,
        answer: questionSet.set[nextSetName][nextQuestionNumber].translation
      }
    }
  }, [count, questionEnableState, questionSet, isRandom])

  useEffect(() => {
    setCount(0);
  }, [isRandom])

  const loadQuestionSet = (set: IGreJson[]) => {
    setQuestionEnableState((prev) => {
      const objCopy = { set: { ...prev.state.set } };
      for (let setName of set) {
        objCopy.set[setName.setName] = true;
      }
      return {
        state: objCopy,
        nameOfEnabledSet: [...prev.nameOfEnabledSet, ...set.map((s) => s.setName)]
      }
    })
  }

  const toggleSet = (setName: string) => {
    setQuestionEnableState((prev) => {
      const objCopy = { set: { ...prev.state.set } };
      objCopy.set[setName] = !objCopy.set[setName];
      const numberOfEnabledSet = Object.entries(objCopy.set)
        .reduce<string[]>((enabledSetNameArr, [setName, enabled]) => {
          if (enabled) {
            enabledSetNameArr.push(setName)
          }
          return enabledSetNameArr;
        }, [])
      return { state: objCopy, nameOfEnabledSet: numberOfEnabledSet };
    })
    setCount(0);
  }

  const nextQuestion = () => {
    setCount((prev) => prev + 1);
  }

  return {
    info: questionEnableState,
    current,
    util: {
      next: nextQuestion,
      toggleSet,
    }
  }
}
