package com.ivy.expensely.model;

import javax.persistence.*;

import lombok.Data;

@Entity

@Data
@Table(name="category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    public Category(String name) {
        this.name = name;
        this.id=1L;
    }

    public Category(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    public Category( String name,Long id) {
        this.name = name;
        this.id = id;
    }

    public Category() {
    }

}