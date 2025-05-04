import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import MyProfile from "../pages/MyProfile";
import NoMatchPage from "../pages/NoMatchPage";
import SettingsPage from "../pages/SettingsPage";
import CardInfo from "../pages/CardInfo";
import PrivateRoute from "./private.route";
import BasketPage from "../pages/BasketPage";
import FavouritePage from "../pages/FavouritePage";
interface AppRoutesProps {
    secretBgActive: boolean;
}
const AppRoutes: React.FC<AppRoutesProps> = ({ secretBgActive }) => {
    const navigationRoutes = [
        { path: "/reactStore", element: <MainPage secretBgActive={secretBgActive} /> },
        { path: "/reactStore/basket", element: <BasketPage /> },
        { path: "/reactStore/favourite", element: <FavouritePage /> },
        { path: "/reactStore/settings", element: <PrivateRoute><SettingsPage /></PrivateRoute> },
        { path: "/reactStore/my-profile", element: <MyProfile /> },
        { path: "/reactStore/*", element: <NoMatchPage /> },
        { path: "/reactStore/card-info/:productID", element: <CardInfo /> },
    ]
    return (
        <Routes>
            {navigationRoutes.map((route) => (<Route key={route.path} path={route.path} element={route.element} />))}
        </Routes>
    );
}
export default AppRoutes;