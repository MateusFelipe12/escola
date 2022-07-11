const e = require('express');
const service = require('../services/notasService');

const pegarNotas = async (req, res) => {
    try{
        const notas = await service.pegarNotas();
        res.status(200).send(notas);
    } catch(erro) { 
        res.status(500).send(erro);
    }
}

const notasById = async (req, res) => {
    try{
        const notas = await service.notasById(req.params);
        res.status(200).send(notas);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const persistirNotas = async (req, res) => {
    try {
        const notas = await service.persistirNotas(req.body);
        res.status(200).send(notas);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const deleteNotas = async (req, res) => {
    try {
        let deletado = await service.deleteNotas(req.params);
        let msg = deletado 
            ? `Nota ${req.params.id} deletada com sucesso` 
            : `Não foi encontrado nenhuma nota com o id ${req.params.id} para ser deletada`;
        res.status(200).send({ msg });
    } catch (err) {
    res.status(500).send(err);
    }
}

const medias = async (req, res) => {
    try {
        const notas = await service.medias(req.body);
        res.status(200).send(notas);
    } catch (erro) {
        res.status(500).send(erro);
    }
}


module.exports.pegarNotas = pegarNotas;
module.exports.notasById = notasById;
module.exports.persistirNotas = persistirNotas;
module.exports.deleteNotas = deleteNotas;
module.exports.medias = medias;
