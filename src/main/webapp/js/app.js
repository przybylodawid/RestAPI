document.addEventListener('DOMContentLoaded', function () {

    var bookAddForm = $('.bookadd');
    var bookAddSubmit = $('.addbutton');
    var bookEdit = $('.editbutton');
    bookEdit.hide();


    var bookTitle = $('#bookTitle');
    var bookAuthor = $('#bookAuthor');
    var bookPublisher = $('#bookPublisher');
    var bookType = $('#bookType');
    var bookISBN = $('#bookISBN');

    bookAddSubmit.on('click', function (e) {
        e.preventDefault();

        var newBook = {
            title: bookTitle.val(),
            publisher: bookPublisher.val(),
            author: bookAuthor.val(),
            isbn: bookISBN.val(),
            type: bookType.val()
        };

        $.ajax({
            url: 'http://localhost:8080/books/',
            type: 'POST',
            dataType: 'jason',
            data: JSON.stringify(newBook),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).done(function (result) {
            console.log(result);

        });

        window.location.reload(true);
    });

    var mainContainer = $('.main-container');

    $.ajax({
        url: "http://localhost:8080/books/",
        type: 'GET',
        dataType: 'json'
    }).done(function (response) {
        for (var i = 0; i < response.length; i++) {
            var newDiv = $('<div>');
            var newDiv2 = $('<div>');
            var deleteLink = $('<a href="#"> USUŃ KSIĄŻKĘ</a>');
            var editLink = $('<a href="#"> Edytuj Książkę</a>');
            var bookId = response[i].id;
            newDiv.text(response[i].title);
            newDiv.attr('class', 'form-control');
            newDiv2.text('Autor: ' + response[i].author + ' Wydawca: ' + response[i].publisher);
            newDiv2.append(deleteLink);
            newDiv2.append(editLink);

            var titleToEdit = response[i].title;
            var authorToEdit = response[i].author;
            var isbnToEdit = response[i].isbn;
            var typeToEdit = response[i].type;
            var publisherToEdit = response[i].publisher;


            editLink.on('click', function () {
                //przekazac do forma
                bookTitle.val(titleToEdit);
                bookAuthor.val(authorToEdit);
                bookISBN.val(isbnToEdit);
                bookType.val(typeToEdit);
                bookPublisher.val(publisherToEdit);


                //zamienc guziki
                bookEdit.toggle();
                bookAddSubmit.toggle();

            })

            bookEdit.on('click', function(e, bookId){
                e.preventDefault();
                console.log('JS ty kurwiu');
                console.log(bookId);
                var editedBook = {
                    title: bookTitle.val(),
                    publisher: bookPublisher.val(),
                    author: bookAuthor.val(),
                    isbn: bookISBN.val(),
                    type: bookType.val()
                };

                $.ajax({
                    url: 'http://localhost:8080/books/' + bookId,
                    type: 'PUT',
                    dataType: 'jason',
                    data: JSON.stringify(editedBook),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                bookEdit.toggle();
                bookAddSubmit.toggle();
            })

            // zapytać rafała DLACZEGO!!?!?!?!




            deleteLink.on('click', function () {
                delBook(bookId);
                window.location.reload()
            })


            newDiv2.hide();


            newDiv.on('click', function () {
                $(this).next().toggle();
            });
            mainContainer.append(newDiv, newDiv2);


        }
    })

    var delBook = function (id) {
        $.ajax({
            url: "http://localhost:8080/books/" + id,
            type: 'DELETE',
            dataType: 'json'
        })


    }

});