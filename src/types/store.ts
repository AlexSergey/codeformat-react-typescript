import { ThunkDispatch } from '@reduxjs/toolkit';
import { History } from 'history';
import { Action } from 'redux';

import { Services } from '../services';
import { ImageState } from './image';

export type Dispatcher = ThunkDispatch<RootState, ThunkExtras, Action>;

export interface RootState {
  image: ImageState;
}

export interface StoreProps extends ThunkExtras {
  initialState?: Record<string, unknown>;
}

export interface ThunkExtras {
  history: History;
  services: Services;
}
