package dev.yazlab.yazlabbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class DataService {

    @Autowired
    private DataRepository dataRepository;

    public void insertData(String[] inputText, String combinedText, String calculatedTime) {
        try {
            Data data = new Data(inputText, combinedText, calculatedTime);
            dataRepository.insert(data);
        } catch (Exception e) {
            // Handle the exception
        }
    }
}