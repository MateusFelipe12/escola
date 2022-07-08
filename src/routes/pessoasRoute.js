const controller = require('../controllers/pessoasController');

module.exports = (app) => {
    app.get('/pessoas', controller.pegarPessoas);
    app.get('/pessoas/:id', controller.pessoasById);
    app.post('/pessoas',  controller.persistirPessoas);
    app.delete('/pessoas/:id',  controller.deletePessoas);
}