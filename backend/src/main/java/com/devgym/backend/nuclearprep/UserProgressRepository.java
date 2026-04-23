package com.devgym.backend.nuclearprep;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {

    List<UserProgress> findByUserId(Long userId);

    Optional<UserProgress> findByUserIdAndStudyModuleId(Long userId, Long studyModuleId);

    Optional<UserProgress> findByUserIdAndQuizQuestionId(Long userId, Long quizQuestionId);

    Optional<UserProgress> findByUserIdAndCodingExerciseId(Long userId, Long codingExerciseId);

    long countByUserIdAndIsCompletedTrue(Long userId);
}
