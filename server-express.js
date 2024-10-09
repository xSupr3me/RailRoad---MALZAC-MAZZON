import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000; // Utilise le port défini dans l'environnement, sinon 3000 par défaut
  const dbUrl = "mongodb+srv://mm63mm007:6n0HrE0tUapjcNq4@jsprojectmalzacmazzon.7cyqu.mongodb.net/JSProject";

mongoose.connect(dbUrl)
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, () => 
            console.log(`Server running at http://localhost:${PORT}/`)
        );
    })
    .catch((error) => console.error('Database connection error:', error));