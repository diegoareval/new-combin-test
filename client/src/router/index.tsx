import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Members from "../pages/members";
import Login from "../pages/login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Members />,
  },
]);

const RootRouter = () => {
  return <RouterProvider router={router} />;
};

export default RootRouter;
