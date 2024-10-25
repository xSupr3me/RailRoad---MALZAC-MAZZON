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

describe('POST /users/login', () => {
    it('should respond with a JSON containing a token', async () => {
        const response = await request(app) // Utilisez la variable app ici
            .post('/users/login')
            .send({ email: "admintest@example.com", password: "Useruser123" })
            .expect('Content-Type', /json/) // Vérifie que le type de contenu est JSON
            .expect(200); // Vérifie que le code de statut est 200
        
        expect(response.body).toHaveProperty('token');
    }
    );
    it('should respond with a 401 if the password is incorrect', async () => {
        await request(app)
            .post('/users/login')
            .send({ email: "admintest@example.com", password: "wrongpassword" })
            .expect(401);
    }
    );
    it('should respond with a 401 if the email is incorrect', async () => {
        await request(app)
            .post('/users/login')
            .send({ email: "wrongemail@exemple.com", password: "Useruser123" })
            .expect(401);
    }
    );
    it('should respond with a 400 if the email is missing', async () => {
        await request(app)
            .post('/users/login')
            .send({ password: "Useruser123" })
            .expect(400);
    }
    );

    it('should respond with a 400 if the password is missing', async () => {
        await request(app)
            .post('/users/login')
            .send({ email: "admintest@example.com" })
            .expect(400);
    }
    );

    it('should respond with a 400 if the email is empty', async () => {
        await request(app)
            .post('/users/login')
            .send({ email: "", password: "Useruser123" })
            .expect(400);
    }
    );

    it('should respond with a 400 if the password is empty', async () => {
        await request(app)
            .post('/users/login')
            .send({ email: "admintest@example.com", password: "" })
            .expect(400);
    }
    );
});

describe('POST /users/register', () => {
    it('should respond with a JSON containing a token', async () => {
        const response = await request(app)
            .post('/users/register')
            .send({ username: "usertest123456", email: "test123456@mail.com", password: "Useruser123" })
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toHaveProperty('token');
    });

    it('should respond with a 400 if the email is missing', async () => {
        await request(app)
            .post('/users/register')
            .send({ username: "usertest1234", password: "Useruser123" })
            .expect(400);
    });

    it('should respond with a 400 if the password is missing', async () => {
        await request(app)
            .post('/users/register')
            .send({ username: "usertest1234", email: "test1234@mail.com" })
            .expect(400);
    });

    it('should respond with a 400 if the email is empty', async () => {
        await request(app)
            .post('/users/register')
            .send({ username: "usertest1234", email: "", password: "Useruser123" })
            .expect(400);
    });

    it('should respond with a 400 if the password is empty', async () => {
        await request(app)
            .post('/users/register')
            .send({ username: "usertest1234", email: "test1234@mail.com", password: "" })
            .expect(400);
    }
    );
});

    