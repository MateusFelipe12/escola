const db = require('../config/db');

//consultar o cliente
const pegarAlunos = async () => {
    let sql = 'select * from alunos';
    let aluno = await db.query(sql);
    console.log(aluno.rows);
    return aluno.rows;
}

const alunosById = async (params) => {
    let sql = `select * from alunos where id = $1`;
    let aluno = await db.query(sql, [params.id]);
    return aluno.rows;
}

const persistirAlunos = async (params) => {
    const { matricula, id_pessoa} = params;
    if (!params.id) {
      let sql = `insert into alunos (matricula, id_pessoa)
        values ($1, $2) returning id;`
      const query = await db.query(sql, [matricula, id_pessoa]);
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
    const sql = `update alunos set ${fields} where id = ${params.id}`;
  
    const response = await db.query(sql);
    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`;

    return { type: 'info', msg }
}

const deleteAlunos = async (params) => {
    let sql = 'delete from alunos where id = $1;';
    let query = await db.query(sql, [params.id]);
    return query.rowCount == 1;
} 

module.exports.pegarAlunos = pegarAlunos;
module.exports.alunosById = alunosById;
module.exports.persistirAlunos = persistirAlunos;
module.exports.deleteAlunos = deleteAlunos;