class criarElemento {
    criarElementoHtml(tagHtml, atributo, valorDoAtributo, texto, elementoPai, result) {
        let bntHtml = document.createElement(tagHtml)
        let indice = 0
        atributo.forEach(eleAtri => {
            bntHtml.setAttribute(eleAtri, valorDoAtributo[indice])
            indice++
        })
        if (result) {
            bntHtml.innerHTML = texto
        }
        elementoPai.appendChild(bntHtml)
    }

    forEachFuncao(nomeDoArray, tagHtml, atributo, valorDoAtributo, elementoPai, result) {
        nomeDoArray.forEach(texto => {
            let classTemporaria = new criarElemento()
            classTemporaria.criarElementoHtml(tagHtml, atributo, valorDoAtributo, texto, elementoPai, result)
        })
    }
}

// =========================================================================================================================================================
// CRIAÇÃO DOS BOTÕES DE ELEMENTOS HTML
// =========================================================================================================================================================
let containerBotao = document.querySelector('.container-botao')
let elementosHtml = ["header", "main", "section", "footer", "aside", "article", "div", "nav", "h1", "h2", "h3", "p", "ul", "ol", "li", "a", "span", "button"]
let newArrayHtml = []

// adicionar </>
elementosHtml.forEach(ele => {
    let e = `&lt;/${ele}&gt`
    newArrayHtml.push(e)
})

let bnt = new criarElemento()
bnt.forEachFuncao(newArrayHtml, 'button', ['class',], ['px-3 py-1 bg-gray-900 text-white rounded-md max-w-[200px] cursor-pointer botoes duration-400 hover:bg-blue-700'], containerBotao, true)


// =========================================================================================================================================================
// CRIAÇÃO DOS ELEMENTOS DO FORMULARIO
// =========================================================================================================================================================
let formulario = document.querySelector('.form')
let textosDoFormulario = [
    ["Style com TailWind", true, "add"],
    ["Trocar Texto", true, "add"],
    ["Mostrar Atributos", false, "look"],
    ["Resetar Texto", false, "remove"],
    ["Resetar CSS", false, "remove"],
    ["Remover Elemeto", false, "remove"],
]

// criar divs
let criarDiv = new criarElemento()
criarDiv.forEachFuncao(textosDoFormulario, 'div', ['class'], ['divForm py-2 flex justify-center gap-4'], formulario, false)

// criar INPUT e BUTTON do Formulario
let divForm = document.querySelectorAll('.divForm')

let indice = 0
divForm.forEach(() => {
    // criar input
    if (textosDoFormulario[indice][1] == true) {
        let criarInput = new criarElemento()
        criarInput.criarElementoHtml('input', ['class', 'type', 'placeholder'], ['px-3 py-1 bg-gray-300 border-3 border-black rounded-md', 'text', `${textosDoFormulario[indice][0]}...`], '', divForm[indice], false)
    }
    // criar botões
    let criarBotoes = new criarElemento()
    criarBotoes.criarElementoHtml('button', ['class'], ['w-full block px-3 py-1 bg-gray-900 text-white rounded-md cursor-pointer duration-400 hover:bg-blue-700 btnFuncoes ' + textosDoFormulario[indice][2]], textosDoFormulario[indice][0], divForm[indice], true)
    indice++
})


// =========================================================================================================================================================
// Criação e Seleção dos Elementos
// =========================================================================================================================================================
let botoes = document.querySelectorAll('.botoes')
let painel = document.querySelector('.painel')

// Procurar os Elementos
function procurarElemento() {
    let elementosCriados = document.querySelectorAll('.elementos-criados')

    elementosCriados.forEach((ele) => {

        // Impedir a Propagação Para os Elementos Filhos
        ele.addEventListener('click', (e) => {
            e.stopPropagation()
        })

        // Selecionar o Elemento Clicado
        if (ele.classList.contains('selecionado')) {
            ele.addEventListener('click', () => {
                elementosCriados.forEach((ele2) => {
                    ele2.classList.remove('selecionado')
                })
            })
        } else {
            ele.addEventListener('click', () => {
                elementosCriados.forEach((ele2) => {
                    ele2.classList.remove('selecionado')
                })
                ele.classList.add('selecionado')
            })
        }
    })
}

botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
        // Limpar o texto dos caracters
        let text = botao.innerHTML
        let arrayString = text.split('')
        for (let i = 0; i <= 3; i++) {
            arrayString.pop()
        }
        for (let i2 = 0; i2 <= 4; i2++) {
            arrayString.shift()
        }
        let myText = arrayString.toString()
        myText = myText.replace(/,/gi, '')

        let elementoSelecionado = document.querySelector('.selecionado')
        if (elementoSelecionado != null) {
            elementoPai2 = elementoSelecionado
        } else {
            elementoPai2 = painel
        }

        let btnObjeto = new criarElemento()
        btnObjeto.criarElementoHtml(myText, ['class'], ['px-3 py-1 m-1 rounded-md cursor-pointer list-none border-1  block elementos-criados'], myText, elementoPai2, true)
        //tagHtml, atributo, valorDoAtributo, texto, elementoPai, result

    })
})

setInterval(procurarElemento, 500)


// =========================================================================================================================================================
// Criar Funções Dos Botões
// =========================================================================================================================================================


function adicionarNoElementoSelecionado(btnTexto, btnClicado, elementoSelecionado) {
    // Pegar o Valor do Input do Botão
    let inputDoBotao = btnClicado.parentNode.firstChild
    let inputValor = inputDoBotao.value

    switch (btnTexto) {
        case "stylecomtailwind":
            if (inputValor.trim()) {
                elementoSelecionado.classList.add(inputValor)
                inputDoBotao.value = ''
            } else {
                alert('Coloque uma Classe de TailWind!')
            }
            break

        case 'trocartexto':
            let texto = elementoSelecionado.firstChild
            texto.data = inputValor
            inputDoBotao.value = ''
            break

        default:
            break
    }
}


function removerDoElementoSelecionado(btnTexto, elementoSelecionado) {
    switch (btnTexto) {
        case "resetartexto":
            let textoDoElemento = elementoSelecionado.tagName.toLocaleLowerCase()
            let texto = elementoSelecionado.firstChild
            texto.data = textoDoElemento
            break

        case 'resetarcss':
            elementoSelecionado.removeAttribute('class')
            elementoSelecionado.setAttribute('class', 'px-3 py-1 m-1 rounded-md cursor-pointer list-none border-1  block elementos-criados selecionado')
            break

        case 'removerelemeto':
            let paiDoElementoSelecionado = elementoSelecionado.parentNode
            paiDoElementoSelecionado.removeChild(elementoSelecionado)
            break

        default:
            break
    }
}

function mostrarAtributosDoElemento(elementoSelecionado) {

    let painelDeReferencia = document.querySelector('.painel-de-referencia')
    // pegar o Nome do Elemento
    let elementoHTML = elementoSelecionado.tagName.toLocaleLowerCase()
    // pegar a Classe do Elemento
    let classeDoElemento = elementoSelecionado.getAttribute('class')
    // pegar os Filhos do Elemento
    let filhosDoElemento = elementoSelecionado.children
    let arrayDosFilhos = []
    for (let filho of filhosDoElemento) {
        let elementoFilho = filho.tagName.toLocaleLowerCase()
        arrayDosFilhos.push(elementoFilho)
    }

    // Pegar o ID
    let elemento = document.getElementById('elemento')
    elemento.innerHTML = `&lt;/${elementoHTML}&gt`

    let texto = document.getElementById('texto')
    texto.innerHTML = elementoSelecionado.firstChild.wholeText

    let classes = document.getElementById('classes')
    classes.innerHTML = classeDoElemento

    let filho = document.getElementById('filho')
    filho.innerHTML = arrayDosFilhos
}



let botoesFuncoes = document.querySelectorAll('.btnFuncoes')

botoesFuncoes.forEach((btn) => {
    let btnTexto = btn.innerHTML
    btnTexto = btnTexto.replace(/\s/g, '').toLocaleLowerCase()
    btn.addEventListener('click', () => {

        // Validar Se Algum Elemento Foi Selecionado
        let elementoSelecionado = document.querySelector('.selecionado')
        if (elementoSelecionado != null) {

            // Validação do campo
            let confirmacao = prompt('Digite "SIM" se deseja continuar...').trim()
            confirmacao = confirmacao.toLocaleLowerCase()

            if (confirmacao == 'sim') {
                let classesAtributos = ['add', 'remove', 'look']
                let classeEncontrada
                // Achar a Classe do Botão
                classesAtributos.forEach((elementoClass) => {
                    if (btn.classList.contains(elementoClass)) {
                        classeEncontrada = elementoClass
                        return
                    }
                })

                // Chamar a Função Certa para o Botão
                switch (classeEncontrada) {
                    case 'add':
                        adicionarNoElementoSelecionado(btnTexto, btn, elementoSelecionado)
                        break

                    case 'remove':
                        removerDoElementoSelecionado(btnTexto, elementoSelecionado)
                        break

                    case 'look':
                        mostrarAtributosDoElemento(elementoSelecionado)
                        break

                    default:
                        alert('erro')
                        break
                }

            } else {
                alert('Valor Invalido!')
            }
        } else {
            alert('Selecione Algum Elemento!')
        }

    })
})
