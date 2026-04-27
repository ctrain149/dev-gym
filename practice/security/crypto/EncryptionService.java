/**
 * sec-03: AES-256-GCM encryption with PBKDF2 key derivation.
 * TODO: Implement encrypt(plaintext, passphrase) and decrypt(ciphertext, passphrase).
 */
import javax.crypto.*;
import javax.crypto.spec.*;
import java.security.*;
import java.security.spec.*;
import java.util.Base64;
import static java.nio.charset.StandardCharsets.UTF_8;

public class EncryptionService {
    private static final int IV_LENGTH = 12;
    private static final int SALT_LENGTH = 16;
    private static final int KEY_LENGTH = 256;
    private static final int ITERATIONS = 600_000;
    private static final int GCM_TAG_LENGTH = 128;

    public String encrypt(String plaintext, String passphrase) {
        // TODO: generate salt + IV, derive key with PBKDF2, encrypt with AES/GCM/NoPadding
        // Output: Base64(salt + IV + ciphertext)
        return "";
    }

    public String decrypt(String ciphertext, String passphrase) {
        // TODO: decode Base64, extract salt + IV + ciphertext, derive key, decrypt
        return "";
    }

    private SecretKey deriveKey(String passphrase, byte[] salt) throws Exception {
        // TODO: PBKDF2WithHmacSHA256 key derivation
        return null;
    }
}
