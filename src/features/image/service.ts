import { Fetch } from '../../types/fetch';

export interface ImageResType {
  avatar_url: string;
  id: string;
}

export interface ImageService {
  fetchImage: () => Promise<ImageResType>;
}

export const imageService = (rest: Fetch): ImageService => ({
  fetchImage: async (): Promise<ImageResType> => {
    const response = await rest('https://api.github.com/users/defunkt');

    return await response.json();
  },
});
