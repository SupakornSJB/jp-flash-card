import { useMemo, useState, useEffect } from "react"

export interface ITutorialDetail {
  title: string,
  description: (string | React.ReactNode)[],
  imgSrc?: string,
}

export interface ITutorialModalStatus {
  isFirst: boolean;
  isLast: boolean;
  current: ITutorialDetail;
  currentIndex: number;
}

export interface ITutorialUtil {
  next: () => void;
  prev: () => void;
  reset: () => void;
}

const useTutorialModalSetup = (details: ITutorialDetail[])
  : [util: ITutorialUtil, status: ITutorialModalStatus] => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isFirst = useMemo(() => {
    return currentIndex == 0;
  }, [currentIndex])
  const isLast = useMemo(() => {
    return currentIndex == details.length - 1;
  }, [currentIndex, details])
  const current = useMemo(() => details[currentIndex], [details, currentIndex]);

  useEffect(() => {
    if (details.length == 0) {
      throw ("Details should contains more than one");
    }
    setCurrentIndex(0);
  }, [details])

  const next = () => {
    if (details.length == 0) return;
    setCurrentIndex((prev) => {
      if (prev == details.length - 1) return prev;
      return prev + 1;
    })
  }

  const prev = () => {
    if (details.length == 0) return;
    setCurrentIndex((prev) => {
      if (prev == 0) return prev;
      return prev - 1;
    })
  }

  const reset = () => {
    if (details.length == 0) return;
    setCurrentIndex(0);
  }

  return [
    { next, prev, reset },
    { isFirst, isLast, current, currentIndex }
  ]
}

export default useTutorialModalSetup;
