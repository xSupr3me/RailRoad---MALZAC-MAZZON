import request from 'supertest';
import { app, server } from '../server-express.js';
import mongoose from 'mongoose';

let originalLog;

beforeAll(async () => {
    // Mock console.log to suppress logs during tests
    originalLog = console.log;
    console.log = jest.fn();

    await mongoose.connect('mongodb+srv://mm63mm007:6n0HrE0tUapjcNq4@jsprojectmalzacmazzon.7cyqu.mongodb.net/JSProject', { useNewUrlParser: true, useUnifiedTopology: true }); // Connexion à la base de données
});

afterAll(async () => {
    // Restore original console.log
    console.log = originalLog;

    // Fermez la connexion à la base de données et le serveur
    await mongoose.connection.close(); 
    await new Promise(resolve => server.close(resolve)); // Fermez le serveur proprement
});

describe('GET /reservations/all', () => {
    it('should respond with a unauthorized error', async () => {
        const response = await request(app)
            .get('/reservations/all')
            .expect(401);
        });
});



// TOUT LE RESTE EST BLOQUE PAR LE MIDDLEWARE

describe('GET /reservations', () => {
    it ('should respond with a unauthorized error', async () => {
        await request(app)
            .get('/reservations')
            .expect(401);
    });
});