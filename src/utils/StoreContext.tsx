import { TStore } from '@/app/type';
import React, { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

// Define the state and action types
interface StoreState {
  stores: TStore[]; 
  isSearch:boolean;
}

type Action = 
  | { type: 'SET_STORES', payload: TStore[] }
  | {type:"SET_IS_SEARCH",payload:boolean}

const initialState: StoreState = {
  stores: [],
  isSearch:false
};

// Create context
const StoreContext = createContext<{ state: StoreState; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

// Reducer
const storeReducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case 'SET_STORES':
      return {
        ...state,
        stores: action.payload,
      };
    case "SET_IS_SEARCH":
      return {
        ...state,
        isSearch:action.payload
      }
    default:
      return state;
  }
};

// Provider component
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hook to use the Store context
export const useStoreContext = () => {
  return useContext(StoreContext);
};
