import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiSave, FiKey, FiUser, FiMail, FiCamera } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

/**
 * Página de perfil de usuario para gestionar datos personales
 */
const Profile = () => {
  const { user, updateProfile, updatePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  
  const { 
    register: registerPersonal, 
    handleSubmit: handleSubmitPersonal,
    formState: { errors: errorsPersonal }
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  });
  
  const { 
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    formState: { errors: errorsPassword }
  } = useForm();
  
  const newPassword = watchPassword('newPassword');
  
  const onSubmitPersonal = async (data) => {
    setLoading(true);
    try {
      await updateProfile(data);
      toast.success('Perfil actualizado correctamente');
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };
  
  const onSubmitPassword = async (data) => {
    setLoading(true);
    try {
      await updatePassword(data.currentPassword, data.newPassword);
      toast.success('Contraseña actualizada correctamente');
    } catch (error) {
      console.error(error);
      toast.error('Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerCustom mx-auto px-4 py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold font-display mb-2">
          Mi Perfil
        </h1>
        <p className="text-neutral/70">
          Administra tu información personal y preferencias
        </p>
      </motion.div>
      
      {/* Pestaña de navegación */}
      <div className="flex border-b border-gray-800 mb-8">
        <button
          className={`pb-4 px-4 font-medium ${activeTab === 'personal' ? 'text-primary border-b-2 border-primary' : 'text-neutral/70 hover:text-neutral'}`}
          onClick={() => setActiveTab('personal')}
        >
          Información Personal
        </button>
        <button
          className={`pb-4 px-4 font-medium ${activeTab === 'security' ? 'text-primary border-b-2 border-primary' : 'text-neutral/70 hover:text-neutral'}`}
          onClick={() => setActiveTab('security')}
        >
          Seguridad
        </button>
        <button
          className={`pb-4 px-4 font-medium ${activeTab === 'preferences' ? 'text-primary border-b-2 border-primary' : 'text-neutral/70 hover:text-neutral'}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferencias
        </button>
      </div>
      
      {/* Contenido de la pestaña actual */}
      {activeTab === 'personal' && (
        <motion.div
          key="personal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avatar y foto de perfil */}
            <div className="lg:col-span-1">
              <div className="bg-secondary border border-gray-800 rounded-lg p-6 text-center">
                <div className="relative w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold">{user?.name?.charAt(0) || 'U'}</span>
                  <div className="absolute bottom-0 right-0 bg-primary rounded-full p-2 border-2 border-secondary">
                    <FiCamera />
                  </div>
                </div>
                <h3 className="font-bold text-lg">{user?.name || 'Usuario'}</h3>
                <p className="text-neutral/70 mb-4">{user?.email || 'usuario@ejemplo.com'}</p>
                <button className="text-primary text-sm hover:underline">
                  Cambiar imagen
                </button>
              </div>
            </div>
            
            {/* Formulario de información personal */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmitPersonal(onSubmitPersonal)} className="bg-secondary border border-gray-800 rounded-lg p-6 space-y-6">
                <h2 className="text-xl font-bold mb-4">Información Personal</h2>
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium block">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-neutral/50" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      {...registerPersonal("name", { 
                        required: "Nombre es requerido"
                      })}
                      className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  {errorsPersonal.name && <p className="text-sm text-error mt-1">{errorsPersonal.name.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium block">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-neutral/50" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      disabled
                      {...registerPersonal("email")}
                      className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent opacity-70 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-neutral/50">El email no puede ser modificado directamente</p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium block">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    {...registerPersonal("phone")}
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 btnPrimaryGradient rounded-lg flex items-center hover:btnPrimaryGradientHover disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <FiSave className="mr-2" /> Guardar cambios
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      )}
      
      {activeTab === 'security' && (
        <motion.div
          key="security"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-secondary border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Seguridad de la cuenta</h2>
            
            <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6 max-w-md">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="text-sm font-medium block">
                  Contraseña actual
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiKey className="text-neutral/50" />
                  </div>
                  <input
                    id="currentPassword"
                    type="password"
                    {...registerPassword("currentPassword", { 
                      required: "Contraseña actual es requerida"
                    })}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="********"
                  />
                </div>
                {errorsPassword.currentPassword && <p className="text-sm text-error mt-1">{errorsPassword.currentPassword.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium block">
                  Nueva contraseña
                </label>
                <input
                  id="newPassword"
                  type="password"
                  {...registerPassword("newPassword", { 
                    required: "Nueva contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres"
                    }
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="********"
                />
                {errorsPassword.newPassword && <p className="text-sm text-error mt-1">{errorsPassword.newPassword.message}</p>}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium block">
                  Confirmar nueva contraseña
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...registerPassword("confirmPassword", { 
                    required: "Confirmación de contraseña es requerida",
                    validate: value => value === newPassword || "Las contraseñas no coinciden"
                  })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="********"
                />
                {errorsPassword.confirmPassword && <p className="text-sm text-error mt-1">{errorsPassword.confirmPassword.message}</p>}
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="px-4 py-2 btnPrimaryGradient rounded-lg flex items-center hover:btnPrimaryGradientHover disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <FiKey className="mr-2" /> Cambiar contraseña
              </button>
            </form>
          </div>
        </motion.div>
      )}
      
      {activeTab === 'preferences' && (
        <motion.div
          key="preferences"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-secondary border border-gray-800 rounded-lg p-6"
        >
          <h2 className="text-xl font-bold mb-6">Preferencias</h2>
          <p className="text-neutral/70">Configuración de preferencias próximamente...</p>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
