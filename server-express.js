import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import trainRoutes from './routes/trainRoutes.js';
import trainstationRoutes from './routes/trainstationRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import { setupSwagger } from './swagger.js';  // Import the Swagger setup

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;
const dbUrl = "mongodb+srv://mm63mm007:6n0HrE0tUapjcNq4@jsprojectmalzacmazzon.7cyqu.mongodb.net/JSProject";

mongoose.connect(dbUrl)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => console.error('Database connection error:', error));

// Setup Swagger
setupSwagger(app);

// Routes
app.use("/users", userRoutes);
app.use("/trains", trainRoutes);
app.use("/trainstations", trainstationRoutes);
app.use("/reservations", reservationRoutes);

// Error handling for 404
app.use((req, res, next) => {
    res.status(404).send("Not found");
});

const server = app.listen(PORT, () => 
    console.log(`Server running at http://localhost:${PORT}/`)
);

export { app, server };