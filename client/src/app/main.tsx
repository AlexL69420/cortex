import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import ProfilePage from "../pages/Profile.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import VariantPage from "../pages/VariantPage.tsx";
import { AuthProvider } from "../features/model/AuthContext.tsx";
import AdminPage from "../pages/AdminPage.tsx";
import Courses from "../pages/Courses.tsx";
import Constructor from "../pages/Constructor.tsx";
import ExercisesPage from "../pages/ExercisesPage.tsx";
import RegistrationPage from "../pages/RegistrationPage.tsx";
import { QueryClientProvider } from "./QueryClientProvider.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import Layout from "./AppLayout.tsx";
import MainPage from "../pages/MainPage.tsx";
import VariantsListPage from "../pages/VariantsListPage.tsx";
import { TestProvider } from "../features/model/TestContext.tsx";

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
        element: <TestProvider><VariantPage /></TestProvider>,
      },
      {
        path: "variants",
        element: <VariantsListPage />,
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
        element: <RegistrationPage />,
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
