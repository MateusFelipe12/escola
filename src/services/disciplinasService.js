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

const mediasPorDisciplina = async (params) => {
  const {id_disciplina, data_inicial, data_final} = params;

  let sqlMediaAlunos = `
  select 
    n.nota,
    n.peso,
    p.nome,
    a.id
  from disciplinas as d
  inner join notas as n on (d.id = n.id_disciplina)
  inner join alunos as a on (n.id_aluno = a.id)
  inner join pessoas as p on (p.id = a.id_pessoa)
  where datahora between $1 and $2 and d.id = $3`

  let query = await db.query(sqlMediaAlunos, [data_inicial, data_final, id_disciplina]);
  console.log('aqui');
  let notas = 0;
  let pesos = 0;
  let retorno = [];
  let aluno = query.rows;
  let id = Number(aluno[0].id)
  let media = 0 ;
  for(let i = 0; i < aluno.length; i++){
    notas += parseFloat(aluno[i].nota * aluno[i].peso);
    pesos += parseFloat(aluno[i].peso);
    if(!aluno[i+1] || aluno[i].id !== aluno[i + 1].id){
      console.log("ok");
      id = aluno[i].id;
      media  = notas / pesos;
      retorno.push({msg:`A media do aluno ${aluno[i].nome} é ${media}`, Situacao: `${media >= 7 ? 'Aluno aprovado': media < 5 ? 'Aluno reprovado' : 'Aluno em exame'}`});
      notas = pesos = 0;
    };
  }
  return retorno;
}



module.exports.pegarDisciplinas = pegarDisciplinas;
module.exports.disciplinasById = disciplinasById;
module.exports.persistirDisciplinas = persistirDisciplinas;
module.exports.deleteDisciplinas = deleteDisciplinas;
module.exports.mediasPorDisciplina = mediasPorDisciplina;