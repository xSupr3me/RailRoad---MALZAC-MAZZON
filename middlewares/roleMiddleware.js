export const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        // Si l'utilisateur tente de modifier ou supprimer son propre compte
        if (req.user._id.toString() === req.params.id) {
            return next();
        }

        // Vérifier si l'utilisateur a l'un des rôles requis
        if (!requiredRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }

        next();
    };
};