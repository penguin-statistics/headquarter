import { EuiProvider } from '@elastic/eui'
import React from 'react'
import ReactDOM from 'react-dom'

import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { Router } from 'routes'
import store from 'store'
import './eui'
import './i18n'
import './styles/index.ts'

const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <EuiProvider colorMode="light">
        <PersistGate loading={null} persistor={persistor}>
          <Helmet
            titleTemplate="%s — Penguin Statistics"
            defaultTitle="Headquarter"
          />
          <Router />
        </PersistGate>
      </EuiProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
)
