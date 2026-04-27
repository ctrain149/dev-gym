/**
 * oop-01: Extract formatting responsibility here.
 *
 * TODO: Move formatAsCSV() and formatAsTable() from ReportGenerator.
 *       This class should know HOW to format data but nothing about
 *       where it came from or where it goes.
 */
import java.util.*;

public class ReportFormatter {
    public String format(List<Map<String, Object>> data, String format) {
        if ("csv".equalsIgnoreCase(format)) {
            return formatAsCSV(data);
        } else {
            return formatAsTable(data);
        }
    }

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
}
