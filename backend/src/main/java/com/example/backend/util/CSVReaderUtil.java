package com.example.backend.util;

import com.opencsv.CSVReader;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.util.List;

public class CSVReaderUtil {

    private CSVReaderUtil() {
    }

    public static List<String[]> readCSV(MultipartFile file) {
        try {

            CSVReader reader =
                    new CSVReader(new InputStreamReader(file.getInputStream()));

            List<String[]> rows = reader.readAll();

            if (!rows.isEmpty()) {
                rows.remove(0);
            }

            return rows;

        } catch (Exception e) {

            throw new RuntimeException("Failed to read CSV file.", e);

        }
    }
}
