export const restrictRoleMiddleware = (req, res, next) => {
    // Vérifie d'abord si req.body est défini
    if (!req.body) {
        return res.status(400).json({ message: "Bad request, no body found in the request." });
    }

    console.log('req.body:', req.body);
    console.log('req.user:', req.user);

    // Vérifie si le rôle est présent dans la requête et si l'utilisateur n'est pas admin
    if (req.body.role && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. You need one of the following roles: admin" });
    }

    next();
};