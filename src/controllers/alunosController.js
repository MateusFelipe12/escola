const e = require('express');
const service = require('../services/alunosServices');

const pegarAlunos = async (req, res) => {
    try{
        const alunos = await service.pegarAlunos();
        res.status(200).send(alunos);
    } catch(erro) { 
        res.status(500).send(erro);
    }
}

const alunosById = async (req, res) => {
    try{
        const alunos = await service.alunosById(req.params);
        res.status(200).send(alunos);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const persistirAlunos = async (req, res) => {
    try {
        const alunos = await service.persistirAlunos(req.body);
        res.status(200).send(alunos);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const deleteAlunos = async (req, res) => {
    try {
        let deletado = await service.deleteAlunos(req.params);
        let msg = deletado 
            ? `aluno ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum aluno com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ msg });
    } catch (err) {
    res.status(500).send(err);
    }
}

module.exports.pegarAlunos = pegarAlunos;
module.exports.alunosById = alunosById;
module.exports.persistirAlunos = persistirAlunos;
module.exports.deleteAlunos = deleteAlunos;
