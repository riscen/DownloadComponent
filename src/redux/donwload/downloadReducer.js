import { SELECT_TYPE, DOWNLOAD_TYPE } from "./constants/";

const initialState = {};

const downloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TYPE:
      break;
    case DOWNLOAD_TYPE:
      break;
    default:
      return state;
  }
};

export default downloadReducer;
