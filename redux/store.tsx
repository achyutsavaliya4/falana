import { Store } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware, { Task } from "redux-saga";
import rootReducer, { RootState } from "./index";
import { configureStore } from "@reduxjs/toolkit";
import { watcherSaga } from "./sagas";

// Define the type for the store creation function
const makeStore: any = () => {
  // Create the saga middleware
  const sagaMiddleware = createSagaMiddleware();

  // Create store with middleware
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  });

  // Run sagas on server
  const sagaTask: Task = sagaMiddleware.run(watcherSaga);

  // Attach the sagaTask to the store
  // Using 'any' here because 'sagaTask' is not a standard Redux property
  (store as any).sagaTask = sagaTask;

  // Return the store
  return store;
};

// Create the Redux wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NEXT_PUBLIC_IS_DEBUG === "true" ? true : false,
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
});

// Export the wrapper and makeStore
export const store = makeStore();
export const dispatch = store.dispatch;
