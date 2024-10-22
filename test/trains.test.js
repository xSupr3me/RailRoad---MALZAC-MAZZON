// app.test.js
import request from 'supertest';
import app from '../server-express.js';

let server; // Déclarez une variable pour le serveur

// Démarre le serveur avant tous les tests
beforeAll(async () => {
    server = app.listen(3002); // Démarrez le serveur sur un port spécifique
});

// Arrête le serveur après tous les tests
afterAll(async () => {
    await server.close(); // Fermez le serveur après les tests
});

describe('GET /trains', () => {
    it('should respond with a JSON containing a list of trains', async () => {
        const response = await request(server) // Utilisez le serveur ici
            .get('/trains')
            .expect('Content-Type', /json/) // Vérifie que le type de contenu est JSON
            .expect(200); // Vérifie que le code de statut est 200

        // Vérifie que la réponse contient une liste d'objets
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); // Assurez-vous qu'il y a des éléments

        // Vérifie que les objets de la liste ont les bonnes propriétés
        response.body.forEach(train => {
            expect(train).toHaveProperty('_id');
            expect(train).toHaveProperty('name');
        });
    });
});
