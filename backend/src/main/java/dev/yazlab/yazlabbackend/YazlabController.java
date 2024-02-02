package dev.yazlab.yazlabbackend;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api")
public class YazlabController {

    @PostMapping("/combine")
    public Respond combine(@RequestBody CombineRequest request) {

        double startTime = System.nanoTime();

        noMerge.clear();

        String result = "";


        String [] text = request.getStrings();

        int percent = request.getPercent();


        for (int i = 0; i < text.length; i++)
        {
            text[i] = text[i].replaceAll("[^a-zA-Z0-9\\sğüşıöçĞÜŞİÖÇ]", "").toLowerCase();
        }

        String mergeText = mergeStrings(text,percent);



        double endTime = System.nanoTime();

        double passingTime = endTime - startTime;

        String formatTime = (passingTime/ 1000000) + " ms";

        Respond respond = new Respond(mergeText,noMerge,formatTime);

        return respond;

    }
    @Autowired
    private DataService dataService;
    @PostMapping("/data")
    public ResponseEntity<String> insertData(@RequestBody Data request) {
        String[] inputText = request.getInputText();
        String combinedText = request.getCombinedText();
        String calculatedTime = request.getCalculatedTime();

        dataService.insertData(inputText, combinedText, calculatedTime);

        return new ResponseEntity<>("Data inserted successfully", HttpStatus.CREATED);
    }


    public static double findMatchingCharacters(String str1, String str2)
    {
        char[] set1 = str1.toCharArray();
        char[] set2 = str2.toCharArray();

        double equalLetterNumber = 0.0;
        int limit = set1.length <= set2.length ? set1.length : set2.length;
        int maxLength = set1.length >= set2.length ? set1.length : set2.length;

        for (int i = 0; i < limit; i++)
        {
            if (set1[i] == set2[i])
            {
                equalLetterNumber++;
            } else
            {
                break;
            }
        }

        double result = (equalLetterNumber / maxLength) * 100;
        return result;
        }
    public static List<Integer> noMerge = new ArrayList<>();


    public static String mergeStrings(String[] text,int percent)
    {
        String mergeText = text[0];
        String tempText = "";
        for (int i = 1; i < text.length; i++)
        {
            int currentInx = 0;

            boolean equalWordFinder = false;

            String[] text1 = mergeText.split("\\s+");
            String[] text2 = text[i].split("\\s+");

            for (int j = 0; j < text1.length; j++)
            {
                if (findMatchingCharacters(text1[j].toString(), text2[0].toString()) >= percent)
                {
                    currentInx = j;
                    equalWordFinder = true;

                    break;
                }
            }

            if (equalWordFinder)
            {
                for (int j = 0; j < currentInx; j++)
                {
                    tempText += text1[j] + " ";
                }

                mergeText = tempText + text[i];
                currentInx=0;
                equalWordFinder = false;
                tempText = "";
            }
            else
            {
                noMerge.add(i);
            }
        }

        return mergeText;
    }



}
