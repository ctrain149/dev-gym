/**
 * oop-01: REFACTOR THIS CLASS
 *
 * This "God class" violates the Single Responsibility Principle.
 * It fetches data, formats it, AND exports it — three reasons to change.
 *
 * Your job: Extract DataFetcher, ReportFormatter, and ReportExporter,
 * then make ReportGenerator coordinate between them.
 */
import java.util.*;
import java.io.*;

public class ReportGenerator {

    // ── Problem 1: Data fetching logic ──────────────────────────────
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

    // ── Problem 2: Formatting logic ─────────────────────────────────
    public String formatAsCSV(List<Map<String, Object>> data) {
        StringBuilder sb = new StringBuilder();
        sb.append("Sensor,Value,Timestamp,Status\n");
        for (Map<String, Object> row : data) {
            sb.append(row.get("sensor")).append(",");
            sb.append(row.get("value")).append(",");
            sb.append(row.get("timestamp")).append(",");
            sb.append(row.get("status")).append("\n");
        }
        return sb.toString();
    }

    public String formatAsTable(List<Map<String, Object>> data) {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("%-12s %-10s %-22s %-10s%n", "Sensor", "Value", "Timestamp", "Status"));
        sb.append("-".repeat(56)).append("\n");
        for (Map<String, Object> row : data) {
            sb.append(String.format("%-12s %-10s %-22s %-10s%n",
                row.get("sensor"), row.get("value"),
                row.get("timestamp"), row.get("status")));
        }
        return sb.toString();
    }

    // ── Problem 3: Export logic ─────────────────────────────────────
    public void exportToFile(String content, String filename) {
        try (FileWriter fw = new FileWriter(filename)) {
            fw.write(content);
            System.out.println("Exported to " + filename);
        } catch (IOException e) {
            System.err.println("Failed to export: " + e.getMessage());
        }
    }

    public void exportToConsole(String content) {
        System.out.println("=== REPORT ===");
        System.out.println(content);
        System.out.println("=== END ===");
    }

    // ── This method does EVERYTHING ─────────────────────────────────
    public void generateReport(String source, String format, String destination) {
        List<Map<String, Object>> data = fetchSensorData(source);

        String content;
        if ("csv".equalsIgnoreCase(format)) {
            content = formatAsCSV(data);
        } else {
            content = formatAsTable(data);
        }

        if ("console".equalsIgnoreCase(destination)) {
            exportToConsole(content);
        } else {
            exportToFile(content, destination);
        }
    }

    public static void main(String[] args) {
        ReportGenerator gen = new ReportGenerator();
        gen.generateReport("reactor-db", "table", "console");
        gen.generateReport("reactor-db", "csv", "report.csv");
    }
}
