package com.note.controller;


import com.note.dto.ApiResponse;
import com.note.dto.CatergoryDto;
import com.note.services.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/")
    private ResponseEntity<?> createCategory(@Valid @RequestBody CatergoryDto catergoryDto){
        CatergoryDto createCategory = this.categoryService.createCategory(catergoryDto);
        return new ResponseEntity<>(createCategory, HttpStatus.OK);
    }

    @PutMapping("/{categoryId}")
    private ResponseEntity<?> UpdateCategory(@Valid @RequestBody CatergoryDto catergoryDto ,@PathVariable Integer categoryId){
        CatergoryDto updatedCategory = this.categoryService.updateCategory(catergoryDto, categoryId);
        return ResponseEntity.ok(updatedCategory);
    }
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable Integer categoryId){
        this.categoryService.deleteCategory(categoryId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Category is deleted successfully",true),HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<CatergoryDto>> getALlCategory(){
        return ResponseEntity.ok(this.categoryService.getCategories());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getSingleCategory(@PathVariable Integer categoryId){
        return ResponseEntity.ok(this.categoryService.getCategory(categoryId));
    }

}
