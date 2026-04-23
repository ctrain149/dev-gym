package com.devgym.backend.nuclearprep;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_progress")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_module_id")
    private StudyModule studyModule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_question_id")
    private QuizQuestion quizQuestion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coding_exercise_id")
    private CodingExercise codingExercise;

    @Column(name = "is_completed")
    private Boolean isCompleted;

    @Column(name = "score")
    private Integer score;

    @Column(name = "attempts")
    private Integer attempts;

    @Column(name = "time_spent_minutes")
    private Integer timeSpentMinutes;

    @Column(name = "last_attempt_at")
    private LocalDateTime lastAttemptAt;

    @Column(name = "user_answer", length = 1000)
    private String userAnswer;

    @Column(name = "notes", length = 1000)
    private String notes;
}
