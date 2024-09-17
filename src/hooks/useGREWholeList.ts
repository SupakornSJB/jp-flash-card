import { ASSET_LIST } from "./useGREMultiList"

export const useGREWholeList = (setIndex?: string) => {
  let setIndexInt;
  if (!setIndex) setIndexInt = 0;
  else setIndexInt = parseInt(setIndex);
  if (!setIndex || !ASSET_LIST[setIndexInt - 1]) return null;
  return ASSET_LIST[setIndexInt - 1];
}
