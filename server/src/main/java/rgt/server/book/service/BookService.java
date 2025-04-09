package rgt.server.book.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import rgt.server.book.dto.BookResponseDto;
import rgt.server.book.exception.BookNotFoundException;
import rgt.server.book.model.BooksMapper;

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
}
