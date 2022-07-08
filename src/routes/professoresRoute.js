const controller = require('../controllers/professoresController');

module.exports = (app) => {
    app.get('/professores', controller.pegarProfessores);
    app.get('/professores/:id', controller.professoresById);
    app.post('/professores',  controller.persistirProfessores);
    app.delete('/professores/:id',  controller.deleteProfessores);
}