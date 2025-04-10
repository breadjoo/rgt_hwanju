package rgt.server.book.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Delete;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rgt.server.book.dto.BookRequestDto;
import rgt.server.book.dto.BookResponseDto;
import rgt.server.book.dto.StockUpdateDto;
import rgt.server.book.service.BookService;

import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BookController {

    private final BookService bookService;

    //책 목록 가져오기
    @GetMapping("/books")
    public ResponseEntity<List<BookResponseDto>> getAllBooks() {
        List<BookResponseDto> books = bookService.getAllBooks();
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(books);
    }

    //책 상세보기
    @GetMapping("/books/{bookId}")
    public ResponseEntity<BookResponseDto> getBook(@PathVariable("bookId") Long bookId) {
        log.info("[GET] /books/{} 요청 확인", bookId);
        return ResponseEntity.ok(bookService.getBookById(bookId));
    }

    //책 입력
    @PostMapping("/books")
    public ResponseEntity<BookResponseDto> addBook(@RequestBody BookRequestDto dto) {
        BookResponseDto savedBook = bookService.addBook(dto);
        URI location = URI.create("/api/books/" + savedBook.getId());
        return ResponseEntity.created(location).body(savedBook);
    }

    //책 정보 수정
    @PutMapping("/books/{bookId}")
    public ResponseEntity<Void> updateBook(@PathVariable("bookId") Long bookId,
                                           @RequestBody @Valid BookRequestDto dto) {
        bookService.updateBook(bookId, dto);
        return ResponseEntity.noContent().build();
    }

    //책 삭제 (hard)
    @DeleteMapping("/books/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable("bookId") Long bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.noContent().build();
    }

    //책 수량 수정
    @PatchMapping("/books/{id}/stock")
    public ResponseEntity<Void> updateStock(@PathVariable("id") Long id,
                                            @RequestBody StockUpdateDto dto) {
        bookService.updateStock(id, dto.getStock());
        return ResponseEntity.noContent().build();
    }
}
