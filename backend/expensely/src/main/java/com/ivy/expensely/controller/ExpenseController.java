package com.ivy.expensely.controller;

import com.ivy.expensely.model.Expense;
import com.ivy.expensely.service.CategoryService;
import com.ivy.expensely.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private CategoryService categoryService;


    @CrossOrigin
    @GetMapping("/expenses/{pid}")
    public Collection<Expense> displayAllExpense(@PathVariable long pid) {
        return expenseService.getAllExpenses(pid);
    }

    @CrossOrigin
    @GetMapping("/expense/{param_id}")
    public Optional<Expense> displayExpenseById(@PathVariable int param_id) {
        return expenseService.getExpenseById(param_id);
    }

    @CrossOrigin
    @PostMapping("/expense")
    public void addExpense(@RequestBody Expense expense){
        expenseService.addExpense(expense);
    }

    @CrossOrigin
    @DeleteMapping("/deleteExpense/{id}")
    public void deleteExpense(@PathVariable long id){
        expenseService.deleteExpense(id);
    }

    @CrossOrigin
    @PutMapping("/updateExpense/{id}")
    public Expense updateExpense(@RequestBody Expense expense, @PathVariable("id") Long id){
        return expenseService.updateExpense(expense,id);

    }

    @CrossOrigin
    @GetMapping("/getBalance/{param_id}")
    public Integer displayBalance(@PathVariable int param_id){
        return expenseService.displayBalance(param_id);
    }

    @CrossOrigin
    @GetMapping("/getTypeIncome/{param_id}")
    public Integer displayByTypeIncome(@PathVariable Integer param_id){
        return expenseService.displayByTypeIncome(param_id);
    }

    @CrossOrigin
    @GetMapping("/getTypeExpense/{param_id}")
    public Integer displayByTypeExpense(@PathVariable Integer param_id){
        return expenseService.displayByTypeExpense(param_id);
    }
}
