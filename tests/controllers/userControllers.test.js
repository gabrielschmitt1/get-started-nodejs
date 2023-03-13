const userService = require('../../services/userService')
const userValidator = require('../../validators/userValidator');
const { registerUser } = require('../../controllers/userController');

describe('registerUser', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return 400 if user data is invalid', async () => {
        // Arrange
        req.body = { nome: '', cpf: '', telefone: '', data_nascimento: '' };

        // Act
        await registerUser(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ errors: expect.any(Array) });
    });

    it('should return 409 if CPF already exists', async () => {
        // Arrange
        req.body = { nome: 'John Doe', cpf: '11111111111', telefone: '123456789', data_nascimento: '1990-01-01' };
        userService.checkCpfExists = jest.fn().mockResolvedValue(true);

        // Act
        await registerUser(req, res);

        // Assert
        expect(userService.checkCpfExists).toHaveBeenCalledWith('11111111111');
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ message: 'CPF já cadastrado' });
    });

    it('should call userService.registerUser if user data is valid and CPF does not exist', async () => {
        // Arrange
        req.body = { nome: 'John Doe', cpf: '11111111111', telefone: '123456789', data_nascimento: '1990-01-01' };
        userService.checkCpfExists = jest.fn().mockResolvedValue(false);
        userService.registerUser = jest.fn();

        // Act
        await registerUser(req, res);

        // Assert
        expect(userService.checkCpfExists).toHaveBeenCalledWith('11111111111');
        expect(userService.registerUser).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Usuário cadastrado com sucesso' });
    });

    it('should return 500 if an error occurs', async () => {
        // Arrange
        req.body = { nome: 'John Doe', cpf: '11111111111', telefone: '123456789', data_nascimento: '1990-01-01' };
        userService.checkCpfExists = jest.fn().mockRejectedValue(new Error('Database connection failed'));

        // Act
        await registerUser(req, res);

        // Assert
        expect(userService.checkCpfExists).toHaveBeenCalledWith('11111111111');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database connection failed' });
    });
});
