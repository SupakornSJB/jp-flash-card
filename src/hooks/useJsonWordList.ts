import { useState } from "react";

// csv format

// text format 1
// comma separated
// text format 2
// \n separated

// json format 1
// words: string[]
// json format 2
// string[]

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

    switch (getFileExtension(file.name)) {
      case "txt":
        fileReader.onloadend = handleTextFileRead;
        break;
      case "json":
        fileReader.onloadend = handleJsonFileRead;
        break;
      case "csv":
        fileReader.onloadend = handleCSVFileRead;
        break;
      default:
        setError(true);
        setReady(false);
        return;
    }
    fileReader.readAsText(file);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleJsonFileRead = async (_: ProgressEvent<FileReader>) => {
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

  const handleTextFileRead = async (_: ProgressEvent<FileReader>) => {
    let content = fileReader.result;
    if (content === null) {
      setError(true);
      return;
    }

    throw ("Not implemented");
  }

  const handleCSVFileRead = async (_: ProgressEvent<FileReader>) => {
    let content = fileReader.result
    if (content === null) {
      setError(true);
      return;
    }

    throw ("Not implemented");
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

  const getFileExtension = (fileName: string) => {
    const parts = fileName.split(".");
    return parts[parts.length - 1];
  }

  const reset = () => {
    setReady(false);
    setError(false);
    setWordList(null);
  }

  return [ready, error, wordList, handleFileChosen, reset];
}

export default useJsonWordList;
