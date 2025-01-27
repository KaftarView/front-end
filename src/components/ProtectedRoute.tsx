import { useAuth } from './AuthContext';
import UnauthorizedError from './UnauthorizedError';

interface ProtectedRouteProps {
  element: React.ReactNode;
  requiredRole: string;
}

const ProtectedRoute = ({ element, requiredRole }: ProtectedRouteProps) => {
  const { getUserPermissions, isAuthenticated } = useAuth();
  const userPermissions = getUserPermissions()
  console.log(userPermissions)
  if (!userPermissions.includes(requiredRole) && !userPermissions.includes("All")) {
    return <UnauthorizedError />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;