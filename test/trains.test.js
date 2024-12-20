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

describe('GET /trains', () => {
    it('should respond with a JSON containing a list of trains', async () => {
        const response = await request(app) // Utilisez la variable app ici
            .get('/trains')
            .expect('Content-Type', /json/) // Vérifie que le type de contenu est JSON
            .expect(200); // Vérifie que le code de statut est 200

        expect(Array.isArray(response.body)).toBe(true); // Vérifiez que la réponse est un tableau
        expect(response.body.length).toBeGreaterThan(0); // Assurez-vous qu'il y a des éléments

        // Vérifiez que chaque objet dans la liste a les propriétés attendues
        response.body.forEach(train => {
            expect(train).toHaveProperty('_id');
            expect(train).toHaveProperty('name');
            expect(train).toHaveProperty('start_station');
            expect(train).toHaveProperty('end_station');
            expect(train).toHaveProperty('time_of_departure');
            expect(train).toHaveProperty('time_of_arrival');
        });
    });
});

describe('GET /trains/:id', () => {
    it('should respond with a JSON containing a train', async () => {
        const response = await request(app)
            .get('/trains/6717a5a2df7ba3169cd0b90c')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('start_station');
        expect(response.body).toHaveProperty('end_station');
        expect(response.body).toHaveProperty('time_of_departure');
        expect(response.body).toHaveProperty('time_of_arrival');
    });

    it('should respond with a 404 if the train is not found', async () => {
        await request(app)
            .get('/trains/7ba3169cd0b90c6717a5a2df')
            .expect(404);
    });
});

describe('POST /trains', () => {
    it('should be unauthorized to add a train', async () => {
        await request(app)
            .post('/trains')
            .send({
                name: 'TGV',
                start_station: 'Paris',
                end_station: 'Marseille',
                time_of_departure: '2021-08-17T09:00:00.000Z',
                time_of_arrival: '2021-08-17T11:00:00.000Z'
            })
            .expect(401);
    });
});