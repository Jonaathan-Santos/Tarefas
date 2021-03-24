/* A VARIAVEL "TAREFAS" E A  PEÇAPRINCIPAL DO APP
ELA SERA SEMPRE A RESPONSAVEL POR CONTER O OBJETO QUE TRÁS TODAS AS TAREFAS CRIADAS PELO USUARIO*/
var  tarefas = loadTarefas()


/* AQUE ESTÃO TODOS OS ELEMNETOS SELECIONADOS DO HTML*/
var inputTitulo = document.getElementById("titulo")
var descricao = document.getElementById("descricao")
var adicionar = document.getElementById("adicionar")
var abaTarefas = document.getElementById("tarefas")
var content = document.getElementById("content")
var botoaoConcluir = document.getElementsByClassName("concluir")

 /* ADICIONANDO O EVENTO DE CLICK NO BOTÃO ADICIONAR*/

adicionar.addEventListener("click", setTarefas)


/* ABAIXO ESTÃO TODAS AS FUNÇÕES*/

function replaceCompleto (nString, arg1, arg2){
    /* ESSA FUNÇÃO FAZ UM REPLACE EM STRIGS GRANDE COM MAIS DE UM CARACTERES A SER EDITADO*/
   let novaString = ""
    for (const key in nString) {
        novaString += nString[key].replace(arg1,arg2)
    }
    return novaString
}


function loadTarefas(){
    /* A FUNÇÃO loadTarefas BUSCA ASTAREFAS SALVAS NO LOCALSTORAGE E ATRAVES DO JASON 
    TRANFORMA-AS EM UM OBJETO E RETORNA-O*/
    

    let load = localStorage.getItem("tarefas")
    let listaTarefas = JSON.parse(load)


    return listaTarefas
}

function saveTarefas(listaDeTarefas){
    /* A FUNÇÃO saveTarefas RECEBE UM OBJETO COM TODAS AS TAREFAS, TRANFORMAEM STRING
    UTILIANDO JASON E SALVA NO LOCALSTORAGE*/

   let stringTarefas = JSON.stringify(listaDeTarefas)
   localStorage.setItem("tarefas" , stringTarefas)
}

function setTarefas(){
    /* ESSA FUNÇÃO É RESPONSAVEL POR CAPTAR OS VALORES DO IMPUTS
     E ADICIONAR AO OBJETO "TAREFAS" UM ATRIBUTO QUE RECEBE UM NOVO OBJETO
     COM TITULO EDESCRIÇÃO, CADA ATRIBUTO EQUIVALE A UMA NOVA TAREFA QUE SERA RENDERIZADA
     NO NAVEGADOR DO USUARIO */

    
    tituloDaTarefa = replaceCompleto(inputTitulo.value, " ", "-")
    descricaoDaTarefa = replaceCompleto(descricao.value, " ", "-")
    
    if(tituloDaTarefa === ""){
        window.alert("O título não pode ser vasio!")
        return
    }
    console.log(tituloDaTarefa)

    tarefas[tituloDaTarefa] = {
        titulo : tituloDaTarefa,
        descricao : descricaoDaTarefa
    }

    saveTarefas(tarefas)
    renderTarefas(tarefas)
    inputTitulo.value = ''
    descricao.value = ''
}

function renderTarefas(renderizar){

    /* eSTÁ FUNÇÃO RECEBE O OBJETO "TAREFAS" E PERCORRE TODOS O SEUS ATRIBUTOS CAPTANDO O TITULO EA DESCRIÇÃO
    DE CADA UM DELES E ADICIONANDO AO TEMPLATE HTML DAS TAREFAS */

    content.innerHTML = ""
    
    for(key in renderizar){
        let lTitulo = replaceCompleto(renderizar[key].titulo, "-", " ")
        let lDesc = replaceCompleto(renderizar[key].descricao, "-", " ")
        let IdDiv = renderizar[key].titulo
        content.innerHTML += `<div class="tarefas"><div class="barra">.</div><div class="contentTarefa"><h3 class="titulotarefa">${lTitulo}</h3><div class="descTarefa">${lDesc}</div></div><div class="concluir" id=${IdDiv} onclick="concluir(this)">Concluir</div></div>`
            
    }
      
}

function concluir (item){
    /* ESTÁ FUNÇÃO É O EVENTO POSTO NO BOTÃO "CONCLUIR" DE CADA TAREFA
    ELA RECEBE COMO ARGUMENTO O PROPRIO BOTÃO QUE POR SUA VEZ POSSUI O ID EQUIVALENTE
    AO TITULO DE SUA TAREFA, APOS CAPTAR O ID ELA DELETA DO OBGETO "TAREFAS" O ATRIBUTO REFETENTE AO ID*/

    let titulo = item.id

    delete tarefas[titulo]

    saveTarefas(tarefas)
    renderTarefas(tarefas)

}

/* AQUI O SITE VERIFICA SE EXISTE TAREFAS NO LOCALSTORAGE DO USUARIO, CASO NÃO EXISTA  ELE 
IRÁ ORINETAR O USUARIO E EM SEGUIDA IRÁ SALVAR NO LOCALSTORAGE UM OBJETO VAZIO, LOGO APOS,
A VARIAVEL TAREFA SERA REATRIBUIDA NOVAMENTE COM O OBJETO VINDO DO LOCALSTORAGE  */
if (localStorage.getItem("tarefas") === null) {

    window.alert("Ôlá, você ainda não tem tarefas, crie ja as suas!")
    saveTarefas({})
    tarefas = loadTarefas()
}

/* CASO JA EXISTAM TAREFAS NO LOCALSTORAGE A VARIAVEL "TAREFA" RECEBERÁ O OBJETO CONTENDO TODAS AS TAREFAS
 E  EM SEGUIDA IRÁ RENDERIZA-LAS
  */

else {
    
    tarefas = loadTarefas()
    renderTarefas(tarefas)
}

