/**
 * sec-02: Safe DAO using PreparedStatement.
 * TODO: Implement CRUD with parameterized queries — NO string concatenation.
 */
import java.sql.*;
import java.util.*;

public class SensorDataDAO {
    private final Connection conn;

    public SensorDataDAO(Connection conn) { this.conn = conn; }

    public void insert(String type, double value, String location) throws SQLException {
        // TODO: PreparedStatement with ? placeholders
    }

    public Map<String, Object> findById(int id) throws SQLException {
        // TODO
        return null;
    }

    public List<Map<String, Object>> findByType(String type) throws SQLException {
        // TODO
        return List.of();
    }

    public void updateReading(int id, double newValue) throws SQLException {
        // TODO
    }

    public void delete(int id) throws SQLException {
        // TODO
    }
}
