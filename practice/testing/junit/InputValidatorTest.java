/**
 * tst-01: JUnit 5 tests for InputValidator (from sec-01).
 * TODO: Write at least 10 test methods. Use @Test, @BeforeEach,
 *       @DisplayName, assertEquals, assertThrows, etc.
 */
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class InputValidatorTest {

    @BeforeEach
    void setUp() {
        // TODO: common setup if needed
    }

    @Test
    @DisplayName("validateRange accepts value within range")
    void rangeAcceptsValid() {
        // TODO
    }

    @Test
    @DisplayName("validateRange rejects value above maximum")
    void rangeRejectsAboveMax() {
        // TODO: assertThrows(ValidationException.class, () -> ...)
    }

    @Test
    @DisplayName("validateRange rejects value below minimum")
    void rangeRejectsBelowMin() {
        // TODO
    }

    @Test
    @DisplayName("validateRange accepts exact boundary values")
    void rangeAcceptsBoundary() {
        // TODO: test min and max themselves
    }

    @Test
    @DisplayName("validateString rejects null input")
    void stringRejectsNull() {
        // TODO
    }

    @Test
    @DisplayName("validateString rejects empty input")
    void stringRejectsEmpty() {
        // TODO
    }

    @Test
    @DisplayName("validateString rejects over-length input")
    void stringRejectsOverLength() {
        // TODO
    }

    @Test
    @DisplayName("validateFilePath rejects path traversal")
    void pathRejectsTraversal() {
        // TODO: ../../etc/passwd should be rejected
    }

    @Test
    @DisplayName("validateFilePath rejects absolute paths")
    void pathRejectsAbsolute() {
        // TODO
    }

    @Test
    @DisplayName("validatePattern rejects non-matching input")
    void patternRejectsInvalid() {
        // TODO: sensor ID like "XX-1234" should fail against [A-Z]{3}-[0-9]{4}
    }
}
