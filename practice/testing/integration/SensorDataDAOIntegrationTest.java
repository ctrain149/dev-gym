/**
 * tst-04: Integration test for SensorDataDAO against a real H2 database.
 * TODO: Use @BeforeAll to set up the database, @AfterEach to clean tables,
 *       @Test to verify insert/find/update/delete end-to-end.
 */
import org.junit.jupiter.api.*;
import java.sql.*;
import static org.junit.jupiter.api.Assertions.*;

class SensorDataDAOIntegrationTest {

    private static Connection conn;
    private SensorDataDAO dao;

    @BeforeAll
    static void initDb() throws Exception {
        // TODO: conn = DatabaseSetup.createDatabase();
    }

    @BeforeEach
    void setUp() {
        // TODO: dao = new SensorDataDAO(conn);
    }

    @AfterEach
    void cleanUp() throws Exception {
        // TODO: DELETE FROM sensors
    }

    @Test
    @DisplayName("Insert and retrieve sensor reading")
    void insertAndFind() throws Exception {
        // TODO: insert, then findByType, assert returned data matches
    }

    @Test
    @DisplayName("Update sensor reading")
    void updateReading() throws Exception {
        // TODO: insert, update, find, assert new value
    }

    @Test
    @DisplayName("Delete sensor reading")
    void deleteReading() throws Exception {
        // TODO: insert, delete, find returns null
    }

    @Test
    @DisplayName("findByType returns empty list for unknown type")
    void findByTypeEmpty() throws Exception {
        // TODO: assert empty list
    }
}
