package com.example.wipro.lalitha.mongo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.wipro.lalitha.mongo.documents.MedicalRecordDocument;
import java.util.List;

public interface MedicalRecordMongoRepository extends MongoRepository<MedicalRecordDocument, String> {
    List<MedicalRecordDocument> findByPatientId(Long patientId);
}
