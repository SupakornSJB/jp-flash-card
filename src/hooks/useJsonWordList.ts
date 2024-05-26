import { useState } from "react";

const useJsonWordList = ():
  [ready: boolean, error: boolean, words: string[] | null, fileHandler: (file: File | null) => void, reset: () => void] => {
  let fileReader: FileReader;
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [wordList, setWordList] = useState<string[] | null>(null);

  const handleFileChosen = (file: File | null) => {
    if (file === null) {
      setError(true);
      setReady(false);
      return;
    }
    setError(false);
    setReady(false);
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFileRead = async (_: ProgressEvent<FileReader>) => {
    let content = fileReader.result;
    if (content === null) {
      setError(true);
      return;
    }

    if (typeof (content) !== "string") {
      content = new TextDecoder().decode(content);
    }

    try {
      const finalResult = JSON.parse(content);
      const checkTypeResult = checkDataType(finalResult);
      if (!checkTypeResult)
        throw ("Type Check Error");

      setWordList(finalResult.words);
      setError(false);
      setReady(true);
    }
    catch (e: unknown) {
      setError(true);
      return;
    }
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const checkDataType = (jsonResult: any): boolean => {
    if (jsonResult && jsonResult.words) {
      if (Array.isArray(jsonResult.words)) {
        let somethingNotString = false;
        jsonResult.words.forEach((word: unknown) => {
          if (typeof (word) !== "string") {
            somethingNotString = true;
          }
        })
        return !somethingNotString && jsonResult.words.length !== 0;
      }
    }
    return false;
  }

  const reset = () => {
    setReady(false);
    setError(false);
    setWordList(null);
  }

  return [ready, error, wordList, handleFileChosen, reset];
}

export default useJsonWordList;
