import { Env, SetTokenAction, SET_TOKEN } from './types';

const env: Env = {
  token: null,
};

const envReducer = (state = env, action: SetTokenAction): Env => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };

    default:
      return state;
  }
};

export default envReducer;
