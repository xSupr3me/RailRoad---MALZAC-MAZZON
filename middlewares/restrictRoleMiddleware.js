// export const restrictRoleUpdate = (req, res, next) => {
//     console.log('req.body:', req.body);
//     console.log('req.user:', req.user);

//     if (req.body.role && (!req.user || req.user.role !== 'admin')) {
//         return res.status(403).json({ message: "You are not allowed to change the role." });
//     }

//     next();
// };