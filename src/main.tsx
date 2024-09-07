import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './index.css'
import { RouterProvider, createHashRouter } from "react-router-dom";
import LegacyApp from './pages//LegacyApp.tsx';
import Root from './pages/Root.tsx';
import { GREPage } from './pages/GRE.tsx';

const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: "",
        element: <App />
      },
      {
        path: "legacy",
        element: <LegacyApp />,
      },
      {
        path: "gre",
        element: <GREPage />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>,
)
