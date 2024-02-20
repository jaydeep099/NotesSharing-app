package com.note.services;

import com.note.dto.CatergoryDto;
import com.note.entity.Category;
import java.util.List;

public interface CategoryService {
    public CatergoryDto createCategory(CatergoryDto catergoryDto);
    public CatergoryDto updateCategory(CatergoryDto catergoryDto , Integer categoryId);
    public void deleteCategory(Integer categoryId);
    public CatergoryDto getCategory(Integer CategotyId);
    List<CatergoryDto> getCategories();
}
