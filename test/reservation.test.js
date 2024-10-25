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
    it('should respond with a JSON containing a list of reservations', async () => {
        const response = await request(app)
            .get('/reservations/all')
            .expect('Content-Type', /json/)
            .expect(200);

        // Access the "reservations" array if response is wrapped in an object
        const reservations = response.body.reservations || [];

        expect(Array.isArray(reservations)).toBe(true); // Check that reservations is an array
        expect(reservations.length).toBeGreaterThan(0); // Ensure there are items in the array

        // Check each reservation for expected properties
        reservations.forEach(reservation => {
            expect(reservation).toHaveProperty('_id');
            expect(reservation).toHaveProperty('train');
            expect(reservation).toHaveProperty('user');
            expect(reservation).toHaveProperty('departureStation');
            expect(reservation).toHaveProperty('arrivalStation');
            expect(reservation).toHaveProperty('departureTime');
            expect(reservation).toHaveProperty('status');
        });
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