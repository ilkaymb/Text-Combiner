package dev.yazlab.yazlabbackend;

public class CombineRequest {
    public String[] getStrings() {
        return strings;
    }

    public void setStrings(String[] strings) {
        this.strings = strings;
    }

    public int getPercent() {
        return percent;
    }

    public void setPercent(int percent) {
        this.percent = percent;
    }

    public CombineRequest(String[] strings, int percent) {
        this.strings = strings;
        this.percent = percent;
    }

    public CombineRequest() {
    }

    private String[] strings;


    private int percent;



}