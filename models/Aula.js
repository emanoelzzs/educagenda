class Aula {
  constructor(id, materia, titulo, data, descricao = "") {
    const materiaLimpa = String(materia || "").trim()
    const tituloLimpo = String(titulo || "").trim()

    if (!materiaLimpa || !tituloLimpo) {
      const erro = new Error("Os campos materia e titulo sao obrigatorios")
      erro.status = 400
      throw erro
    }

    this.id = id
    this.materia = materiaLimpa
    this.titulo = tituloLimpo
    this.data = data
    this.descricao = String(descricao || "").trim()
  }
}

module.exports = { Aula }