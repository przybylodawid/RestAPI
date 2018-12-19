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

    // Dodawanie nowego booka z forma

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
        // TODO działa dopiero po f5, za drugim razem wszystko jest OK. DLACZEGO?
        window.location.reload(true);
    });

    var mainContainer = $('.main-container');

    // POBRANIE KSIĄŻEK

    $.ajax({
        url: "http://localhost:8080/books/",
        type: 'GET',
        dataType: 'json'
    }).done(function (response) {
        for (var i = 0; i < response.length; i++) {
            var newDiv = $('<div>');
            var newDiv2 = $('<div>');
            newDiv2.attr('data-id', response[i].id)
            var deleteLink = $('<a href="#"> USUŃ KSIĄŻKĘ</a>');
            var editLink = $('<a href="#"> Edytuj Książkę</a>');
            newDiv.text(response[i].title);
            newDiv.attr('class', 'form-control');
            newDiv2.text('Autor:' + response[i].author + ' Wydawca: ' + response[i].publisher+ ' ISBN: ' + response[i].isbn);
            newDiv2.append(deleteLink);
            newDiv2.append(editLink);

            var idToEdit = 0;

        // przesłąnie książki o danym ID do formularza w celu edycji

            editLink.on('click', function (e) {
                e.preventDefault();
                var id = $(this).parent().attr('data-id');
                $.ajax({
                    url: "http://localhost:8080/books/" + id,
                    type: 'GET',
                    dataType: 'json'
                }).done(function (response) {
                    bookTitle.val(response.title);
                    bookAuthor.val(response.author);
                    bookISBN.val(response.isbn);
                    bookType.val(response.type);
                    bookPublisher.val(response.publisher);
                    idToEdit = response.id;
                })

                //zzamiana widoczności guzików - EDYCJA / ZAPIS - TODO do naprawy bug po kliknięciu 2 x edycja :PPP  - narazie się tym nie zajmujemy
                bookEdit.toggle();
                bookAddSubmit.toggle();


            })

            // ZAPIS DO BAZY DANYCH EDYTOWANYCH KSIAZEK

            bookEdit.on('click', function (e) {
                var editedBook = {
                    title: bookTitle.val(),
                    publisher: bookPublisher.val(),
                    author: bookAuthor.val(),
                    isbn: bookISBN.val(),
                    type: bookType.val()
                };

                $.ajax({
                    url: 'http://localhost:8080/books/' + idToEdit,
                    type: 'PUT',
                    dataType: 'json',
                    data: JSON.stringify(editedBook),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })

                bookEdit.toggle();
                bookAddSubmit.toggle();
                window.location.reload(true);
            })


         // USUWANIE KSIĄZKI O DANYM ID

            deleteLink.on('click', function () {
                var id = $(this).parent().attr('data-id');
                delBook(id);
                window.location.reload()
            })


            newDiv2.hide();


            newDiv.on('click', function () {
                $(this).next().toggle();
            });
            mainContainer.append(newDiv, newDiv2);


        }
    })

    // FUNCCJA USUWAJĄCA KSIĄŻKE O DANYM ID

    var delBook = function (id) {
        $.ajax({
            url: "http://localhost:8080/books/" + id,
            type: 'DELETE',
            dataType: 'json'
        })


    }

});