import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import ProfilePage from "../pages/Profile.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import Variant from "../pages/Variant.tsx";
import VariantsList from "../pages/Variants.tsx";
import { AuthProvider } from "../features/model/AuthContext.tsx";
import AdminPage from "../pages/AdminPage.tsx";
import Courses from "../pages/Courses.tsx";
import Constructor from "../pages/Constructor.tsx";
import ExercisesPage from "../pages/ExercisesPage.tsx";
import RegisterForm from "../pages/RegisterPage.tsx";
import { QueryClientProvider } from "./QueryClientProvider.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Layout from "./AppLayout.tsx";
import MainPage from "../pages/MainPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Общий layout с header и footer
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Главная страница
        element: <MainPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "auth",
        element: <LoginPage />,
      },
      {
        path: "variant/:id",
        element: <Variant />,
      },
      {
        path: "variants",
        element: <VariantsList />,
      },
      {
        path: "exercises",
        element: <ExercisesPage />,
      },
      {
        path: "adminpage",
        element: <AdminPage />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "constructor",
        element: <Constructor />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "notfound",
        element: <NotFoundPage />,
      },
      {
        path: "error",
        element: <ErrorPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <React.StrictMode>
      <QueryClientProvider>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
    ,
  </AuthProvider>,
);
