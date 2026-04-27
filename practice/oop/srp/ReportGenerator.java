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

public class ReportGenerator {
    public void generateReport(String source, String format, String destination) {
        DataFetcher fetcher = new DataFetcher();
        ReportFormatter formatter = new ReportFormatter();
        ReportExporter exporter = new ReportExporter();
        List<Map<String, Object>> data = fetcher.fetchSensorData(source);
        String content = formatter.format(data, format);

        exporter.export(content, destination);
    }

    public static void main(String[] args) {
        ReportGenerator gen = new ReportGenerator();

        gen.generateReport("reactor-db", "table", "console");
        gen.generateReport("reactor-db", "csv", "report.csv");
    }
}
