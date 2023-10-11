import { IFetch } from '../../types/fetch';

export type ImageResType = {
  avatar_url: string;
  id: string;
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
