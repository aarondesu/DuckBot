import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Store from './store';
import ApplicationRoutes from './routes';
import { API_URL } from './constants';

import 'semantic-ui-css/semantic.min.css';

const Application: FC = () => {
  const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={Store}>
          <BrowserRouter>
            <ApplicationRoutes />
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </>
  );
};

export default Application;
