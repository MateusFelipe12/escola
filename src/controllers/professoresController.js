const e = require('express');
const service = require('../services/professoresServices');

const pegarProfessores = async (req, res) => {
    try{
        console.log('aqui');
        const professores = await service.pegarProfessores();
        res.status(200).send(professores);
    } catch(erro) { 
        res.status(500).send(erro);
    }
}

const professoresById = async (req, res) => {
    try{
        const professores = await service.professoresById(req.params);
        res.status(200).send(professores);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const persistirProfessores = async (req, res) => {
    try {
        const professores = await service.persistirProfessores(req.body);
        res.status(200).send(professores);
    } catch (erro) {
        res.status(500).send(erro);
    }
}

const deleteProfessores = async (req, res) => {
    try {
        let deletado = await service.deleteProfessores(req.params);
        let msg = deletado 
            ? `Pessoa ${req.params.id} deletada com sucesso` 
            : `Não foi encontrado nenhuma pessoa com o id ${req.params.id} para ser deletada`;
        res.status(200).send({ msg });
    } catch (err) {
    res.status(500).send(err);
    }
}

module.exports.pegarProfessores = pegarProfessores;
module.exports.professoresById = professoresById;
module.exports.persistirProfessores = persistirProfessores;
module.exports.deleteProfessores = deleteProfessores;
