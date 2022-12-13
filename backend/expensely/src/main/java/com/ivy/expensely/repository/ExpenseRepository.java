package com.ivy.expensely.repository;

import com.ivy.expensely.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense,Long> {

    @Query(value="SELECT sum(amount) FROM expense where user_id=:param_id",nativeQuery = true)
    public Integer total(int param_id);
    @Query(value="SELECT sum(amount) FROM expense WHERE type='income' AND user_id=:param_id",nativeQuery = true)
    public Integer findByTypeIncome(long param_id);
    @Query(value="SELECT sum(amount) FROM expense WHERE type='expense' AND user_id=:param_id",nativeQuery = true)
    public Integer findByTypeExpense(long param_id);

    Collection<Expense> findAllByUserId(long param_id);
}
