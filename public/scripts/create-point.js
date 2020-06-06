function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then( res => res.json() )
    .then( states => {

        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }


        
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    // console.log(indexOfSelectedState)
    citySelect.innerHTML = "<option value>Selecione a cidade</option>" //Assim aparece Selecione a cidade
    citySelect.disabled = true

    
    //populando as cidades
    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
        
        citySelect.disabled = false
        
    } )
}

function setCity (event){
    const citySelect = document.querySelector("select[name=city]")
    const cityInput = document.querySelector("input[name=currentCity]")
    
    const cityValue = citySelect.value
        
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cityValue}`

    const indexOfSelectedState = event.target.selectedIndex
    cityInput.value = event.target.options[indexOfSelectedState].text

}

// setCity()

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

document
    .querySelector("select[name=city]")
    .addEventListener("change", setCity)


// itens de coleta
// pegar todos os li de uma vez
// ouvidor de evento

//objeto documento, selecionar todos os lis encontrados - tudo em uma variavel
const itemsToCollect = document.querySelectorAll(".items-grid li")

//for - estrutura de repetição
//para cada (const) item (li) de itemsToCollect (que acima é selecionado todos os li do items-grid)
for (const item of itemsToCollect) {//evento adicionado / evento: click / + função handle (por referencia)
    item.addEventListener("click", handleSelectedItem)
}

// olhar final do código, passo 3)
const collectedItems = document.querySelector("input[name=items")

// criando uma variável para os inputs | ler comentário IMPORTANTE de handleSelected
// será um array, uma coleção de dados
let selectedItems = [] // os elementos selecionados aqui ficam com o IndexID 0 a 5

//criando a função // ouvindo o evento
//toda a vez que o evento é disparado (acima, no 'addEvent' - click), ele entra dentro da função referenciada
function handleSelectedItem(event){
    //testando o evento - f12 tem que aparecer no console o items-id quando clickado
    //target sempre li - ver configuração pointer evvent de target
    //console.log(event.target)
    //só pega o id
    //console.log(event.target.dataset.id)
    
    
    //colocando o id numa variável: (melhorei as variáveis na sequência)
    // const itemId = event.target.dataset.id
    
    //  --  adicionar ou remover uma classe com javscript
    
    //colocando CADA ITEM em uma variável:
    const itemLi = event.target
    //colocando cada id de CADA ITEM em uma variável
    const itemId = itemLi.dataset.id
    //adicionar uma classe a li quando clicar, e remover quando existir
    //classList = add ou remove ou toggle (esse adiciona qdo n tem e remove qdo tem).
    itemLi.classList.toggle("selected")

    // -- IMPORTATE!! 
    //isso é somente para o visual, para o formulário entender que o item selecionado
    //foi de fato selecionado e deve ser enviado por json, precisamos mexer com INPUT
    //estratégia de imput escondido (html)

    
    // -- Preenchendo o input

    // 1) 
    //    Verificando se existem itens selecionados, se sim
    // ---pegar os items selecionados | findItemsfunção para varrer os 0-5 items de Li 
    //
    // --Função grande e explicada:
        // const alreadySelected = selectedItems.findIndex( function (item){//pra cada item que ele encontrar, ele executa a função
        //     const itemFound = item == itemId // var achei o item recebe o item e compara o item ao itemId | peguei o item 1, 1 é igual a 1, logo intemFOund = true
        //     return itemFound
        //     //essa função fica rodando e atribuindo false ou true pro itemFound 
        // })
    //Função utilizada
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })

    //  --Função simplificada:
        //  const alreadySelected = selectedItems.findIndex( item => item == itemId)
      
    //Verificando 1
    //console.log(alreadySelected >=0) //até aqui aparece tudo -1

    //  2)
    //    Se já estiver selecionado (no array), tirar da seleção (quando clicado) //tipo um toggle pra colocar no array
    if(alreadySelected>=0){
        //tirando da seleção // colocando nos itens Filtrados
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //quando é desselecionado
            return itemIsDifferent //removido do array | entra nos itens filtrados
        })
        selectedItems = filteredItems
        // console.log("Item TIRADO")
        // console.log(filteredItems)
    } else{
        // se não estiver selecionado, 
        //adicionar à seleção
        selectedItems.push(itemId)
        console.log(itemId)
    }
    
    // console.log(selectedItems) //verificando se rolou 1 e 2
    
    
    // atualizar o campo escondido (input) com os itens selecionados
    //document.querySelector("input[name=items")  deixei numa variável acima
    collectedItems.value = selectedItems
}



