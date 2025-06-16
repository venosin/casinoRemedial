import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuth } from './hooks/useAuth';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';

// Componentes de carga
import LoadingSpinner from './components/ui/LoadingSpinner';

// Importación perezosa (lazy loading) de páginas para mejor rendimiento
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const VerifyEmail = lazy(() => import('./pages/auth/VerifyEmail'));
const RecoverPassword = lazy(() => import('./pages/auth/RecoverPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const GameCatalog = lazy(() => import('./pages/GameCatalog'));
const GameDetails = lazy(() => import('./pages/GameDetails'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Componente principal de la aplicación que gestiona las rutas
 * Implementa rutas protegidas según el estado de autenticación y rol del usuario
 */
function App() {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  // Componente para rutas que requieren autenticación
  const ProtectedRoute = ({ children }) => {
    if (loading) return <LoadingSpinner />;
    if (!isAuthenticated) return <Navigate to="/login" />;
    return children;
  };

  // Componente para rutas que requieren rol de administrador
  const AdminRoute = ({ children }) => {
    if (loading) return <LoadingSpinner />;
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!isAdmin) return <Navigate to="/dashboard" />;
    return children;
  };

  // Componente para rutas que solo deben ser accesibles si NO está autenticado
  const PublicOnlyRoute = ({ children }) => {
    if (loading) return <LoadingSpinner />;
    if (isAuthenticated) return <Navigate to="/dashboard" />;
    return children;
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="games" element={<GameCatalog />} />
          <Route path="games/:id" element={<GameDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Rutas de autenticación */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          } />
          <Route path="/register" element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          } />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
        </Route>

        {/* Rutas protegidas para usuarios autenticados */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Route>

        {/* Rutas exclusivas de administradores */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="games" element={<AdminDashboard tab="games" />} />
          <Route path="clients" element={<AdminDashboard tab="clients" />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
