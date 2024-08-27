import { createBrowserHistory } from 'history';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './app';
import { Router } from './components/router';
import { createServices } from './services';
import { createStore } from './store';
import './types/global.declaration';

const history = createBrowserHistory();

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    REDUX_DATA: Record<string, unknown>;
  }
}

const store = createStore({
  history,
  services: createServices(fetch),
});

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
