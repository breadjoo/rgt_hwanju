package rgt.server.book.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rgt.server.book.dto.BookResponseDto;
import rgt.server.book.service.BookService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BookController {

    private final BookService bookService;

    @GetMapping("/books")
    public ResponseEntity<List<BookResponseDto>> getAllBooks() {
        List<BookResponseDto> books = bookService.getAllBooks();
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(books);
    }
    @GetMapping("/books/{bookId}")
    public ResponseEntity<BookResponseDto> getBook(@PathVariable("bookId") Long bookId) {
        log.info("[GET] /books/{} 요청 확인", bookId);
        return ResponseEntity.ok(bookService.getBookById(bookId));
    }
}
