import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './components/layout/HomeLayout.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import HomePage from './pages/HomePage.jsx'
import AccountPage from './pages/AccountPage.jsx'
import MoviesPage from './pages/MoviesPage.jsx'
import TicketPage from './pages/TicketPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

function App() {


  const router = createBrowserRouter([{
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/account", element: <AccountPage /> },
      { path: "/movies", element: <MoviesPage /> },
      { path: "/tickets", element: <TicketPage /> },
      { path: "/tickets", element: <TicketPage /> }
    ]
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },])

  return <RouterProvider router={router} />
}

export default App
