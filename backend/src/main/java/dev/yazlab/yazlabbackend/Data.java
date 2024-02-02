package dev.yazlab.yazlabbackend;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

@Document(collection = "data")
public class Data {

    @Id
    private String id;

    private String[] inputText;

    private String combinedText;

    private String calculatedTime;

    public Data(String[] inputText, String combinedText, String calculatedTime) {
        this.inputText = inputText;
        this.combinedText = combinedText;
        this.calculatedTime = calculatedTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String[] getInputText() {
        return inputText;
    }

    public void setInputText(String[] inputText) {
        this.inputText = inputText;
    }

    public String getCombinedText() {
        return combinedText;
    }

    public void setCombinedText(String combinedText) {
        this.combinedText = combinedText;
    }

    public String getCalculatedTime() {
        return calculatedTime;
    }

    public void setCalculatedTime(String calculatedTime) {
        this.calculatedTime = calculatedTime;
    }

    @Override
    public String toString() {
        return "Data{" +
                "id='" + id + '\'' +
                ", inputText=" + Arrays.toString(inputText) +
                ", combinedText='" + combinedText + '\'' +
                ", calculatedTime='" + calculatedTime + '\'' +
                '}';
    }
}