import { useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.user);
  if (!userInfo) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>

        {/* <Button variant="contained">
          <NavLink to="/">Home</NavLink>
        </Button> */}
      </div>
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
