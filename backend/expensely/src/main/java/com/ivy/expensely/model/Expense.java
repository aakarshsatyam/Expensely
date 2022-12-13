package com.ivy.expensely.model;

import java.time.Instant;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Table(name="expense")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Instant expensedate;

    private String description;

    private String location;

    private Long amount;

    private String type;

    @ManyToOne
    private Category category;

    @ManyToOne
    private User user;

}