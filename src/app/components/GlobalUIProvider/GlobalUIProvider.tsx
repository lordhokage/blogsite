'use client';

import * as React from 'react';

interface Modal {
  id: string;
  isOpen: boolean;
}

interface GlobalUIState {
  modals: Record<string, Modal>;
  superheader: null | 'us-election';
  // NOTE: `countryFromIP` is always undefined right now, since we are no longer making the request on mount to fetch it.
  // See commit cd4b95852d186a63b11fc060129c3eeeaeae961f to see how this used to work.
  countryFromIP?: string;
}

const INITIAL_STATE = {
  modals: {},
  superheader: null,
};

export const GlobalUIContext =
  React.createContext<GlobalUIState>(INITIAL_STATE);

export const GlobalUIDispatchContext = React.createContext<React.Dispatch<any>>(
  function () {}
);

function reducer(state: GlobalUIState, action: any): GlobalUIState {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'OPEN_MODAL':
      case 'CLOSE_MODAL':
      case 'TOGGLE_MODAL': {
        let modal = draftState.modals[action.modalId];

        if (!modal) {
          modal = draftState.modals[action.modalId] = {
            id: action.modalId,
            isOpen: false,
          };
        }

        modal.isOpen =
          action.type === 'OPEN_MODAL'
            ? true
            : action.type === 'CLOSE_MODAL'
            ? false
            : typeof action.forcedValue === 'boolean'
            ? action.forcedValue
            : !modal.isOpen;

        return;
      }

      case 'CLOSE_ALL_MODALS': {
        draftState.modals = INITIAL_STATE.modals;
        return;
      }

      case 'DISMISS_SUPERHEADER': {
        draftState.superheader = null;
        return;
      }

      case 'RECEIVE_COUNTRY_FROM_IP': {
        draftState.countryFromIP = action.country;
        return;
      }

      default:
        return state;
    }
  });
}

function GlobalUIProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  return (
    <GlobalUIContext.Provider value={state}>
      <GlobalUIDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalUIDispatchContext.Provider>
    </GlobalUIContext.Provider>
  );
}

export function useGlobalUIState() {
  return React.useContext(GlobalUIContext);
}
export function useGlobalUIDispatch() {
  return React.useContext(GlobalUIDispatchContext);
}

export function useGlobalUIActions() {
  const dispatch = useGlobalUIDispatch();

  const openModal = React.useCallback(
    (modalId: string) => {
      dispatch({ type: 'OPEN_MODAL', modalId });
    },
    [dispatch]
  );

  const closeModal = React.useCallback(
    (modalId: string) => {
      dispatch({ type: 'CLOSE_MODAL', modalId });
    },
    [dispatch]
  );
  const closeAllModals = React.useCallback(() => {
    dispatch({ type: 'CLOSE_ALL_MODALS' });
  }, [dispatch]);

  const toggleModal = React.useCallback(
    (modalId: string, forcedValue?: boolean) => {
      dispatch({ type: 'TOGGLE_MODAL', modalId, forcedValue });
    },
    [dispatch]
  );

  const dismissSuperheader = React.useCallback(() => {
    dispatch({ type: 'DISMISS_SUPERHEADER' });
  }, [dispatch]);

  return {
    openModal,
    closeModal,
    closeAllModals,
    toggleModal,
    dismissSuperheader,
  };
}

export default GlobalUIProvider;
