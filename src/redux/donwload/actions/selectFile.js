import { SELECT_FILE } from "../constants/";

export const selectFile = file => {
  return {
    type: SELECT_FILE,
    payload: file
  };
};
