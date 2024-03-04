package com.note.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public interface FileService {
    String uploadpdf(String path, MultipartFile file) throws IOException;
    InputStream getResources(String path, String fileName) throws FileNotFoundException;
}
