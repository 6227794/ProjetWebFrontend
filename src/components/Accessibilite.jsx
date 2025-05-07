import {Navigate, Outlet} from 'react-router-dom'

const RouteAccessible = () => {
    const user = localStorage.getItem('user');

    if (!user) {
        return <Navigate to="/Connexion" replace state={{from: location}}/>
    }

    return <Outlet />;
};
export default RouteAccessible;