import { AuthLayout } from 'layouts/AuthLayout'
import { AuthRedirector, RootLayout } from 'layouts/RootLayout'
import { Login } from 'pages/auth/Login'
import { NotFound } from 'pages/errors/NotFound'
import { Home } from 'pages/Home'
import { RecognitionDefects } from 'pages/recognition/RecognitionDefects'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const routes = [
  {
    path: '/',
    Component: Home,
    Layout: RootLayout,
  },
  {
    path: '/auth/login',
    Component: Login,
    Layout: AuthLayout,
  },
  {
    path: '/recognition/defects',
    Component: RecognitionDefects,
    Layout: RootLayout,
  },
  {
    path: '*',
    Component: NotFound,
    Layout: RootLayout,
  },
]

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthRedirector />
      <Routes>
        {routes.map(({ path, Component, Layout }) => (
          <Route
            key={path}
            path={path}
            element={
              <Layout>
                <Component />
              </Layout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
