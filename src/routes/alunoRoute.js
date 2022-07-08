const controller = require('../controllers/alunosController');

module.exports = (app) => {
    app.get('/alunos', controller.pegarAlunos);
    app.get('/alunos/:id', controller.alunosById);
    app.post('/alunos',  controller.persistirAlunos);
    app.delete('/alunos/:id',  controller.deleteAlunos);
}