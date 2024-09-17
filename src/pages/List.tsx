import { useParams } from "react-router";
import { useGREWholeList } from "../hooks/useGREWholeList";

const List: React.FC = () => {
  const { setName } = useParams();
  const currentSet = useGREWholeList(setName);

  return (
    <div className="w-full flex justify-center">
      {
        currentSet ?
          <div className="grid grid-cols-2">
            {currentSet.words.map((word, index) => (
              <>
                <div>
                  {word}
                </div>
                <div className="mb-3">
                  {currentSet.translations[index]}
                </div>
              </>
            ))}
          </div> :
          <div></div>
      }
    </div>
  )
}

export default List;
