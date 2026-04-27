/**
 * sec-02: Sets up an in-memory H2 database with a sensors table.
 * Compile with H2 jar on classpath: javac -cp h2.jar DatabaseSetup.java
 */
import java.sql.*;

public class DatabaseSetup {
    public static Connection createDatabase() throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1");
        Statement stmt = conn.createStatement();
        stmt.execute("""
            CREATE TABLE IF NOT EXISTS sensors (
                id INT AUTO_INCREMENT PRIMARY KEY,
                type VARCHAR(50) NOT NULL,
                value DOUBLE NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                location VARCHAR(100)
            )
        """);
        return conn;
    }
}
