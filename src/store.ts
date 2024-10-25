import { configureStore, Store } from '@reduxjs/toolkit';

import { imageReducer } from './features/image';
import { RootState, StoreProps } from './types/store';
import { isDevelopment } from './utils/environments';

export const createStore = ({ history, initialState, services }: StoreProps): Store<RootState> =>
  configureStore({
    devTools: isDevelopment(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: true,
        serializableCheck: false,
        thunk: {
          extraArgument: {
            history,
            services,
          },
        },
      }),
    preloadedState: initialState || {},
    reducer: {
      image: imageReducer,
    },
  });
