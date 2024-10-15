import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import trainRoutes from "./routes/trainRoutes.js";
import trainstationRoutes from "./routes/trainstationRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001; // Utilise le port défini dans l'environnement, sinon 3000 par défaut
  const dbUrl = "mongodb+srv://mm63mm007:6n0HrE0tUapjcNq4@jsprojectmalzacmazzon.7cyqu.mongodb.net/JSProject";

mongoose.connect(dbUrl)
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, () => 
            console.log(`Server running at http://localhost:${PORT}/`)
        );
    })
    .catch((error) => console.error('Database connection error:', error));

//Routes utilisateurs à ajouter ici

app.use("/users", userRoutes);
app.use("/trains", trainRoutes);
app.use("/trainstations", trainstationRoutes);


//Reste des routes à ajouter ici

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).send("Not found");
});