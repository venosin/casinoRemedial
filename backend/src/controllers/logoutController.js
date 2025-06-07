/**
 * @file logoutController.js
 * @description Controlador para manejar el cierre de sesión de usuarios
 */

/**
 * @desc    Cerrar sesión de usuario - elimina la cookie JWT
 * @route   POST /api/auth/logout
 * @access  Private
 * @param   {Object} req - Objeto de solicitud Express
 * @param   {Object} res - Objeto de respuesta Express
 */
export const logout = async (req, res) => {
    try {
        // Eliminar la cookie JWT estableciéndola como una cadena vacía y expirándola inmediatamente
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0) // Expira inmediatamente
        });
        
        // Eliminar cualquier información de sesión del usuario
        req.user = null;
        
        // Enviar respuesta exitosa
        res.status(200).json({
            success: true,
            message: 'Sesión cerrada exitosamente'
        });
    } catch (error) {
        // Registrar error para depuración
        console.error('Error durante el cierre de sesión:', error);
        
        // Enviar respuesta de error
        res.status(500).json({
            success: false,
            message: 'Error al procesar el cierre de sesión'
        });
    }
};

/**
 * @desc    Verificar estado de autenticación del usuario actual
 * @route   GET /api/auth/status
 * @access  Private
 * @param   {Object} req - Objeto de solicitud Express que debe contener el usuario autenticado
 * @param   {Object} res - Objeto de respuesta Express
 */
export const checkAuthStatus = async (req, res) => {
    // Si esta ruta se alcanza a través del middleware protect, el usuario está autenticado
    if (req.user) {
        res.json({
            success: true,
            isAuthenticated: true,
            user: {
                _id: req.user._id,
                fullName: req.user.fullName,
                email: req.user.email,
                age: req.user.age,
                country: req.user.country,
            }
        });
    } else {
        res.status(401).json({
            success: false,
            isAuthenticated: false,
            message: 'No autenticado'
        });
    }
};
