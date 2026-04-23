package com.devgym.backend.nuclearprep;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

    List<QuizQuestion> findByStudyModuleId(Long studyModuleId);

    List<QuizQuestion> findByStudyModuleCategory(StudyModule.ModuleCategory category);

    List<QuizQuestion> findByIsFlashcardTrue();
}
