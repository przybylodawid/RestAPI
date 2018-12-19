package pl.coderslab.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.coderslab.model.Book;
import pl.coderslab.service.MemoryBookService;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookControler {

    @Autowired
    private MemoryBookService mbs;

        @RequestMapping("/hello")
        public String hello(){
            return "{hello: World}";
        }

    @RequestMapping("/helloBook")
    public Book helloBook(){
        return new Book(1L,"9788324631766","Thinking in Java",
                "Bruce Eckel","Helion","programming");
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Book> getBooks(){
          return mbs.getList();

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Book getBookByid(@PathVariable Long id){
        return mbs.getById(id);
    }


    @RequestMapping(value = "/", method = RequestMethod.POST)
    public void addBook(@RequestBody Book newBook){
            mbs.addBook(newBook);



    }


    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public void update(@RequestBody Book editedBook, @PathVariable Long id){
          mbs.updateBook(id, editedBook);

    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteBookById(@PathVariable Long id){
            mbs.deleteBookById(id);
    }



}
