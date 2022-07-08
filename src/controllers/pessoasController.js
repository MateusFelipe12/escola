const e = require('express');
const pessoasService = require('../services/pessoasService');

const pegarPessoas = async (req, res) => {
    try{
        const pessoas = await pessoasService.pegarPessoas();
        res.status(200).send(pessoas);
    } catch(erro) { 
        res.status(500).send(erro);
    }
}

const pessoasById = async (req, res) => {
    try{
        const pessoas = await pessoasService.pessoasById(req.params);
        res.status(200).send(pessoas);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const persistirPessoas = async (req, res) => {
    try {
        const pessoas = await pessoasService.persistirPessoas(req.body);
        res.status(200).send(pessoas);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const deletePessoas = async (req, res) => {
    try {
        let deletado = await pessoasService.deletePessoas(req.params);
        let msg = deletado 
            ? `Pessoa ${req.params.id} deletada com sucesso` 
            : `Não foi encontrado nenhuma pessoa com o id ${req.params.id} para ser deletada`;
        res.status(200).send({ msg });
    } catch (err) {
    res.status(500).send(err);
    }
}

module.exports.pegarPessoas = pegarPessoas;
module.exports.pessoasById = pessoasById;
module.exports.persistirPessoas = persistirPessoas;
module.exports.deletePessoas = deletePessoas;
