let myLibrary = [];
const libraryContainer = document.querySelector('.library');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
        this.libraryContainer = document.querySelector('.library');
    }

    addBook() {
        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let pages = document.querySelector('#pages').value;
        let read = document.querySelector('#read').checked;

        const book = new Book(title, author, pages, read);
        this.myLibrary.push(book);

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
        removeButton.alt = 'trash can icon';
        bookCard.appendChild(removeButton);

        this.libraryContainer.appendChild(bookCard);
    }
}

class ToggleRead {
    constructor(card) {
        this.thumbsUpImg = card.querySelector('.thumb');
        this.thumbsUpImg.classList.toggle('true');
        this.thumbsUpImg.classList.toggle('false');
        this.thumbsUpImg.src = this.thumbsUpImg.classList.contains('true') ? './images/thumb-up.svg' : './images/thumb-up-outline.svg';
    }
}

class RemoveBook {
    constructor(card, libraryInstance) {
        this.parentCard = card;
        this.index = Array.from(libraryInstance.libraryContainer.children).indexOf(this.parentCard); // Get the index of the card in the library
        this.libraryInstance = libraryInstance;

        // Remove the card from the DOM
        this.parentCard.parentNode.removeChild(this.parentCard);

        // Remove the corresponding book from the myLibrary array
        this.libraryInstance.myLibrary.splice(this.index, 1);
    }
}

const libraryInstance = new Library();

document.querySelector('.submit').addEventListener('click', (e) => {
    e.preventDefault();
    libraryInstance.addBook();
});

libraryContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('removebtn')) {
        new RemoveBook(e.target.closest('.card'), libraryInstance);
    } else if (e.target.classList.contains('thumb')) {
        new ToggleRead(e.target.closest('.card'));
    }
});
