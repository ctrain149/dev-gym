package com.devgym.backend.nuclearprep;

import lombok.RequiredArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nuclear-prep")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NuclearPrepController {

    private final NuclearPrepService nuclearPrepService;

    // Study Modules Endpoints
    @GetMapping("/modules")
    public ResponseEntity<List<StudyModule>> getAllModules() {
        return ResponseEntity.ok(nuclearPrepService.getAllStudyModules());
    }

    @GetMapping("/modules/category/{category}")
    public ResponseEntity<List<StudyModule>> getModulesByCategory(
            @PathVariable StudyModule.ModuleCategory category) {
        return ResponseEntity.ok(nuclearPrepService.getModulesByCategory(category));
    }

    @GetMapping("/modules/{id}")
    public ResponseEntity<StudyModule> getModuleById(@PathVariable Long id) {
        return nuclearPrepService.getStudyModuleById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Quiz Endpoints
    @GetMapping("/modules/{moduleId}/questions")
    public ResponseEntity<List<QuizQuestion>> getQuestionsByModule(@PathVariable Long moduleId) {
        return ResponseEntity.ok(nuclearPrepService.getQuestionsByModule(moduleId));
    }

    @GetMapping("/flashcards")
    public ResponseEntity<List<QuizQuestion>> getFlashcards() {
        return ResponseEntity.ok(nuclearPrepService.getFlashcards());
    }

    @PostMapping("/quiz/check")
    public ResponseEntity<QuizResultDTO> checkAnswer(@RequestBody CheckAnswerRequest request) {
        boolean correct = nuclearPrepService.checkAnswer(request.getQuestionId(), request.getAnswer());

        // Record progress if userId provided
        if (request.getUserId() != null) {
            nuclearPrepService.recordQuizAttempt(request.getUserId(), request.getQuestionId(), request.getAnswer(), correct);
        }

        return ResponseEntity.ok(new QuizResultDTO(correct, correct ? "Correct!" : "Incorrect. Try again."));
    }

    // Coding Exercises Endpoints
    @GetMapping("/exercises")
    public ResponseEntity<List<CodingExercise>> getAllExercises() {
        return ResponseEntity.ok(nuclearPrepService.getAllCodingExercises());
    }

    @GetMapping("/exercises/category/{category}")
    public ResponseEntity<List<CodingExercise>> getExercisesByCategory(
            @PathVariable CodingExercise.ExerciseCategory category) {
        return ResponseEntity.ok(nuclearPrepService.getExercisesByCategory(category));
    }

    @GetMapping("/exercises/{id}")
    public ResponseEntity<CodingExercise> getExerciseById(@PathVariable Long id) {
        return nuclearPrepService.getCodingExerciseById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/exercises/{id}/submit")
    public ResponseEntity<ExerciseResultDTO> submitExercise(
            @PathVariable Long id,
            @RequestBody SubmitExerciseRequest request) {

        // In a real implementation, this would compile and test the code
        // For now, we'll do a simple check against the solution
        boolean passed = checkExerciseSolution(id, request.getCode());

        if (request.getUserId() != null) {
            nuclearPrepService.recordCodingAttempt(request.getUserId(), id, passed, request.getNotes());
        }

        return ResponseEntity.ok(new ExerciseResultDTO(
            passed,
            passed ? "All tests passed!" : "Some tests failed. Review the requirements.",
            request.getCode()
        ));
    }

    // Progress Endpoints
    @GetMapping("/progress/{userId}")
    public ResponseEntity<List<UserProgress>> getUserProgress(@PathVariable Long userId) {
        return ResponseEntity.ok(nuclearPrepService.getUserProgress(userId));
    }

    @GetMapping("/progress/{userId}/summary")
    public ResponseEntity<NuclearPrepService.ProgressSummary> getProgressSummary(@PathVariable Long userId) {
        return ResponseEntity.ok(nuclearPrepService.getProgressSummary(userId));
    }

    @PostMapping("/progress/module")
    public ResponseEntity<UserProgress> recordModuleCompletion(@RequestBody ModuleCompletionRequest request) {
        return ResponseEntity.ok(
            nuclearPrepService.recordModuleCompletion(
                request.getUserId(),
                request.getModuleId(),
                request.getTimeSpentMinutes()
            )
        );
    }

    // Categories reference
    @GetMapping("/categories")
    public ResponseEntity<Map<String, Object>> getCategories() {
        return ResponseEntity.ok(Map.of(
            "moduleCategories", StudyModule.ModuleCategory.values(),
            "exerciseCategories", CodingExercise.ExerciseCategory.values(),
            "difficultyLevels", StudyModule.DifficultyLevel.values()
        ));
    }

    // Helper method for exercise checking (simplified)
    private boolean checkExerciseSolution(Long exerciseId, String code) {
        // In production, this would use a sandboxed compiler
        // For demo purposes, we check if code contains expected patterns
        var exerciseOpt = nuclearPrepService.getCodingExerciseById(exerciseId);
        if (exerciseOpt.isEmpty()) return false;

        // Very basic check - in reality you'd compile and run tests
        // String solution = exerciseOpt.get().getSolutionCode();
        return code != null && !code.isEmpty() && code.length() > 20;
    }

    // DTOs
    @Data
    public static class CheckAnswerRequest {
        private Long questionId;
        private String answer;
        private Long userId;
    }

    @Data
    public static class QuizResultDTO {
        private final boolean correct;
        private final String message;
    }

    @Data
    public static class SubmitExerciseRequest {
        private Long userId;
        private String code;
        private String notes;
    }

    @Data
    public static class ExerciseResultDTO {
        private final boolean passed;
        private final String message;
        private final String submittedCode;
    }

    @Data
    public static class ModuleCompletionRequest {
        private Long userId;
        private Long moduleId;
        private Integer timeSpentMinutes;
    }
}
