import { Outlet } from "react-router-dom";
import Header from "components/Header/Header";

// This component renders a shared layout for all child-routes.
// The Header component remains static while the <Outlet /> component renders the content
// of the route.
const AppLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
