package com.devgym.backend.nuclearprep;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "quiz_questions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_module_id", nullable = false)
    private StudyModule studyModule;

    @Column(nullable = false, length = 1000)
    private String question;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private QuestionType questionType;

    @ElementCollection
    @CollectionTable(name = "quiz_options", joinColumns = @JoinColumn(name = "quiz_question_id"))
    @Column(name = "option_text")
    private List<String> options;

    @Column(name = "correct_answer_index")
    private Integer correctAnswerIndex;

    @Column(name = "correct_answer_text", length = 1000)
    private String correctAnswerText;

    @Column(length = 2000)
    private String explanation;

    @Column(name = "is_flashcard")
    private Boolean isFlashcard;

    public enum QuestionType {
        MULTIPLE_CHOICE,
        TRUE_FALSE,
        SHORT_ANSWER,
        FLASHCARD
    }
}
