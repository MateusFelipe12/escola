const e = require('express');
const service = require('../services/disciplinasService');

const pegarDisciplinas = async (req, res) => {
    try{
        const disciplinas = await service.pegarDisciplinas();
        res.status(200).send(disciplinas);
    } catch(erro) { 
        res.status(500).send(erro);
    }
}

const disciplinasById = async (req, res) => {
    try{
        const disciplinas = await service.disciplinasById(req.params);
        res.status(200).send(disciplinas);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const persistirDisciplinas = async (req, res) => {
    try {
        const disciplinas = await service.persistirDisciplinas(req.body);
        res.status(200).send(disciplinas);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const deleteDisciplinas = async (req, res) => {
    try {
        let deletado = await service.deleteDisciplinas(req.params);
        let msg = deletado 
            ? `Disciplina ${req.params.id} deletada com sucesso` 
            : `Não foi encontrado nenhuma disciplina com o id ${req.params.id} para ser deletada`;
        res.status(200).send({ msg });
    } catch (err) {
    res.status(500).send(err);
    }
}

module.exports.pegarDisciplinas = pegarDisciplinas;
module.exports.disciplinasById = disciplinasById;
module.exports.persistirDisciplinas = persistirDisciplinas;
module.exports.deleteDisciplinas = deleteDisciplinas;
