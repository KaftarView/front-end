import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ElementType;
    isAllowed: boolean;
    [key: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element, isAllowed, ...rest }) => {
    return isAllowed ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;