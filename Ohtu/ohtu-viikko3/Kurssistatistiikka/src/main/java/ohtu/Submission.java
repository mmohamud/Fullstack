package ohtu;

import java.util.ArrayList;
import java.util.List;

public class Submission {
    private int week;
    private int hours;
    private List<String> exercises;
    private String course;
    

    public void setWeek(int week) {
        this.week = week;
    }

    public int getWeek() {
        return week;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getCourse() {
        return course;
    }

    public void setHours(int hours) {
        this.hours = hours;        
    }
    public int getNumberOfEXercises () {
        return exercises.size();
    }

    public int getHours() {
        return hours;
    }


    public void setExercises(ArrayList exercises) {
        this.exercises = exercises;
    }

    public String getExercises() {
        String exe = exercises.toString();
        exe = exe.substring(1, exe.length()-1);
        return exe;       
    }


    @Override
    public String toString() {
        return course + ", viikko " + week + " tehtyjä tehtäviä yhteensä " + exercises.size() + " aikaa kului " + hours + " tehdyt tehtävät: " + getExercises();
    }
    
}