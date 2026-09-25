package com.postpartumtracker.backend.config;

import com.postpartumtracker.backend.entity.Mood;
import com.postpartumtracker.backend.entity.PhysicalFeeling;
import com.postpartumtracker.backend.repository.MoodRepository;
import com.postpartumtracker.backend.repository.PhysicalFeelingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initializeData(
            MoodRepository moodRepository,
            PhysicalFeelingRepository physicalFeelingRepository) {

        return args -> {

            List<String> moods = List.of(
                    "HAPPY",
                    "CALM",
                    "OKAY",
                    "SAD",
                    "ANXIOUS",
                    "IRRITABLE",
                    "OVERWHELMED",
                    "SCARED",
                    "CONFUSED",
                    "RESTLESS"
            );

            for (String moodName : moods) {

                if (moodRepository.findByName(moodName).isEmpty()) {
                    moodRepository.save(new Mood(moodName));
                }
            }

            List<String> physicalFeelings = List.of(
                    "TIRED",
                    "BLOATED",
                    "HEADACHE",
                    "RESTLESS",
                    "LOW_APPETITE",
                    "BODY_DISCOMFORT"
            );

            for (String feelingName : physicalFeelings) {

                if (physicalFeelingRepository
                        .findByName(feelingName)
                        .isEmpty()) {

                    physicalFeelingRepository.save(
                            new PhysicalFeeling(feelingName)
                    );
                }
            }
        };
    }
}