//Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI(){

    //Add Book to List
    UI.prototype.addBookToList = function(book){
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

    //Clear Fields
    UI.prototype.clearFields = function(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    //Delete Book
    UI.prototype.deleteBook = function(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    //Show Alert
    UI.prototype.showAlert = function(msg, className){
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
}

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

    uiObject.deleteBook(e.target);

    uiObject.showAlert('Book Removed', 'success');
    
    e.preventDefault();
});
