package com.ivy.expensely.controller;

import com.ivy.expensely.model.Category;
import com.ivy.expensely.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @CrossOrigin
    @GetMapping("/categories")
    public Collection<Category> displayAllCategory() {
        return categoryService.getAllCategories();
    }

    @CrossOrigin
    @GetMapping("/category/{param_id}")
    public Optional<Category> displayById(@PathVariable int param_id) {
        return categoryService.getCategoryById(param_id);
    }

    @CrossOrigin
    @GetMapping("/categoryName/{param_name}")
    public Category displayByName(@PathVariable String param_name ){
        return categoryService.getCategoryByName(param_name);
    }
    @CrossOrigin
    @PostMapping("/category")
    public void addCategory(@RequestBody Category category){
        categoryService.addCategory(category);
    }

    @CrossOrigin
    @DeleteMapping("/deleteCategory/{id}")
    public void deleteCategory(@PathVariable long id){
        categoryService.deleteCategory(id);
    }

    @CrossOrigin
    @PutMapping("/updateCategory/{id}")
    public Category updateCategory(@RequestBody Category category, @PathVariable("id") Long id){
        return categoryService.updateCategory(category,id);

    }
}
