import { createReducer } from '@reduxjs/toolkit';

import { ImageState } from '../../types/image';
import { requestImage, requestImageError, requestImageSuccess } from './actions';

export const imageReducer = createReducer<ImageState>(
  {
    error: false,
    loading: false,
    url: '',
  },
  {
    [requestImage.type]: () => ({
      error: false,
      loading: true,
      url: '',
    }),
    [requestImageError.type]: () => ({
      error: true,
      loading: false,
      url: '',
    }),
    [requestImageSuccess.type]: (state, { payload }) => ({
      error: false,
      loading: false,
      url: payload.url,
    }),
  },
);
