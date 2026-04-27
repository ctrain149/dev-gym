/**
 * oop-01: Extract data fetching responsibility here.
 *
 * TODO: Move fetchSensorData() from ReportGenerator into this class.
 *       This class should know HOW to fetch data but nothing about
 *       formatting or exporting.
 */
import java.util.*;

public class DataFetcher {
    public List<Map<String, Object>> fetchSensorData(String source) {
        List<Map<String, Object>> data = new ArrayList<>();

        // Simulate reading from a sensor database
        Map<String, Object> row1 = new HashMap<>();
        row1.put("sensor", "TEMP-001");
        row1.put("value", 342.5);
        row1.put("timestamp", "2026-04-27T10:00:00");
        row1.put("status", "NORMAL");
        data.add(row1);

        Map<String, Object> row2 = new HashMap<>();
        row2.put("sensor", "PRES-002");
        row2.put("value", 155.3);
        row2.put("timestamp", "2026-04-27T10:00:01");
        row2.put("status", "WARNING");
        data.add(row2);

        Map<String, Object> row3 = new HashMap<>();
        row3.put("sensor", "FLOW-003");
        row3.put("value", 12.7);
        row3.put("timestamp", "2026-04-27T10:00:02");
        row3.put("status", "CRITICAL");
        data.add(row3);

        System.out.println("Fetched " + data.size() + " readings from " + source);
        return data;
    }
}
