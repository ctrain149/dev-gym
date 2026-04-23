package com.devgym.backend.nuclearprep;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyModuleRepository extends JpaRepository<StudyModule, Long> {

    List<StudyModule> findByCategoryOrderByOrderIndexAsc(StudyModule.ModuleCategory category);

    List<StudyModule> findAllByOrderByOrderIndexAsc();

    List<StudyModule> findByDifficultyLevel(StudyModule.DifficultyLevel difficultyLevel);
}
