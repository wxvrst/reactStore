import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import MyProfile from "../pages/MyProfile";
import NoMatchPage from "../pages/NoMatchPage";
import SettingsPage from "../pages/SettingsPage";
import CardInfo from "../pages/CardInfo";
import PrivateRoute from "./private.route";
import BasketPage from "../pages/BasketPage";
import SignIn from "../components/SignIn";
import FavouritePage from "../pages/FavouritePage";

function AppRoutes() {
    const navigationRoutes = [
        { path: "/reactStore/main", element: <MainPage /> },
        { path: "/reactStore/basket", element: <BasketPage /> },
        { path: "/reactStore/favourite", element: <FavouritePage /> },
        { path: "/reactStore/settings", element: <PrivateRoute><SettingsPage /></PrivateRoute> },
        {
            path: "/reactStore/signIn", element: <SignIn
                isLogin={true} 
                onFormSubmit={() => console.log('Form submitted')} 
                onSwitchForm={() => console.log('Switch form')} 
                onCloseModal={() => console.log('Modal closed')}
            />
        },
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