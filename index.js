let myLibrary = [];
const newBook = document.querySelector('.add')
const addBook = document.querySelector('form')
const library = document.querySelector('.shelf')

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    updateDisplay()
}

newBook.addEventListener('click', () => {

})

addBook.addEventListener('submit', (event)=>{
    event.preventDefault()
    console.log('heck')
    let inputs = document.querySelectorAll('form input')
    let title = inputs[0].value
    let author = inputs[1].value
    let pages = inputs[2].value
    let read = inputs[3].checked
    addBookToLibrary(title, author, pages, read)
})

function updateDisplay(){
    library.innerHTML = ''
    myLibrary.forEach((book, index) => {
        book.index = index
        let newCard = createCard(book)
        library.appendChild(newCard)
    });
    updateListeners()
}

function createCard(book){
    let card = document.querySelector('.card-template').content.cloneNode(true)
    card.querySelector('.title').textContent = book.title
    card.querySelector('.author').textContent = book.author
    card.querySelector('.pages').textContent = book.pages
    card.querySelector('.read').textContent = book.read ? "Read" : "Not Read"
    card.querySelector('.buttons').setAttribute('data-index',book.index)
    return card
}

function updateListeners(){
    if(!myLibrary.length) return
    document.querySelectorAll('.read-status').forEach(button => {
        button.addEventListener('click', changeReadStatus)
    })
    document.querySelectorAll('.remove-card').forEach(button => {
        button.addEventListener('click', removeBook)
    })
}

function changeReadStatus(e){
    let index = e.target.parentNode.getAttribute('data-index')
    index = Number(index)
    let book = myLibrary[index]
    let targetCard = library.querySelectorAll('.card')[index]
    let readBox = targetCard.querySelector('.read')
    if(book.read){
        book.read = false
        readBox.textContent = 'Not Read'
    }
    else{
        book.read = true
        readBox.textContent = 'Read'
    }
}

function removeBook(e){
    let index = e.target.parentNode.getAttribute('data-index')
    index = Number(index)
    let book = myLibrary[index]
    myLibrary = myLibrary.filter((book, bookIndex) => bookIndex !== index)
    updateDisplay()
}