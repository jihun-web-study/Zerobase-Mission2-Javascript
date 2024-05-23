let state = null;
let listeners = [];

/**
 * state = createState({category: "all"});
 * state.category = "foo";
 */

// 상태와 상태 변화를 구독할 리스너들을 관리하는 객체
const createState = (initialState) => {
  state = new Proxy(initialState, {
    set(target, key, newState) {
      if (target[key] === newState) return false;

      //console.log(listeners, key, newState);
      console.log(`[state change] ${key} : ${target[key]} =>  ${newState}`);

      target[key] = newState;
      listeners.forEach((component) => {
        component.render();
      }); // re-rendering

      return true;
    },
  });
};

const subscribe = (newListener) => {
  if (!listeners.includes(newListener)) listeners = [...listeners, newListener];
  console.log("----", listeners);

  // unsubscribe
  return () => {
    listeners = listeners.filter((listener) => listener !== newListener);
  };
};

const store = {
  state,
  createState,
  subscribe,
};

export default store;
export { state, createState, subscribe };
