/**
 * sec-04: Password hashing with bcrypt (or PBKDF2).
 * TODO: Implement hashPassword() and verifyPassword().
 *       NEVER store plaintext. Use a per-user random salt.
 */
import java.security.*;
import java.security.spec.*;
import javax.crypto.*;
import javax.crypto.spec.*;
import java.util.Base64;

public class AuthService {

    private static final int ITERATIONS = 600_000;
    private static final int KEY_LENGTH = 256;
    private static final int SALT_LENGTH = 16;

    public String hashPassword(String password) {
        // TODO: generate random salt, PBKDF2, return "salt:hash" in Base64
        return "";
    }

    public boolean verifyPassword(String password, String stored) {
        // TODO: extract salt from stored, hash password with same salt, compare
        return false;
    }

    private byte[] generateSalt() {
        byte[] salt = new byte[SALT_LENGTH];
        new SecureRandom().nextBytes(salt);
        return salt;
    }
}
