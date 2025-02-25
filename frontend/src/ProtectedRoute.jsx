import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuth();

    // Si no hay usuario autenticado, redirige al login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si el rol del usuario no coincide con el requerido, redirige al inicio
    if (user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    // Si todo está bien, renderiza los componentes hijos
    return children;
};

export default ProtectedRoute;
