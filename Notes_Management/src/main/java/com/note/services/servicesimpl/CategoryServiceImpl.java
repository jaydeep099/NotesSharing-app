package com.note.services.servicesimpl;

import com.note.dto.CatergoryDto;
import com.note.entity.Category;
import com.note.exceptions.ResourceNotFoundException;
import com.note.repository.CategoryRepo;
import com.note.services.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CatergoryDto createCategory(CatergoryDto catergoryDto) {
        Category cat = this.modelMapper.map(catergoryDto, Category.class);
        Category addedCat = this.categoryRepo.save(cat);
        return this.modelMapper.map(addedCat , CatergoryDto.class);
    }

    @Override
    public CatergoryDto updateCategory(CatergoryDto catergoryDto, Integer categoryId) {
        Category category = this.categoryRepo.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category","CategoryId",categoryId));
        category.setCategoryTitle(catergoryDto.getCategoryTitle());
        category.setCategoryDescription(catergoryDto.getCategoryDescription());
        Category updatedCategory  = this.categoryRepo.save(category);
        return this.modelMapper.map(updatedCategory , CatergoryDto.class);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
        Category category = this.categoryRepo.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category","CategoryId",categoryId));
        this.categoryRepo.delete(category);
    }

    @Override
    public CatergoryDto getCategory(Integer categoryId) {
        Category category = this.categoryRepo.findById(categoryId).orElseThrow(()->new ResourceNotFoundException("Category","CategoryId",categoryId));
        return this.modelMapper.map(category , CatergoryDto.class);
    }

    @Override
    public List<CatergoryDto> getCategories() {
        List<Category> categories = this.categoryRepo.findAll();
       List<CatergoryDto> catergoryDtos = categories.stream().map(category -> this.modelMapper.map(category,CatergoryDto.class)).collect(Collectors.toList());
        return catergoryDtos;
    }
}
