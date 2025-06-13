import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUsers, FiDollarSign, FiActivity, FiPlay } from 'react-icons/fi';

/**
 * Dashboard de administración con estadísticas y panel de control
 */
const AdminDashboard = () => {
  // Datos ficticios para demostración
  const [stats] = useState({
    totalUsers: 458,
    activeUsers: 124,
    dailyRevenue: 4850,
    monthlyRevenue: 142500,
    gamesPlayed: 1254,
    conversionRate: '8.4%'
  });

  return (
    <div className="w-full">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold font-display mb-2">
          Dashboard de Administración
        </h1>
        <p className="text-neutral/70">
          Monitorea la actividad y estadísticas del sitio
        </p>
      </motion.div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <motion.div 
          className="bg-secondary p-4 rounded-lg border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-neutral/70 font-medium">Usuarios totales</h3>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <FiUsers className="text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
          <div className="flex items-center text-sm text-success">
            <span className="inline-block mr-1">↑ 5.2%</span>
            <span className="text-neutral/70">vs. mes anterior</span>
          </div>
        </motion.div>

        <motion.div 
          className="bg-secondary p-4 rounded-lg border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-neutral/70 font-medium">Ingresos diarios</h3>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <FiDollarSign className="text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold">${stats.dailyRevenue}</p>
          <div className="flex items-center text-sm text-success">
            <span className="inline-block mr-1">↑ 12.8%</span>
            <span className="text-neutral/70">vs. ayer</span>
          </div>
        </motion.div>

        <motion.div 
          className="bg-secondary p-4 rounded-lg border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-neutral/70 font-medium">Usuarios activos</h3>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <FiActivity className="text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold">{stats.activeUsers}</p>
          <div className="flex items-center text-sm text-error">
            <span className="inline-block mr-1">↓ 2.5%</span>
            <span className="text-neutral/70">vs. ayer</span>
          </div>
        </motion.div>

        <motion.div 
          className="bg-secondary p-4 rounded-lg border border-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-neutral/70 font-medium">Juegos iniciados</h3>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <FiPlay className="text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold">{stats.gamesPlayed}</p>
          <div className="flex items-center text-sm text-success">
            <span className="inline-block mr-1">↑ 8.3%</span>
            <span className="text-neutral/70">vs. ayer</span>
          </div>
        </motion.div>
      </div>

      {/* Gráfico principal - Simplemente un placeholder */}
      <motion.div
        className="bg-secondary border border-gray-800 rounded-lg p-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-4">Actividad semanal</h2>
        <div className="h-64 flex items-center justify-center">
          <p className="text-neutral/70">Aquí iría el gráfico de actividad semanal</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Últimos usuarios registrados */}
        <motion.div
          className="bg-secondary border border-gray-800 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-bold">Últimos usuarios registrados</h2>
            <Link to="/admin/users" className="text-primary text-sm hover:underline">Ver todos</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-4 py-3 text-left">Usuario</th>
                  <th className="px-4 py-3 text-left">Fecha</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">maria@ejemplo.com</td>
                  <td className="px-4 py-3">12/06/2025</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-warning/20 text-warning rounded text-xs">Pendiente</span></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">juan@ejemplo.com</td>
                  <td className="px-4 py-3">11/06/2025</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-success/20 text-success rounded text-xs">Verificado</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3">ana@ejemplo.com</td>
                  <td className="px-4 py-3">10/06/2025</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-success/20 text-success rounded text-xs">Verificado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Transacciones recientes */}
        <motion.div
          className="bg-secondary border border-gray-800 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-bold">Transacciones recientes</h2>
            <Link to="/admin/transactions" className="text-primary text-sm hover:underline">Ver todas</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-4 py-3 text-left">Usuario</th>
                  <th className="px-4 py-3 text-left">Monto</th>
                  <th className="px-4 py-3 text-left">Tipo</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">pedro@ejemplo.com</td>
                  <td className="px-4 py-3">$500</td>
                  <td className="px-4 py-3">Depósito</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-success/20 text-success rounded text-xs">Completado</span></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">luis@ejemplo.com</td>
                  <td className="px-4 py-3">$1,200</td>
                  <td className="px-4 py-3">Retiro</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-warning/20 text-warning rounded text-xs">Pendiente</span></td>
                </tr>
                <tr>
                  <td className="px-4 py-3">carmen@ejemplo.com</td>
                  <td className="px-4 py-3">$800</td>
                  <td className="px-4 py-3">Depósito</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-success/20 text-success rounded text-xs">Completado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Acciones rápidas */}
      <motion.div
        className="bg-secondary border border-gray-800 rounded-lg p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h2 className="text-xl font-bold mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/users/new" className="bg-gray-800 hover:bg-gray-700 transition-colors p-4 rounded-lg text-center">
            Crear usuario
          </Link>
          <Link to="/admin/games/new" className="bg-gray-800 hover:bg-gray-700 transition-colors p-4 rounded-lg text-center">
            Añadir juego
          </Link>
          <Link to="/admin/promotions" className="bg-gray-800 hover:bg-gray-700 transition-colors p-4 rounded-lg text-center">
            Gestionar promociones
          </Link>
          <Link to="/admin/settings" className="bg-gray-800 hover:bg-gray-700 transition-colors p-4 rounded-lg text-center">
            Configuración
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
