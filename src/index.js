import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const appElement = document.getElementById('root');

ReactDOM.render(<App />, appElement);
if (module.hot) {
  module.hot.accept('./App', () => {
    /* eslint-disable global-require */
    const NextApp = require('./App').default;
    ReactDOM.render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        appElement
    );
    /* eslint-enable no-console */
  });
}
registerServiceWorker();
