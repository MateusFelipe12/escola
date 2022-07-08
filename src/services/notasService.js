const db = require('../config/db');

//consultar o cliente
const pegarNotas = async () => {
    let sql = 'select * from notas';
    let nota = await db.query(sql);
    console.log(nota.rows);
    return nota.rows;
}

const notasById = async (params) => {
    let sql = `select * from notas where id = $1`;
    let nota = await db.query(sql, [params.id]);
    return nota.rows;
}

const persistirNotas = async (params) => {
    const { nota, peso, id_disciplina, id_aluno, observacao } = params;
    if (!params.id) {
      let sql = `insert into notas (nota, peso, id_disciplina, id_aluno, observacao)
        values ($1, $2, $3, $4, $5) returning id;`
      const query = await db.query(sql, [nota, peso, id_disciplina, id_aluno, observacao]);
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
    const sql = `update notas set ${fields} where id = ${params.id}`;
  
    const response = await db.query(sql);
    const msg = response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${params.id}`
      : `Registro ${params.id} alterado com sucesso!`;

    return { type: 'info', msg }
}

const deleteNotas = async (params) => {
    let sql = 'delete from notas where id = $1;';
    let query = await db.query(sql, [params.id]);
    return query.rowCount == 1;
}

const medias = async (params) => {
    let sqlNotas = `select * from notas where id_aluno = $`
    let query = await db.query(sqlNotas, [params.id])
    return query;
}

module.exports.pegarNotas = pegarNotas;
module.exports.notasById = notasById;
module.exports.persistirNotas = persistirNotas;
module.exports.deleteNotas = deleteNotas;
module.exports.medias = medias;