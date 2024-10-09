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
    const { username, email, password } = req.body;
    if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    //Génération token JWT
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    res.status(201).json({ token });
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
        const token = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: '1h' });

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

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        // Vérification si l'utilisateur actuel est autorisé
        if (!isCurrentUser(req, userId)) {
            return res.status(403).send("You are not authorized to perform this action");
        }

        // Mise à jour du profil utilisateur
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(user);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Supprimer un utilisateur
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!isCurrentUser(req, userId)) {
            return res.status(403).send("You are not authorized to perform this action");
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json({ message: 'User deleted' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
