import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import { createTestScheduler } from "jest";

//Schéma utilisateur
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role : {
        type: String,
        default: "user"
    }
});


//Middleware pour hasher le mot de passe
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Méthode pour comparer le mot de passe
userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//Export du modèle
export const User = mongoose.model("user", userSchema);