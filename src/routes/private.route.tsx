import { FC } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
    children: React.ReactNode
}

const PrivateRoute: FC<IProps> =({ children }) => {
    const isAuth = false;
    return isAuth ? children : <Navigate to="/signIn" />;
};
export default PrivateRoute;