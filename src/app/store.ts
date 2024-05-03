import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskSlice from "./features/task/taskSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  REGISTER,
  PURGE,
  PERSIST,
  PAUSE,
} from "redux-persist";

const persistConfig = {
  key: "todo-list",
  version: 1,
  storage,
};
export const rootReducer = combineReducers({
  tasks: taskSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
