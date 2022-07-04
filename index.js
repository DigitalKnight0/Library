let myLibrary = [];
const newBook = document.querySelector('.add')
const addBook = document.querySelector('form')
const closeButton = document.querySelector('form button[type="button"]')
const library = document.querySelector('.shelf');

(function(){
    updateDisplay()
})()

closeButton.addEventListener('click', (e) => {
    addBook.classList.add('hidden')
})

class Book{
    constructor(title, author, pages, read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
    updateDisplay()
}

newBook.addEventListener('click', () => {
    addBook.classList.remove('hidden')
})


function updateDisplay(){
    library.innerHTML = ''
    myLibrary.forEach((book, index) => {
        book.index = index
        let newCard = createCard(book)
        setReadStatus(newCard, book)
        library.appendChild(newCard)
    });
    updateListeners()
}

function createCard(book){
    let card = document.querySelector('.card-template').content.cloneNode(true)
    card.querySelector('.title').textContent = book.title
    card.querySelector('.author').textContent = book.author
    card.querySelector('.pages').textContent = book.pages
    card.querySelector('.read').textContent = book.read ? "Yes" : "No"
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
        readBox.textContent = 'No'
    }
    else{
        book.read = true
        readBox.textContent = 'Yes'
    }
    setReadStatus(targetCard, book)
}

function removeBook(e){
    let index = e.target.parentNode.getAttribute('data-index')
    index = Number(index)
    let book = myLibrary[index]
    myLibrary = myLibrary.filter((book, bookIndex) => bookIndex !== index)
    updateDisplay()
}

function setReadStatus(card, book){
    const button = card.querySelector('.read-status')
    if(book.read){
        button.textContent = "Unread"
        button.classList.add('unread')
    }
    else{
        button.textContent = "Read"
        button.classList.remove('unread')
    }
}

// Validation for form

const bookTitle = addBook.querySelector('#title')
bookTitle.addEventListener('input', () => {
    if(bookTitle.validity.valueMissing){
        bookTitle.setCustomValidity('The Title Field cannot be empty!')
        bookTitle.reportValidity()
    } else if(bookTitle.validity.tooShort){
        bookTitle.setCustomValidity('The title should be at least 5 characters long')
        bookTitle.reportValidity()
    } else {
        bookTitle.setCustomValidity('')
    }
})

const bookAuthor = addBook.querySelector('#author')
author.addEventListener('input', () => {
    if(author.validity.valueMissing){
        author.setCustomValidity('The author Field cannot be empty!')
        author.reportValidity()
    } else {
        author.setCustomValidity('')
    }
})

const bookPages = addBook.querySelector('#pages')
pages.addEventListener('input', () => {
    if(pages.validity.valueMissing){
        pages.setCustomValidity('The Pages Field cannot be empty!')
        pages.reportValidity()
    } else if(pages.validity.rangeUnderflow){
        pages.setCustomValidity('There Should be At Least 5 Pages!')
        pages.reportValidity()
    } else {
        bookTitle.setCustomValidity('')
    }
})

addBook.addEventListener('submit', (event)=>{
    event.preventDefault()
    if(!bookTitle.validity.valid || !bookAuthor.validity.valid || !bookPages.validity.valid) return
    let inputs = document.querySelectorAll('form input')
    let title = inputs[0].value
    let author = inputs[1].value
    let pages = inputs[2].value
    let read = inputs[3].checked
    addBookToLibrary(title, author, pages, read)
    addBook.reset()
    addBook.classList.add('hidden')
})
