import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import MyProfile from "../pages/MyProfile";
import NoMatchPage from "../pages/NoMatchPage";
import SettingsPage from "../pages/SettingsPage";
import CardInfo from "../pages/CardInfo";
import PrivateRoute from "./private.route";
import BasketPage from "../pages/BasketPage";
import SignIn from "../components/SignIn";

function AppRoutes() {
    const navigationRoutes = [
        { path: "/reactStore", element: <MainPage /> },
        { path: "/basket", element: <BasketPage /> },
        { path: "/settings", element: <PrivateRoute><SettingsPage /></PrivateRoute> },
        {
            path: "/signIn", element: <SignIn
                isLogin={true} 
                onFormSubmit={() => console.log('Form submitted')} 
                onSwitchForm={() => console.log('Switch form')} 
                onCloseModal={() => console.log('Modal closed')}
            />
        },
        { path: "/my-profile", element: <MyProfile /> },
        { path: "/*", element: <NoMatchPage /> },
        { path: "/card-info/:productID", element: <CardInfo /> },
    ]
    return (
        <Routes>
            {navigationRoutes.map((route) => (<Route key={route.path} path={route.path} element={route.element} />))}
        </Routes>
    );
}
export default AppRoutes;