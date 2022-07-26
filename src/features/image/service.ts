import { IFetch } from '../../types/fetch';

export type ImageResType = {
  id: string;
  avatar_url: string;
};

export interface IImageService {
  fetchImage: () => Promise<ImageResType>;
}

export const imageService = (rest: IFetch): IImageService => ({
  fetchImage: async (): Promise<ImageResType> => {
    const response = await rest('https://api.github.com/users/defunkt');

    return await response.json();
  },
});
