package com.example.wipro.lalitha.mongo.mappers;

import com.example.wipro.lalitha.dto.MedicalRecordDTO;
import com.example.wipro.lalitha.dto.MedicineDTO;
import com.example.wipro.lalitha.mongo.documents.MedicalRecordDocument;
import com.example.wipro.lalitha.mongo.documents.MedicineDocument;
import java.util.stream.Collectors;

public class MedicalRecordMongoMapper {

    public static MedicalRecordDTO toDTO(MedicalRecordDocument doc) {
        if (doc == null) return null;
        MedicalRecordDTO dto = new MedicalRecordDTO();
        dto.setId(doc.getId());
        dto.setDescription(doc.getDescription());
        dto.setIssue(doc.getIssue());
        dto.setDoctorName(doc.getDoctorName());
        dto.setTreatedAt(doc.getTreatedAt());
        dto.setMedicines(doc.getMedicines() == null ? null :
            doc.getMedicines().stream()
                .map(MedicalRecordMongoMapper::toMedicineDTO)
                .collect(Collectors.toList()));
        return dto;
    }

    public static MedicalRecordDocument toDocument(MedicalRecordDTO dto) {
        if (dto == null) return null;
        MedicalRecordDocument doc = new MedicalRecordDocument();
        doc.setId(dto.getId());
        doc.setPatientId(dto.getPatientId());  // you need to add patientId in DTO
        doc.setDescription(dto.getDescription());
        doc.setIssue(dto.getIssue());
        doc.setDoctorName(dto.getDoctorName());
        doc.setTreatedAt(dto.getTreatedAt());
        doc.setMedicines(dto.getMedicines() == null ? null :
            dto.getMedicines().stream()
                .map(MedicalRecordMongoMapper::toMedicineDocument)
                .collect(Collectors.toList()));
        return doc;
    }

    private static MedicineDTO toMedicineDTO(MedicineDocument md) {
        MedicineDTO dto = new MedicineDTO();
        dto.setName(md.getName());
        dto.setQuantity(md.getQuantity());
        dto.setTime(md.getTime());
        return dto;
    }

    private static MedicineDocument toMedicineDocument(MedicineDTO dto) {
        MedicineDocument md = new MedicineDocument();
        md.setName(dto.getName());
        md.setQuantity(dto.getQuantity());
        md.setTime(dto.getTime());
        return md;
    }
}
