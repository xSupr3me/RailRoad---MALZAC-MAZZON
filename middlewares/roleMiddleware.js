export const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        //Vérif rôle de l'utilisateur et si il a les permissions
        if (!req.user || !requiredRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "You do not have the required permissions." });
        }
        next();
    };
};
