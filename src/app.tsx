import loadable from '@loadable/component';
import { Navigate, Route, Routes } from 'react-router-dom';

import './assets/styles/global.scss';
import { Index } from './pages/index';

const Home = loadable(() => import('./pages/home/index.loadable'));
const Image = loadable(() => import('./pages/image/index.loadable'));

export const App = (): JSX.Element => (
  <Index>
    <Routes>
      <Route element={<Home />} index />
      <Route element={<Image />} path="image" />
      <Route element={<Navigate to="/" />} path="*" />
    </Routes>
  </Index>
);
