/**
 * sec-05: Secure configuration manager.
 * TODO: Load config from encrypted file or env vars.
 *       Wrap all secrets in SensitiveString.
 *       Provide typed getters: getDbUrl(), getApiKey(), etc.
 */
import java.util.*;

public class SecureConfig {

    private final Map<String, SensitiveString> secrets = new HashMap<>();

    public SecureConfig() {
        // TODO: load from environment variables (System.getenv)
        //       or from encrypted properties file
    }

    public SensitiveString get(String key) {
        SensitiveString val = secrets.get(key);
        if (val == null) throw new IllegalStateException("Missing config: " + key);
        return val;
    }

    public String getDbUrl() {
        // TODO: return non-sensitive DB URL
        return "";
    }

    public SensitiveString getDbPassword() {
        return get("DB_PASSWORD");
    }

    public SensitiveString getApiKey() {
        return get("API_KEY");
    }
}
