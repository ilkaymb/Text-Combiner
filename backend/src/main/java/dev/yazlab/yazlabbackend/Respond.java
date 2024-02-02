package dev.yazlab.yazlabbackend;

import java.util.List;

public class Respond {

    public String getMergedString() {
        return mergedString;
    }

    public void setMergedString(String mergedString) {
        this.mergedString = mergedString;
    }

    public List<Integer> getNoMerge() {
        return noMerge;
    }

    public void setNoMerge(List<Integer> noMerge) {
        this.noMerge = noMerge;
    }

    public String getCalculatedTime() {
        return calculatedTime;
    }

    public void setCalculatedTime(String calculatedTime) {
        this.calculatedTime = calculatedTime;
    }

    public Respond(String mergedString, List<Integer> noMerge, String calculatedTime) {
        this.mergedString = mergedString;
        this.noMerge = noMerge;
        this.calculatedTime = calculatedTime;
    }

    public Respond() {
    }

    private String mergedString;
    private List<Integer> noMerge;

    private String calculatedTime;




}
