package rgt.server.book.model;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import java.util.Optional;

@Mapper
public interface BooksMapper {

    List<Books> getAllBooks();

    Optional<Books> getBookById(Long id);

    void addBook(Books book);
    void updateBook(Books book);
}
