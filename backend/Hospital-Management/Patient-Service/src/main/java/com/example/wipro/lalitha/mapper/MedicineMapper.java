package com.example.wipro.lalitha.mapper;

import com.example.wipro.lalitha.dto.MedicineDTO;
import com.example.wipro.lalitha.mongo.documents.MedicineDocument;

public class MedicineMapper {

    public static MedicineDTO toDTO(MedicineDocument doc) {
        if (doc == null) return null;
        MedicineDTO dto = new MedicineDTO();
        dto.setName(doc.getName());
        dto.setQuantity(doc.getQuantity());
        dto.setTime(doc.getTime());
        return dto;
    }

    public static MedicineDocument toDocument(MedicineDTO dto) {
        if (dto == null) return null;
        MedicineDocument doc = new MedicineDocument();
        doc.setName(dto.getName());
        doc.setQuantity(dto.getQuantity());
        doc.setTime(dto.getTime());
        return doc;
    }
}
