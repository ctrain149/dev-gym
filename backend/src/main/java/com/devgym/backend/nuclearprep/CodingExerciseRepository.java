package com.devgym.backend.nuclearprep;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodingExerciseRepository extends JpaRepository<CodingExercise, Long> {

    List<CodingExercise> findByCategory(CodingExercise.ExerciseCategory category);

    List<CodingExercise> findByDifficultyLevel(StudyModule.DifficultyLevel difficultyLevel);
}
