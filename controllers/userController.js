const userService = require('../services/userService');
const userValidator = require('../validators/userValidator');

const registerUser = async (req, res) => {
    try {
        // Valida os dados do usuário
        const errors = userValidator.validateUserData(req.body);
        if (errors.length > 0) {
            res.status(400).json({ errors: errors });
            return;
        }

        // Verifica se o CPF já está cadastrado
        const cpfExists = await userService.checkCpfExists(req.body.cpf);
        if (cpfExists) {
            res.status(409).json({ message: 'CPF já cadastrado' });
            return;
        }

        // Insere um novo usuário no banco de dados
        await userService.registerUser(req.body);

        // Retorna uma resposta de sucesso
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        // Retorna uma resposta de erro
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
};
