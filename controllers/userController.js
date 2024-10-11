import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';

//Signature du token JWT
export const secret = 'your_jwt_secret_key';

//Fonction pour vérifier si l'utilisateur actuel est autorisé
const isCurrentUser = (req, userId) => {
	const stringUserId = typeof userId === "object" ? userId.toString() : userId;
	return req.user._id === stringUserId;
};

//Enregistrer un nouvel utilisateur
export const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({
            username, email, password, role: role || 'user' //Si pas de rôle spécifié, le rôle par défaut est 'user'
        });

        await user.save();

        const token = jwt.sign({ userId: user._id, role: user.role }, secret, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Connexion utilisateur
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //Génération du token JWT
        const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });

        // Retourner le token au client
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        if (req.user.role === 'admin' || req.user.role === 'employee') {
            const users = await User.find({});
            res.status(200).json(users);
        } else {
            return res.status(403).json({ message: "Access denied. Only admins and employees can view all users." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        // Vérification si l'utilisateur modifie ses propres infos ou s'il est admin
        if (req.user._id.toString() === req.params.id || req.user.role === 'admin') {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(updatedUser);
        } else {
            return res.status(403).json({ message: "You can only update your own profile or you need to be an admin." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        // Vérification si l'utilisateur supprime son propre compte ou s'il est administrateur
        if (req.user._id.toString() === req.params.id || req.user.role === 'admin') {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ message: "User deleted successfully" });
        } else {
            return res.status(403).json({ message: "You can only delete your own account or you need to be an admin." });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};