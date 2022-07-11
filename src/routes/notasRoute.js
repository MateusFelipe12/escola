const controller = require('../controllers/notasController');

module.exports = (app) => {
    app.get('/notas', controller.pegarNotas);
    app.get('/notas/:id', controller.notasById);
    app.post('/medias', controller.medias)
    app.post('/notas',  controller.persistirNotas);
    app.delete('/notas/:id',  controller.deleteNotas);
}