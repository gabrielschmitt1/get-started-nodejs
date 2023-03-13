const pool = require('../database/pool');

const checkCpfExists = async (cpf) => {
    const cpfExists = await pool.query('SELECT cpf FROM usuarios WHERE cpf = $1', [cpf]);
    return cpfExists.rows.length > 0;
};

const registerUser = async (userData) => {
    const insertQuery = 'INSERT INTO usuarios (nome, cpf, telefone, data_nascimento) VALUES ($1, $2, $3, $4)';
    const values = [userData.nome, userData.cpf, userData.telefone, userData.data_nascimento];
    await pool.query(insertQuery, values);
};

module.exports = {
    checkCpfExists,
    registerUser,
};
