package com.devgym.backend.nuclearprep;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "study_modules")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ModuleCategory category;

    @Column(length = 2000)
    private String description;

    @Column(length = 5000)
    private String content;

    @Column(name = "estimated_minutes")
    private Integer estimatedMinutes;

    @Column(name = "difficulty_level")
    @Enumerated(EnumType.STRING)
    private DifficultyLevel difficultyLevel;

    @OneToMany(mappedBy = "studyModule", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuizQuestion> quizQuestions;

    @Column(name = "order_index")
    private Integer orderIndex;

    public enum ModuleCategory {
        NRC_REGULATIONS("NRC Regulations (10 CFR)"),
        IEEE_STANDARDS("IEEE Software Standards"),
        SECURE_CODING("Secure Coding Practices"),
        NETWORK_PROGRAMMING("Socket/TCP/UDP Programming"),
        NUCLEAR_DESIGN("Nuclear Applications Functional Design"),
        TOOLS("Tools & Troubleshooting"),
        DOCUMENTATION("Documentation & Specifications");

        private final String displayName;

        ModuleCategory(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum DifficultyLevel {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}
