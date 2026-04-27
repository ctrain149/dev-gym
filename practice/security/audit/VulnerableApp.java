/**
 * sec-06: THIS CODE HAS 8 SECURITY VULNERABILITIES.
 *
 * Your job: Find all 8, document them in SecurityAuditReport.md,
 * and create FixedApp.java with all issues resolved.
 *
 * Hint categories: SQL injection, path traversal, hardcoded credentials,
 * missing validation, insecure deserialization, weak crypto, sensitive
 * data exposure, missing error handling.
 */
import java.io.*;
import java.security.*;
import java.sql.*;
import java.util.*;

public class VulnerableApp {

    // ── Vulnerability 1: Hardcoded credentials ──────────────────────
    private static final String DB_USER = "admin";
    private static final String DB_PASS = "Sup3rS3cret!";
    private static final String API_KEY = "sk-abc123def456ghi789";

    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection(
            "jdbc:h2:mem:plantdb", DB_USER, DB_PASS);
    }

    // ── Vulnerability 2: SQL injection ──────────────────────────────
    public List<String> searchSensors(String userInput) throws SQLException {
        Connection conn = getConnection();
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(
            "SELECT name FROM sensors WHERE type = '" + userInput + "'");
        List<String> results = new ArrayList<>();
        while (rs.next()) results.add(rs.getString("name"));
        return results;
    }

    // ── Vulnerability 3: Path traversal ─────────────────────────────
    public String readConfigFile(String filename) throws IOException {
        File file = new File("/config/" + filename);
        return new String(java.nio.file.Files.readAllBytes(file.toPath()));
    }

    // ── Vulnerability 4: Missing input validation ───────────────────
    public void setTemperatureThreshold(String value) throws SQLException {
        double threshold = Double.parseDouble(value); // no range check
        Connection conn = getConnection();
        Statement stmt = conn.createStatement();
        stmt.executeUpdate(
            "UPDATE thresholds SET value = " + threshold + " WHERE name = 'max_temp'");
    }

    // ── Vulnerability 5: Weak cryptography ──────────────────────────
    public String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] hash = md.digest(password.getBytes());
        StringBuilder sb = new StringBuilder();
        for (byte b : hash) sb.append(String.format("%02x", b));
        return sb.toString();
    }

    // ── Vulnerability 6: Sensitive data exposure in logs ────────────
    public boolean authenticate(String username, String password) {
        System.out.println("Login attempt: user=" + username + " password=" + password);
        try {
            Connection conn = getConnection();
            String hash = hashPassword(password);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(
                "SELECT * FROM users WHERE username = '" + username
                + "' AND password_hash = '" + hash + "'");
            return rs.next();
        } catch (Exception e) {
            // Vulnerability 7: swallowed exception
            return false;
        }
    }

    // ── Vulnerability 7: Missing error handling (empty catch) ───────
    public void processData(byte[] rawData) {
        try {
            String data = new String(rawData);
            double value = Double.parseDouble(data);
            // do something with value
        } catch (Exception e) {
            // silently swallowed — no logging, no re-throw, nothing
        }
    }

    // ── Vulnerability 8: Insecure deserialization ───────────────────
    public Object loadConfig(String filepath) throws Exception {
        FileInputStream fis = new FileInputStream(filepath);
        ObjectInputStream ois = new ObjectInputStream(fis);
        Object config = ois.readObject(); // arbitrary object deserialization
        ois.close();
        return config;
    }

    public static void main(String[] args) throws Exception {
        VulnerableApp app = new VulnerableApp();

        // Demonstrate the vulnerabilities
        System.out.println("API Key: " + API_KEY); // exposes key
        app.authenticate("admin", "password123");    // logs password
        app.searchSensors("temp' OR '1'='1");        // SQL injection
        app.readConfigFile("../../etc/passwd");       // path traversal
    }
}
