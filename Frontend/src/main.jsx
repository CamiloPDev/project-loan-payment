import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/home/Home';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/administration/Admin';


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home/>,
      errorElement: <NotFoundPage/>
    },
    {
      path: '/administration',
      element: <AdminPage/>,
      errorElement: <NotFoundPage/>
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
