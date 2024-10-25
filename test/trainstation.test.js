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

describe('GET /trainstations', () => {
    it('should respond with a JSON containing a list of trainstations', async () => {
        const response = await request(app) // Utilisez la variable app ici
            .get('/trainstations')
            .expect('Content-Type', /json/) // Vérifie que le type de contenu est JSON
            .expect(200); // Vérifie que le code de statut est 200

        expect(Array.isArray(response.body)).toBe(true); // Vérifiez que la réponse est un tableau
        expect(response.body.length).toBeGreaterThan(0); // Assurez-vous qu'il y a des éléments

        // Vérifiez que chaque objet dans la liste a les propriétés attendues
        response.body.forEach(trainstation => {
            expect(trainstation).toHaveProperty('_id');
            expect(trainstation).toHaveProperty('name');
            expect(trainstation).toHaveProperty('open_hour');
            expect(trainstation).toHaveProperty('close_hour');
            expect(trainstation).toHaveProperty('image');
        });
    });
});

describe('GET /trainstations/:id', () => {
    it('should respond with a JSON containing a trainstation', async () => {
        const response = await request(app)
            .get('/trainstations/6717a524df7ba3169cd0b8fc')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('open_hour');
        expect(response.body).toHaveProperty('close_hour');
        expect(response.body).toHaveProperty('image');
        });

        it('should respond with a 404 if the trainstation is not found', async () => {
            await request(app)
                .get('/trainstation/7ba3169cd0b90c6717a5a2df')
                .expect(404);
        });
});

describe('POST /trainstations', () => {
    it('should respond with a unauthorized error', async () => {
        const response = await request(app)
            .post('/trainstations')
            .send({
                name: "Test",
                open_hour: 8,
                close_hour: 20,
                image: "test.jpg"
            })
            .expect('Content-Type', /json/)
            .expect(401);

    });
});