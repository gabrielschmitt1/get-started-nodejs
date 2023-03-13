// validators/UserValidator.js

exports.validateUserData = (userData) => {
    const errors = [];

    if (!userData.nome) {
        errors.push('Nome é obrigatório.');
    }

    if (!userData.cpf) {
        errors.push('CPF é obrigatório.');
    }

    if (!userData.telefone) {
        errors.push('Telefone é obrigatório.');
    }

    if (!userData.data_nascimento) {
        errors.push('Data de nascimento é obrigatória.');
    }

    return errors;
};
