// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import HomePage from "./routes/homePage/homePage.jsx";
// import ListPage from "./routes/listPage/listPage.jsx";
// import Layout from "./routes/layout/layout.jsx";
// import SinglePage from "./routes/singlePage/SinglePage.jsx";
// import ProfilePage from "./routes/profilePage/profilePage.jsx";
// import NewPostPage from "./routes/newPostPage/newPostPage.jsx";
// import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage.jsx";
// import Login from "./routes/login/login.jsx";
// import Register from "./routes/register/register.jsx";
// import RequiredAuth from './routes/layout/requiredAuth.jsx';


// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Layout />,
//       children:[
//         {
//           path:"/",
//           element:<HomePage/>
//         },
//         {
//           path:"/list",
//           element:<ListPage/>
//         },
//         {
//           path:"/:id",
//           element:<SinglePage/>
//         },
//         {
//           path:"/profile",
//           element:<ProfilePage/>
//         },
//         {
//           path:"/login",
//           element:<Login/>
//         },
//         {
//           path:"/register",
//           element:<Register/>
//         }
//       ]
//     },
//     {
//       path: "/",
//       element: <RequiredAuth />,
//       children: [
//         {
//           path: "/profile",
//           element: <ProfilePage />
//         },
//         {
//           path: "/profile/update",
//           element: <ProfileUpdatePage />,
//         },
//         {
//           path: "/add",
//           element: <NewPostPage/>
//         }
//       ]
//     },
//   ]);

//   return (

//     <RouterProvider router={router}/>
//   );
// }

// export default App;

import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homePage/homePage.jsx";
import ListPage from "./routes/listPage/listPage.jsx";
import Layout from "./routes/layout/layout.jsx";
import SinglePage from "./routes/singlePage/SinglePage.jsx";
import ProfilePage from "./routes/profilePage/profilePage.jsx";
import NewPostPage from "./routes/newPostPage/newPostPage.jsx";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage.jsx";
import Login from "./routes/login/login.jsx";
import Register from "./routes/register/register.jsx";
import { singlePageLoader } from "./lib/loaders.js";
import RequireAuth from './routes/layout/requiredAuth.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx'; // Ensure this path is correct

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/list", element: <ListPage /> },
        { path: "/:id", element: <SinglePage />, loader: singlePageLoader},
        { path: "/profile", element: <ProfilePage /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> }
      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        { path: "/profile/update", element: <ProfileUpdatePage /> },
        { path: "/add", element: <NewPostPage /> }
      ]
    },
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
