class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBook = (book) => {
        const bookList = document.querySelector('#book-list');

        if (book.title == ''
            || book.author == ''
            || book.isbn == '') {
                this.showMessage('Please provide all required fields.', '.error')
                return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
                <tr>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete-book">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </a></td>
                </tr>
        `;
        bookList.appendChild(row);
    };

    showMessage = (resultMessage, classList) => {
        const result = document.querySelector('.result-message');
        const p = document.createElement('p');
        p.textContent = resultMessage;
        p.className = 'error';

        result.appendChild(p);
    }

    clearForm = () => {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}

// =================================>>>

document.querySelector('#book-form').addEventListener('submit', (e) => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const ui = new UI();
    const book = new Book(title, author, isbn);

    ui.addBook(book);
    ui.clearForm();

    e.preventDefault();
});
