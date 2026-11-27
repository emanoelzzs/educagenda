const fs = require("fs/promises")
const { Aula } = require("../models/Aula")

const ARQUIVO = process.env.ARQUIVO_AULAS || "./data/aulas.json"

async function listar() {
  try {
    const conteudo = await fs.readFile(ARQUIVO, "utf-8")
    return JSON.parse(conteudo)
  } catch (erro) {
    return []
  }
}

async function gravar(aulas) {
  await fs.writeFile(ARQUIVO, JSON.stringify(aulas, null, 2))
}

async function salvar({ materia, titulo, descricao }) {
  const aulas = await listar()
  const id = aulas.length + 1
  const data = new Date().toLocaleDateString("pt-BR")

  const aula = new Aula(id, materia, titulo, data, descricao)
  aulas.push(aula)
  await gravar(aulas)
  return aula
}

async function atualizar(id, dados) {
  const aulas = await listar()
  const indice = aulas.findIndex(a => a.id === id)

  if (indice === -1) {
    return null
  }

  const novos = { ...aulas[indice], ...dados }

  aulas[indice] = new Aula(id, novos.materia, novos.titulo, novos.data, novos.descricao)
  await gravar(aulas)
  return aulas[indice]
}

async function remover(id) {
  const aulas = await listar()
  const restantes = aulas.filter(a => a.id !== id)

  if (restantes.length === aulas.length) {
    return false
  }

  await gravar(restantes)
  return true
}

module.exports = { listar, salvar, atualizar, remover }