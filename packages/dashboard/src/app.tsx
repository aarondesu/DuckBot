import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Store from './store';
import ApplicationRoutes from './routes';

import 'semantic-ui-css/semantic.min.css';

const Application: FC = () => {
  return (
    <>
      <Provider store={Store}>
        <BrowserRouter>
          <ApplicationRoutes />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default Application;
