import React from 'react';
import ReactDOM from 'react-dom';
import {SnackbarProvider} from 'notistack';
import {CssBaseline} from '@material-ui/core';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter as RouterProvider} from 'react-router-dom';

import {configureStore} from './libraries';
import {ScrollToTopLayout} from './layouts';
import {Routes, Notifier} from './components';

const {store, persistor} = configureStore();
const rootElement = document.getElementById('root');

const wrappedApp = (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider>
        <SnackbarProvider>
          <ScrollToTopLayout>
            <CssBaseline />
            <Notifier />
            <Routes />
          </ScrollToTopLayout>
        </SnackbarProvider>
      </RouterProvider>
    </PersistGate>
  </ReduxProvider>
);

ReactDOM.render(wrappedApp, rootElement);
