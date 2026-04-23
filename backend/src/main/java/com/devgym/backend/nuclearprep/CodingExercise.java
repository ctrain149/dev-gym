package com.devgym.backend.nuclearprep;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "coding_exercises")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CodingExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ExerciseCategory category;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(name = "starter_code", length = 5000)
    private String starterCode;

    @Column(name = "solution_code", length = 5000)
    private String solutionCode;

    @Column(name = "test_cases", length = 3000)
    private String testCases;

    @Column(length = 2000)
    private String hints;

    @Column(name = "difficulty_level")
    @Enumerated(EnumType.STRING)
    private StudyModule.DifficultyLevel difficultyLevel;

    @Column(name = "time_limit_minutes")
    private Integer timeLimitMinutes;

    @Column(name = "is_interactive")
    private Boolean isInteractive;

    public enum ExerciseCategory {
        SOCKET_PROGRAMMING("Socket Programming (TCP/UDP)"),
        SECURE_CODE_REVIEW("Secure Code Review"),
        WIN32_API("Win32 API Programming"),
        THREADING("Threading & Concurrency"),
        ERROR_HANDLING("Error Handling & Logging"),
        MEMORY_MANAGEMENT("Memory Management");

        private final String displayName;

        ExerciseCategory(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
}
