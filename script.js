
const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')


const localStoregeTransaction = JSON.parse(localStorage
    .getItem('transactions')) 

let transactions = localStorage
    .getItem('transactions') !== null ? localStoregeTransaction : []



// remover a transação 
const removeTransaction = ID => {
    transactions = transactions
    .filter(transaction => transaction.id !== ID)
    
    updateLocalStorage()
    init()
    
}


// adiciona lista de transações
const addTransactionIntoDOM = transaction => {
    const operador = transaction.amount < 0 ? '-': '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const amountWinthoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = ` ${transaction.name}
    <span>${operador} R$ ${amountWinthoutOperator} </span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button> `
   
    transactionUl.append(li)

}


// Atualiza os valores e mostra na tela
const updateBalanceValues = () => {
    const transactionsAmount = transactions
        .map(transaction => transaction.amount)
    const total = transactionsAmount
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
     const income = transactionsAmount
        .filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
    const expense = transactionsAmount 
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

// função que inicia a chamada do programa
const init = () => {
    transactionUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

// função que vai adicionar ao localStorage
const updateLocalStorage = ()=> {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

//função para gerar um numero aleatorio de 0 á 1000 
const generateID = () => Math.round(Math.random() * 1000) 


// Função que vai adicionar o obj ao array de transações
const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmount)
    })
}

// Função que limpa os inputs
const clearInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}

//lidar com formulário enviar
 const handleFormSubmit = event => {
    
    event.preventDefault() 

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

    // Validação para saber se os inputs estão preenchidos.
    if(isSomeInputEmpty){
        alert('Por favor, preencha tanto o nome quanto o valor da transação')
        return
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init() // atualiazar as transações na tela 
    updateLocalStorage() // salvo no localStorage
    clearInputs() // limpa os inputs
  
}

form.addEventListener('submit', handleFormSubmit)