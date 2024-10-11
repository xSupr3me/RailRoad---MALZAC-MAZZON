export const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        try {
            // Vérifier si l'ID de la requête est présent
            if (!req.params.id) {
                return res.status(400).json({ message: "Bad Request. User ID is required." });
            }

            // Si l'utilisateur tente de modifier ou supprimer son propre compte
            if (req.user._id.toString() === req.params.id) {
                return next();
            }

            // Vérifier si l'utilisateur a l'un des rôles requis
            if (!requiredRoles.includes(req.user.role)) {
                return res.status(403).json({
                    message: `Access denied. You need one of the following roles: ${requiredRoles.join(", ")}.`
                });
            }

            // Si toutes les conditions sont remplies, passer au contrôleur suivant
            next();
        } catch (error) {
            // Capture toute autre erreur non prévue
            return res.status(500).json({ message: "Server error. Please try again later." });
        }
    };
};
