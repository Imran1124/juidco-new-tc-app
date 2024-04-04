import { createStore } from 'little-state-machine';

export const littleMachineStore = createStore({
  ePramaan: {
    codeVerifier: '',
    nonce: '',
    url: ''
  }
});

export function updateAction(state, payload) {
  return {
    ...state,
    ...payload
  };
}
