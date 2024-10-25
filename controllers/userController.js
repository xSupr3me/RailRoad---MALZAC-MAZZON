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

export const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Créer un nouvel utilisateur
        const user = new User({ username, email, password, role: role || 'user' });
        await user.save();

        const token = jwt.sign({ userId: user._id, role: user.role }, secret, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: 'An error occurred while registering the user. Please try again.' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found : unauthorized' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'An error occurred during login. Please try again.' });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'An error occurred while retrieving the user profile.' });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'An error occurred while retrieving users.' });
    }
};


export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        // Vérifier si le nouveau username existe déjà dans la base de données (et que ce n'est pas l'utilisateur actuel)
        if (req.body.username) {
            const existingUser = await User.findOne({ username: req.body.username });
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({ message: 'Username already in use by another user.' });
            }
        }

        // Mise à jour de l'utilisateur
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: 'An error occurred while updating the user profile.' });
    }
};



export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
};

