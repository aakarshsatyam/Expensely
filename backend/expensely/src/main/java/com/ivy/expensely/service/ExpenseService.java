package com.ivy.expensely.service;

import com.ivy.expensely.model.Expense;
import com.ivy.expensely.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;

    public Collection<Expense> getAllExpenses(long param_id) {
        return expenseRepository.findAllByUserId(param_id);
    }

    public Optional<Expense> getExpenseById(long param_id){
        return  expenseRepository.findById(param_id);
    }


    public void addExpense(Expense expense){
        expenseRepository.save(expense) ;
    }

    public void deleteExpense(long id){
        expenseRepository.deleteById(id);
    }

    public Expense updateExpense(Expense expense, Long id){
        Expense expense_obj=expenseRepository.findById(id).get();
        if (expense_obj != null) {
            expenseRepository.deleteById(id);
            expense_obj.setId(expense.getId());
            expense_obj.setExpensedate(expense.getExpensedate());
            expense_obj.setDescription(expense.getDescription());
            expense_obj.setLocation(expense.getLocation());
            expense_obj.setAmount(expense.getAmount());
            expense_obj.setType(expense.getType());
            expenseRepository.save(expense_obj);
        }
        return expense_obj;
    }
    public Integer displayBalance(int param_id){
        return expenseRepository.total(param_id);
    }
    public Integer displayByTypeIncome(long param_id){
        return expenseRepository.findByTypeIncome(param_id);
    }

    public Integer displayByTypeExpense(long param_id) {
        return expenseRepository.findByTypeExpense(param_id);
    }
}
