package rgt.server.book.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import rgt.server.book.dto.BookRequestDto;
import rgt.server.book.dto.BookResponseDto;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional @Rollback
public class BookServiceTest {

    @Autowired
    private BookService bookService;


    //전체 책 조회
    @Test
    void testGetAllBooks() {
        List<BookResponseDto> books = bookService.getAllBooks();
        assertNotNull(books);
        assertFalse(books.isEmpty(),"테이블 내에 데이터 존재 여부 확인");
    }

    //책 조회 및 제목일치 확인
    @Test
    void testGetBookBy() {
        BookResponseDto book = bookService.getBookById(7L);
        assertNotNull(book);
        assertEquals("소년이 온다",book.getTitle());

    }

    private BookRequestDto testDto() {
        BookRequestDto dto = new BookRequestDto();
        dto.setTitle("테스트 제목");
        dto.setAuthor("테스트 작가");
        dto.setDescription("테스트 설명");
        dto.setPrice(100);
        dto.setStock(10);

        return dto;
    }

    @Test
    void testAddBook() {
        BookRequestDto dto = testDto();
        bookService.addBook(dto);
        List<BookResponseDto> books = bookService.getAllBooks();
        assertTrue(books.stream().anyMatch(book -> book.getTitle().equals("테스트 제목")));
    }

    @Test
    void testUpdateStock() {
        Long id = 1L;
        bookService.updateStock(id, 777);
        BookResponseDto dto = bookService.getBookById(id);
        assertEquals(777, dto.getStock());
    }
}
