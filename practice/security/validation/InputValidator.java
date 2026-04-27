/**
 * sec-01: Input validation utility.
 * TODO: Implement validateRange, validateString, validateFilePath.
 *       All methods should throw ValidationException on failure
 *       and return the validated value on success (fluent pattern).
 */
public class InputValidator {

    public static double validateRange(double value, double min, double max, String fieldName) {
        // TODO: throw if out of range with descriptive message
        return value;
    }

    public static String validateString(String input, int maxLength, String fieldName) {
        // TODO: reject null, empty, over-length
        return input;
    }

    public static String validateFilePath(String path, String allowedBaseDir) {
        // TODO: reject path traversal (..), absolute paths, ~
        return path;
    }

    public static String validatePattern(String input, String regex, String fieldName) {
        // TODO: reject if input doesn't match regex (whitelist approach)
        return input;
    }
}
