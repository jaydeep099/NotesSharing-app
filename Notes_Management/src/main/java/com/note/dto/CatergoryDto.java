package com.note.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CatergoryDto {
    private Integer categoryId;
    @NotBlank
    @Size(min = 10)
    private String categoryTitle;
    @NotBlank
    @Size(min=15)
    private String categoryDescription;
}
