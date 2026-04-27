/**
 * sec-05: Wrapper that prevents accidental logging of secrets.
 * TODO: Override toString() to return "****", provide getValue() for authorized access.
 */
public class SensitiveString {
    private final String value;

    public SensitiveString(String value) { this.value = value; }
    public String getValue() { return value; }

    @Override
    public String toString() {
        // TODO: return masked value, not the real one
        return value; // BUG: this exposes the secret in logs!
    }
}
