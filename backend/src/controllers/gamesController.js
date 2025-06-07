import Game from '../models/games.js';

/**
 * @desc    Crear un nuevo juego
 * @route   POST /api/games
 * @access  Private/Admin
 */
export const createGame = async (req, res) => {
    try {
        // Obtener datos del body
        const { name, category, minBet, maxBet } = req.body;
        
        // Verificar si ya existe un juego con ese nombre
        const gameExists = await Game.findOne({ name });
        
        if (gameExists) {
            return res.status(400).json({ 
                success: false, 
                message: 'Ya existe un juego con ese nombre' 
            });
        }
        
        // Crear el nuevo juego
        const game = await Game.create({
            name,
            category,
            minBet,
            maxBet,
            active: req.body.active !== undefined ? req.body.active : true
        });
        
        // Responder con el juego creado
        res.status(201).json({
            success: true,
            game
        });
    } catch (error) {
        // Manejo de errores específicos de validación de Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        
        console.error('Error al crear juego:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};

/**
 * @desc    Obtener todos los juegos
 * @route   GET /api/games
 * @access  Public
 */
export const getAllGames = async (req, res) => {
    try {
        // Construir query con opciones de filtrado
        const query = {};
        
        // Filtrar por categoría si se especifica
        if (req.query.category) {
            query.category = req.query.category;
        }
        
        // Filtrar por estado activo o inactivo si se especifica
        if (req.query.active !== undefined) {
            query.active = req.query.active === 'true';
        }
        
        // Obtener juegos con los filtros aplicados
        const games = await Game.find(query);
        
        res.json({
            success: true,
            count: games.length,
            games
        });
    } catch (error) {
        console.error('Error al obtener juegos:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};

/**
 * @desc    Obtener un juego por ID
 * @route   GET /api/games/:id
 * @access  Public
 */
export const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        
        if (game) {
            res.json({
                success: true,
                game
            });
        } else {
            res.status(404).json({ 
                success: false, 
                message: 'Juego no encontrado' 
            });
        }
    } catch (error) {
        console.error('Error al obtener juego por ID:', error);
        
        // Manejar error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de juego inválido' 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};

/**
 * @desc    Obtener juegos por categoría
 * @route   GET /api/games/category/:categoryName
 * @access  Public
 */
export const getGamesByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;
        
        // Verificar que la categoría sea válida según el enum del modelo
        const validCategories = ["Mesa", "Electrónico", "Lotería", "Cartas", "Dados", "Otros"];
        
        if (!validCategories.includes(categoryName)) {
            return res.status(400).json({
                success: false,
                message: 'Categoría no válida'
            });
        }
        
        // Buscar juegos por categoría
        const games = await Game.find({ category: categoryName, active: true });
        
        res.json({
            success: true,
            count: games.length,
            games
        });
    } catch (error) {
        console.error('Error al obtener juegos por categoría:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};

/**
 * @desc    Actualizar juego
 * @route   PUT /api/games/:id
 * @access  Private/Admin
 */
export const updateGame = async (req, res) => {
    try {
        // Buscar juego por ID
        const game = await Game.findById(req.params.id);
        
        if (!game) {
            return res.status(404).json({ 
                success: false, 
                message: 'Juego no encontrado' 
            });
        }
        
        const { name, category, minBet, maxBet, active } = req.body;
        
        // Si se cambia el nombre, verificar que no esté en uso
        if (name && name !== game.name) {
            const nameExists = await Game.findOne({ name });
            if (nameExists) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Ya existe un juego con ese nombre' 
                });
            }
        }
        
        // Actualizar los campos
        game.name = name || game.name;
        game.category = category || game.category;
        
        // Para valores numéricos, verificamos si son 0 o valores positivos
        if (minBet !== undefined) {
            game.minBet = minBet;
        }
        
        if (maxBet !== undefined) {
            game.maxBet = maxBet;
        }
        
        // Para boolean, verificamos que no sea undefined
        if (active !== undefined) {
            game.active = active;
        }
        
        // Guardar los cambios
        const updatedGame = await game.save();
        
        res.json({
            success: true,
            game: updatedGame
        });
    } catch (error) {
        // Manejo de errores específicos de validación de Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        
        console.error('Error al actualizar juego:', error);
        
        // Manejar error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de juego inválido' 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};

/**
 * @desc    Cambiar estado de activación de un juego
 * @route   PATCH /api/games/:id/toggle-active
 * @access  Private/Admin
 */
export const toggleGameActive = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        
        if (!game) {
            return res.status(404).json({ 
                success: false, 
                message: 'Juego no encontrado' 
            });
        }
        
        // Cambiar el estado
        game.active = !game.active;
        
        // Guardar el cambio
        await game.save();
        
        res.json({
            success: true,
            active: game.active,
            message: `Juego ${game.active ? 'activado' : 'desactivado'} correctamente`
        });
    } catch (error) {
        console.error('Error al cambiar estado del juego:', error);
        
        // Manejar error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de juego inválido' 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};

/**
 * @desc    Eliminar juego
 * @route   DELETE /api/games/:id
 * @access  Private/Admin
 */
export const deleteGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        
        if (!game) {
            return res.status(404).json({ 
                success: false, 
                message: 'Juego no encontrado' 
            });
        }
        
        await game.deleteOne();
        
        res.json({
            success: true,
            message: 'Juego eliminado correctamente'
        });
    } catch (error) {
        console.error('Error al eliminar juego:', error);
        
        // Manejar error de ID inválido
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ 
                success: false, 
                message: 'ID de juego inválido' 
            });
        }
        
        res.status(500).json({ 
            success: false, 
            message: 'Error del servidor' 
        });
    }
};
