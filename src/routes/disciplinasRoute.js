const controller = require('../controllers/disciplinasController');

module.exports = (app) => {
    app.get('/disciplinas', controller.pegarDisciplinas);
    app.get('/disciplinas/:id', controller.disciplinasById);
    app.post('/disciplinas',  controller.persistirDisciplinas);
    app.delete('/disciplinas/:id',  controller.deleteDisciplinas);
}