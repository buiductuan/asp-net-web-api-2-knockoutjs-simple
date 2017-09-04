var ViewModels = function () {
    var self = this;

    self.books = ko.observableArray();
    self.detail = ko.observableArray();
    self.authors = ko.observableArray();
    self.error = ko.observable();

    self.newBook = {
        Author: ko.observableArray(),
        Title: ko.observable(),
        Genre: ko.observable(),
        Price: ko.observable(),
        Year: ko.observable()
    };

    self.upBook = {
        Author: ko.observableArray(),
        Title: ko.observable(),
        Genre: ko.observable(),
        Price: ko.observable(),
        Year: ko.observable(),
        Id: ko.observable()
    };

    var BooksUri = '/api/books/';
    var AuthorUri = '/api/authors/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear all error message

        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errThrown) {
            self.error(errThrown);
        });
    }

    function GetAllBooks() {
        ajaxHelper(BooksUri, 'GET').done(function (data) {
            self.books(data);
        });
    }
    // Fetch the initial data.
    GetAllBooks();

    // Book Detail
    self.getBookDetail = function (item) {
        ajaxHelper(BooksUri + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    };

    //get Authors
    function getAuthors() {
        ajaxHelper(AuthorUri, 'GET')
            .done(function (data) {
                self.authors(data);
            });
    };

    // Add a new book
    self.addBook = function (formElement) {
        var book = {
            AuthorId: self.newBook.Author().Id,
            Title: self.newBook.Title(),
            Genre: self.newBook.Genre(),
            Price: self.newBook.Price(),
            Year: self.newBook.Year()
        };

        ajaxHelper(BooksUri, 'POST', book).done(function (item) {
            //self.books.push(item);
            GetAllBooks();
        });
    };

    getAuthors();

    // Delete book
    self.deleteBook = function (item) {
        bootbox.confirm({
            title: "Destroy book : <b>" + item.Title + "</b> ?",
            message: "Do you want to delete book '<b>" + item.Title + "</b>' now? This cannot be undone.",
            buttons: {
                cancel: {
                    label: 'Cancel'
                },
                confirm: {
                    label: 'Delete',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    ajaxHelper(BooksUri + item.Id, 'DELETE')
                        .done(function () {
                            GetAllBooks();
                            $('#alert_callback_delete').removeAttr('style');
                            setTimeout(function () {
                                $('#alert_callback_delete').attr('style', 'display:none');
                            }, 4000);
                        });
                }
            }
        });
    };

    // Update book
    self.updateBook = function (formElement) {
        var book = {
            AuthorId: self.upBook.Author().Id,
            Title: self.upBook.Title(),
            Genre: self.upBook.Genre(),
            Price: self.upBook.Price(),
            Year: self.upBook.Year(),
            Id: self.upBook.Id()
        };

        ajaxHelper(BooksUri + book.Id, 'PUT', book)
            .done(function () {
                GetAllBooks();
            });
    };
};

ko.applyBindings(new ViewModels());