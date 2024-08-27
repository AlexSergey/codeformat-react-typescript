import { IFetch } from '../../types/fetch';

export interface IImageResType {
  avatar_url: string;
  id: string;
}

export interface IImageService {
  fetchImage: () => Promise<IImageResType>;
}

export const imageService = (rest: IFetch): IImageService => ({
  fetchImage: async (): Promise<IImageResType> => {
    const response = await rest('https://api.github.com/users/defunkt');

    return await response.json();
  },
});
