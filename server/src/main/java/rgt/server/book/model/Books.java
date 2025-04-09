package rgt.server.book.model;

import lombok.Data;

@Data
public class Books {

    private Long id;
    private String title;
    private String author;
    private String description;
    private int price;
    private int stock;
}
