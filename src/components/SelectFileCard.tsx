import React, { useState, useEffect } from "react";
import ErrorModal from "./ErrorModal";

interface SelectFileCardProps {
  ready: boolean,
  error: boolean,
  fileHandler: (file: File | null) => void;
}

const SelectFileCard: React.FC<SelectFileCardProps> = ({ ready, error, fileHandler }) => {
  const [errorShowing, setErrorShowing] = useState<boolean>(false);

  useEffect(() => {
    setErrorShowing(error);
  }, [error])

  return (
    <>
      {
        !ready &&
        <>
          <div className="flex flex-col justify-center items-center p-6 gap-4">
            <div className="text-3xl font-bold">
              Welcome to Word Randomizer!
            </div>
            <div className="flex flex-col items-center justify-center leading-tight">
              <p className="font-thin">
                Please choose a file to upload
              </p>
              <p className="font-thin">
                Click at the tutorial button at the top for more detail!
              </p>
            </div>
            <input type="file" className="file-input file-input-bordered file-input-primary hover:file-input-accent" onChange={(event) => fileHandler(event.target.files ? event.target.files[0] : null)} />
          </div>
        </>
      }
      <ErrorModal isOpen={errorShowing} setOpen={setErrorShowing}/>
    </>
  )
}

export default SelectFileCard;
