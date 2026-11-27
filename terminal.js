const prompt = require("prompt-sync")({ sigint: true })
const { listar, salvar, atualizar, remover } = require("./services/aulaService")

async function listarAulas() {
  const aulas = await listar()

  if (aulas.length === 0) {
    console.log("\nNenhuma aula cadastrada.")
    return
  }

  aulas.forEach(aula => {
    console.log(`\n[${aula.id}] ${aula.titulo} - ${aula.materia} (${aula.data})`)
  })
}

async function cadastrarAula() {
  const materia = prompt("Materia: ")
  const titulo = prompt("Titulo: ")
  const descricao = prompt("Descricao (opcional): ")

  try {
    const aula = await salvar({ materia, titulo, descricao })
    console.log(`\nAula salva com o id ${aula.id} em ${aula.data}.`)
  } catch (erro) {
    console.log(`\nErro: ${erro.message}`)
  }
}

async function alterarAula() {
  await listarAulas()

  const id = Number(prompt("\nId da aula que sera alterada: "))

  console.log("Deixe em branco o que nao quiser mudar.")
  const materia = prompt("Nova materia: ")
  const titulo = prompt("Novo titulo: ")
  const descricao = prompt("Nova descricao: ")

  const dados = {}
  if (materia) dados.materia = materia
  if (titulo) dados.titulo = titulo
  if (descricao) dados.descricao = descricao

  try {
    const aula = await atualizar(id, dados)
    console.log(aula ? "\nAula alterada." : "\nAula nao encontrada.")
  } catch (erro) {
    console.log(`\nErro: ${erro.message}`)
  }
}

async function excluirAula() {
  await listarAulas()

  const id = Number(prompt("\nId da aula que sera excluida: "))
  const removida = await remover(id)

  console.log(removida ? "\nAula excluida." : "\nAula nao encontrada.")
}

async function iniciar() {
  const { select } = await import("@inquirer/prompts")

  let rodando = true

  while (rodando) {
    const opcao = await select({
      message: "O que deseja fazer?",
      choices: [
        { name: "Listar aulas", value: "listar" },
        { name: "Cadastrar aula", value: "cadastrar" },
        { name: "Alterar aula", value: "alterar" },
        { name: "Excluir aula", value: "excluir" },
        { name: "Sair", value: "sair" }
      ]
    })

    if (opcao === "listar") {
      await listarAulas()
    } else if (opcao === "cadastrar") {
      await cadastrarAula()
    } else if (opcao === "alterar") {
      await alterarAula()
    } else if (opcao === "excluir") {
      await excluirAula()
    } else {
      rodando = false
    }

    console.log()
  }

  console.log("Ate logo!")
}

iniciar().catch(() => console.log("\nAte logo!"))