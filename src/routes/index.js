
const pessoas = require('./pessoasRoute');
const professor = require('./professoresRoute');
const alunos = require('./alunoRoute')
const disciplinas = require('./disciplinasRoute');
const notas = require('./notasRoute')

module.exports = (app) => {
    pessoas(app);
    professor(app);
    alunos(app);
    disciplinas(app);
    notas(app);
}