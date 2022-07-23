import { imageService, IImageService } from './features/Image/service';
import { IFetch } from './types/fetch';

export interface IServices {
  image: IImageService;
}

export const createServices = (rest: IFetch): IServices => ({
  image: imageService(rest),
});
