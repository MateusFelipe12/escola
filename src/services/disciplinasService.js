const db = require('../config/db');

//consultar o cliente
const pegarDisciplinas = async () => {
    let sql = 'select * from disciplinas';
    let disciplina = await db.query(sql);
    return disciplina.rows;
}

const disciplinasById = async (params) => {
    let sql = `select * from disciplinas where id = $1`;
    let disciplina = await db.query(sql, [params.id]);
    return disciplina.rows;
}

const persistirDisciplinas = async (params) => {
    const { descricao, id_professor} = params;
    if (!params.id) {
      let sql = `insert into disciplinas (descricao, id_professor)
        values ($1, $2) returning id;`
      const query = await db.query(sql, [descricao, id_professor]);
      return { type: 'info', msg: 'Registro incluído com sucesso!', data: { id: query.rows[0].id } };
    }
 
    let fields = [];

    Object.keys(params).forEach(e => {
      if (e !== 'id') {
        if (params[e] === '' || params[e] == null) {
          fields.push(`${e} = null`)
        } else {
          fields.push(`${e} = '${params[e]}'`)
        }
      }
    });

    fields = fields.join(', ');
    const sql = `update disciplinas set ${fields} where id = ${params.id}`;
  
    const response = await db.query(sql);
    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`;

    return { type: 'info', msg }
}

const deleteDisciplinas = async (params) => {
    let sql = 'delete from disciplinas where id = $1;';
    let query = await db.query(sql, [params.id]);
    return query.rowCount == 1;
} 

module.exports.pegarDisciplinas = pegarDisciplinas;
module.exports.disciplinasById = disciplinasById;
module.exports.persistirDisciplinas = persistirDisciplinas;
module.exports.deleteDisciplinas = deleteDisciplinas;