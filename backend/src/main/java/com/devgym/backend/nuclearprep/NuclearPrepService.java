package com.devgym.backend.nuclearprep;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class NuclearPrepService {

    private final StudyModuleRepository studyModuleRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final CodingExerciseRepository codingExerciseRepository;
    private final UserProgressRepository userProgressRepository;

    // Study Module Methods
    public List<StudyModule> getAllStudyModules() {
        return studyModuleRepository.findAllByOrderByOrderIndexAsc();
    }

    public List<StudyModule> getModulesByCategory(StudyModule.ModuleCategory category) {
        return studyModuleRepository.findByCategoryOrderByOrderIndexAsc(category);
    }

    public Optional<StudyModule> getStudyModuleById(Long id) {
        return studyModuleRepository.findById(id);
    }

    // Quiz Question Methods
    public List<QuizQuestion> getQuestionsByModule(Long moduleId) {
        return quizQuestionRepository.findByStudyModuleId(moduleId);
    }

    public List<QuizQuestion> getFlashcards() {
        return quizQuestionRepository.findByIsFlashcardTrue();
    }

    public List<QuizQuestion> getQuestionsByCategory(StudyModule.ModuleCategory category) {
        return quizQuestionRepository.findByStudyModuleCategory(category);
    }

    public boolean checkAnswer(Long questionId, String userAnswer) {
        Optional<QuizQuestion> questionOpt = quizQuestionRepository.findById(questionId);
        if (questionOpt.isEmpty()) return false;

        QuizQuestion question = questionOpt.get();
        return switch (question.getQuestionType()) {
            case MULTIPLE_CHOICE, TRUE_FALSE -> {
                try {
                    int selectedIndex = Integer.parseInt(userAnswer);
                    yield selectedIndex == question.getCorrectAnswerIndex();
                } catch (NumberFormatException e) {
                    yield false;
                }
            }
            case SHORT_ANSWER -> userAnswer.trim().equalsIgnoreCase(
                question.getCorrectAnswerText().trim()
            );
            case FLASHCARD -> true; // Flashcards don't have right/wrong
        };
    }

    // Coding Exercise Methods
    public List<CodingExercise> getAllCodingExercises() {
        return codingExerciseRepository.findAll();
    }

    public List<CodingExercise> getExercisesByCategory(CodingExercise.ExerciseCategory category) {
        return codingExerciseRepository.findByCategory(category);
    }

    public Optional<CodingExercise> getCodingExerciseById(Long id) {
        return codingExerciseRepository.findById(id);
    }

    // Progress Methods
    public List<UserProgress> getUserProgress(Long userId) {
        return userProgressRepository.findByUserId(userId);
    }

    public UserProgress recordModuleCompletion(Long userId, Long moduleId, Integer timeSpent) {
        Optional<UserProgress> existing = userProgressRepository.findByUserIdAndStudyModuleId(userId, moduleId);
        UserProgress progress;

        if (existing.isPresent()) {
            progress = existing.get();
            progress.setAttempts(progress.getAttempts() + 1);
        } else {
            progress = UserProgress.builder()
                .userId(userId)
                .studyModule(studyModuleRepository.findById(moduleId).orElse(null))
                .attempts(1)
                .build();
        }

        progress.setIsCompleted(true);
        progress.setTimeSpentMinutes(timeSpent);
        progress.setLastAttemptAt(LocalDateTime.now());

        return userProgressRepository.save(progress);
    }

    public UserProgress recordQuizAttempt(Long userId, Long questionId, String answer, boolean isCorrect) {
        Optional<UserProgress> existing = userProgressRepository.findByUserIdAndQuizQuestionId(userId, questionId);
        UserProgress progress;

        if (existing.isPresent()) {
            progress = existing.get();
            progress.setAttempts(progress.getAttempts() + 1);
        } else {
            progress = UserProgress.builder()
                .userId(userId)
                .quizQuestion(quizQuestionRepository.findById(questionId).orElse(null))
                .attempts(1)
                .build();
        }

        progress.setUserAnswer(answer);
        progress.setScore(isCorrect ? 100 : 0);
        progress.setIsCompleted(isCorrect);
        progress.setLastAttemptAt(LocalDateTime.now());

        return userProgressRepository.save(progress);
    }

    public UserProgress recordCodingAttempt(Long userId, Long exerciseId, boolean passed, String notes) {
        Optional<UserProgress> existing = userProgressRepository.findByUserIdAndCodingExerciseId(userId, exerciseId);
        UserProgress progress;

        if (existing.isPresent()) {
            progress = existing.get();
            progress.setAttempts(progress.getAttempts() + 1);
        } else {
            progress = UserProgress.builder()
                .userId(userId)
                .codingExercise(codingExerciseRepository.findById(exerciseId).orElse(null))
                .attempts(1)
                .build();
        }

        progress.setIsCompleted(passed);
        progress.setScore(passed ? 100 : 0);
        progress.setNotes(notes);
        progress.setLastAttemptAt(LocalDateTime.now());

        return userProgressRepository.save(progress);
    }

    public ProgressSummary getProgressSummary(Long userId) {
        List<UserProgress> allProgress = userProgressRepository.findByUserId(userId);

        long completedModules = allProgress.stream()
            .filter(p -> p.getStudyModule() != null && Boolean.TRUE.equals(p.getIsCompleted()))
            .count();

        long completedQuizzes = allProgress.stream()
            .filter(p -> p.getQuizQuestion() != null && Boolean.TRUE.equals(p.getIsCompleted()))
            .count();

        long completedExercises = allProgress.stream()
            .filter(p -> p.getCodingExercise() != null && Boolean.TRUE.equals(p.getIsCompleted()))
            .count();

        long totalStudyTime = allProgress.stream()
            .mapToInt(p -> p.getTimeSpentMinutes() != null ? p.getTimeSpentMinutes() : 0)
            .sum();

        return ProgressSummary.builder()
            .completedModules((int) completedModules)
            .completedQuizzes((int) completedQuizzes)
            .completedExercises((int) completedExercises)
            .totalStudyTimeMinutes((int) totalStudyTime)
            .build();
    }

    // DTO for progress summary
    @lombok.Builder
    @lombok.Data
    public static class ProgressSummary {
        private int completedModules;
        private int completedQuizzes;
        private int completedExercises;
        private int totalStudyTimeMinutes;
    }
}
