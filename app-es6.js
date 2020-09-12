class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{
  addBookToList(book){
    const list = document.getElementById('book-list');
        //Create tr (table row) element
        const row = document.createElement('tr');
        //Insert col
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X<a></td>
        `;
        list.appendChild(row);
  }

  showAlert(msg, className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    //Get Parent
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');

    //Insert Alert
    container.insertBefore(div, form);

    //Timeout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert')
        .remove();
    }, 3000);
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Local Storage class
class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  
  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn, index){
    const books = Store.getBooks();
    books.forEach(book => {
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//DOM Load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event Listener for Add Book
document.getElementById('book-form').addEventListener('submit', 
function(e){
    //Get Form Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    
    //Instantiate Book object
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const uiObject = new UI();

    //Validate
    if(title === '' || author === '' || isbn === ''){
        uiObject.showAlert('Please fill in all fields..!', 'error');
    }else{
        //Add Book to List
        uiObject.addBookToList(book);

        //Add to LS
        Store.addBook(book);

        //Show Success
        uiObject.showAlert('Book Added', 'success');

        //Clear Fields
        uiObject.clearFields();
    }

    e.preventDefault();
});

//Event Listener for Delete
document.getElementById('book-list').addEventListener('click',
function(e){

    //Instantiate UI
    const uiObject = new UI();

    //Delete Book
    uiObject.deleteBook(e.target);

    //Delete from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    uiObject.showAlert('Book Removed', 'success');
    
    e.preventDefault();
});