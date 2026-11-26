const fs = require('fs/promises')
const { Aula } = require('../models/Aula')

async function listarAulas() {
  try {
    const data = await fs.readFile('./data/aulas.json', 'utf-8')
    const aulas = JSON.parse(data)

    return aulas
  } catch (error) {

    console.error('Erro ao ler o arquivo de aulas:', error)
    return []

  }
}

async function salvarAulas(aulas) {
  try {

    const data = JSON.stringify(aulas, null, 2)
    await fs.writeFile('./data/aulas.json', data, 'utf-8')

  } catch (error) {

    console.error('Erro ao salvar o arquivo de aulas:', error)

  } 
}

async function adicionarAula(materia, titulo, data, descricao) {
  const aulas = await listarAulas()
  const id = aulas.length + 1
  const aula = new Aula(id, materia, titulo, data, descricao)
  aulas.push(aula)
  await salvarAulas(aulas)
}
module.exports = { listarAulas, salvarAulas }