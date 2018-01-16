export const logger = (state) => {
  return (next) => {
    return (action) => {
      // write your middlewear logic before Dispatching
      //console.log('[Middleware] Dispatching', action);
      //// console.log('[Middleware] prevState', store.getState());

      // Dispatch the action to the reducer function.
      const result = next(action);

      // After dispatching and returning statae from the reducer function.
      //// console.log('[Middleware] next state', store.getState() );

      return result;
    };
  };
};
