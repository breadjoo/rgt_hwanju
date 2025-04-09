package rgt.server.book.dto;

import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BookRequestDto {

    private String title;
    private String author;
    private String description;

    @Min(value = 0, message = "가격의 최솟값은 0입니다.")
    private int price;

    @Min(value = 0, message = "수량의 최솟값은 0입니다.")
    private int stock;
}
