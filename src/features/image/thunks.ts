import { ThunkResult } from '../../types/thunk';
import { requestImage, requestImageError, requestImageSuccess } from './actions';

export const fetchImage =
  (): ThunkResult =>
  async (dispatch, getState, { services }) => {
    try {
      dispatch(requestImage());
      const { avatar_url: url } = await services.image.fetchImage();
      dispatch(requestImageSuccess({ url }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      dispatch(requestImageError());
    }
  };
