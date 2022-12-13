package com.ivy.expensely.service;

import com.ivy.expensely.model.Category;
import com.ivy.expensely.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Collection<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(long param_id){
        return  categoryRepository.findById(param_id);
    }

    public Category getCategoryByName(String param_name) {
        return  categoryRepository.findByName(param_name);
    }

    public void addCategory(Category category){
        categoryRepository.save(category) ;
    }

    public void deleteCategory(long id){
        categoryRepository.deleteById(id);
    }

    public Category updateCategory(Category category, Long id){
        Category category_obj=categoryRepository.findById(id).get();
        if (category_obj != null) {
            categoryRepository.deleteById(id);
            category_obj.setId(category.getId());
            category_obj.setName(category.getName());
            categoryRepository.save(category_obj);
        }
        return category_obj;
    }
}
