let myLibrary = [];
const library = document.querySelector('.library');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};


function addBook() {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;
    
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    
    let bookCard = document.createElement('div');
    bookCard.classList.add('card');
    
    let titleDiv = document.createElement('div');
    titleDiv.textContent = `${title}`;
    
    let authorDiv = document.createElement('div');
    authorDiv.textContent = `by: ${author}`;
    
    let pagesDiv = document.createElement('div');
    pagesDiv.textContent = `${pages} pgs`;
    
    let readDiv = document.createElement('div');
    readDiv.classList.add('read');
    readDiv.textContent = 'Read? ';
    
    let thumbsUpImg = document.createElement('img');
    thumbsUpImg.classList.add('icon', 'thumb', read ? 'true' : 'false');
    thumbsUpImg.src = read ? './images/thumb-up.svg' : './images/thumb-up-outline.svg';
    thumbsUpImg.alt = 'thumbs up icon';
    
    readDiv.appendChild(thumbsUpImg);
    
    let info = document.createElement('div');
    info.classList.add('txt');
    info.appendChild(titleDiv);
    info.appendChild(authorDiv);
    info.appendChild(pagesDiv);
    info.appendChild(readDiv);
    
    bookCard.appendChild(info);

    let removeButton = document.createElement('img');
    removeButton.classList.add('icon', 'removebtn');
    removeButton.src = './images/trash-can-outline.svg';
    removeButton.alt = 'trash can icon'
    bookCard.appendChild(removeButton);

    library.appendChild(bookCard);
}


function toggleRead() {
    let thumbsUpImg = this.querySelector('.thumb');
    thumbsUpImg.classList.toggle('true');
    thumbsUpImg.classList.toggle('false');
    thumbsUpImg.src = thumbsUpImg.classList.contains('true') ? './images/thumb-up.svg' : './images/thumb-up-outline.svg';
}


function removeBook() {
    let parentCard = this.closest('.card');
    let index = Array.from(library.children).indexOf(parentCard); // Get the index of the card in the library
    
    // Remove the card from the DOM
    parentCard.parentNode.removeChild(parentCard);
    
    // Remove the corresponding book from the myLibrary array
    myLibrary.splice(index, 1);
}
const btn = document.querySelector('.submit');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    addBook();
});


library.addEventListener('click', (e) => {
    if (e.target.classList.contains('removebtn')) {
        removeBook.call(e.target); // Using call() to set 'this' correctly
    }
    else if (e.target.classList.contains('thumb')) {
        toggleRead.call(e.target.closest('.card'));
    }
});