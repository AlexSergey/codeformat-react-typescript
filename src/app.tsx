import './assets/styles/global.scss';
import loadable from '@loadable/component';
import { Routes, Navigate, Route } from 'react-router-dom';

import { Index } from './pages/index';

const Home = loadable(() => import('./pages/home/index.loadable'));
const Image = loadable(() => import('./pages/image/index.loadable'));

export const App = (): JSX.Element => (
  <Index>
    <Routes>
      <Route index element={<Home />} />
      <Route path="image" element={<Image />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Index>
);
