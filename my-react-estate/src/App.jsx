import HomePage from "./routes/homePage/homePage.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage.jsx";
import Layout from "./routes/layout/layout.jsx";
import SinglePage from "./routes/singlePage/SinglePage.jsx";
import ProfilePage from "./routes/profilePage/profilePage.jsx";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import Login from "./routes/login/login.jsx";
import Register from "./routes/register/register.jsx";
import RequiredAuth from './routes/layout/requiredAuth.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>
        },
        {
          path:"/:id",
          element:<SinglePage/>
        },
        {
          path:"/profile",
          element:<ProfilePage/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        }
      ]
    },
    {
      path: "/",
      element: <RequiredAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
      ]
    },
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;
