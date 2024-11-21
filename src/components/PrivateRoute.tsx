import React from "react";

interface PrivateRouteProps {
    element: React.ReactElement; 
    isAllowed: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAllowed }) => {
    return isAllowed ? element : <div>Access Denied</div>;
};

export default PrivateRoute;
