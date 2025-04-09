package rgt.server.book.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import rgt.server.book.dto.BookRequestDto;
import rgt.server.book.dto.BookResponseDto;
import rgt.server.book.exception.BookNotFoundException;
import rgt.server.book.model.Books;
import rgt.server.book.model.BooksMapper;

import java.awt.print.Book;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookService {

    private final BooksMapper booksMapper;

    public List<BookResponseDto> getAllBooks() {
        return booksMapper.getAllBooks().stream()
                .map(BookResponseDto::from)
                .collect(Collectors.toList());
    }

    public BookResponseDto getBookById(Long id) {
        log.info("도서 조회 : id={}", id);
        return booksMapper.getBookById(id)
                .map(BookResponseDto::from)
                .orElseThrow(() -> new BookNotFoundException("해당 책을 찾을 수 없습니다. ID: " + id));
    }

    public BookResponseDto addBook(BookRequestDto dto) {
        Books book = Books.builder()
                .title(dto.getTitle())
                .author(dto.getAuthor())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .stock(dto.getStock())
                .build();

        booksMapper.addBook(book);
        return BookResponseDto.from(book);
    }
    public BookResponseDto updateBook(Long id, BookRequestDto dto) {
        Books book = booksMapper.getBookById(id)
                .orElseThrow(() -> new BookNotFoundException("해당 책은 존재하지 않습니다. id " + id));

        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setDescription(dto.getDescription());
        book.setPrice(dto.getPrice());
        book.setStock(dto.getStock());
        booksMapper.updateBook(book);
        return BookResponseDto.from(book);
    }
}
