package pl.coderslab.service;

import org.springframework.stereotype.Service;
import pl.coderslab.model.Book;

import java.util.ArrayList;
import java.util.List;

@Service
public class MemoryBookService {
    private List<Book> list;

    public MemoryBookService() {
        list = new ArrayList<>();
        list.add(new Book(1L, "9788324631766", "Thinking in Java", "Bruce Eckel",
                "Helion", "programming"));
        list.add(new Book(2L, "9788324627738", "Rusz glowa, Java.",
                "Sierra Kathy, Bates Bert", "Helion", "programming"));
        list.add(new Book(3L, "9780130819338", "Java 2. Podstawy",
                "Cay Horstmann, Gary Cornell", "Helion", "programming"));
    }

    public List<Book> getList() {
        return list;
    }

    public void setList(List<Book> list) {
        this.list = list;
    }

    public Book getById(Long id) {
        for (Book book : list) {
            if (book.getId() == id) {
                return book;
            }
        }
        return null;
    }

    public void deleteBookById(Long id){
        Book book = getById(id);
        list.remove(book);

    }

    public void addBook(Book newBook){

        List<Book> list = getList();
        Book book = new Book();
        book.setId(Book.counter);
        Book.counterIncremetn();
        book.setTitle(newBook.getTitle());
        book.setAuthor(newBook.getAuthor());
        book.setIsbn(newBook.getIsbn());
        book.setPublisher(newBook.getPublisher());
        book.setType(newBook.getType());
        list.add(book);
        setList(list);
            }

    public void updateBook(Long id, Book editedBook){
        Book book = getById(id);
        book.setTitle(editedBook.getTitle());
        book.setAuthor(editedBook.getAuthor());
        book.setPublisher(editedBook.getPublisher());
        book.setType(editedBook.getType());
        book.setIsbn(editedBook.getIsbn());

    }
}