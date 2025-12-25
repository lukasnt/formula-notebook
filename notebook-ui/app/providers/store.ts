import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { notebookSlice } from "~/providers/notebook-slices";
import { formulaSlice } from "~/providers/formula-slices";

export const rootReducer = combineSlices(notebookSlice, formulaSlice);

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
