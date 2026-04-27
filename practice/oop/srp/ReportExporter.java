/**
 * oop-01: Extract export responsibility here.
 *
 * TODO: Move exportToFile() and exportToConsole() from ReportGenerator.
 *       This class should know HOW to export a string but nothing about
 *       data or formatting.
 */
import java.io.*;

public class ReportExporter {
    public void export (String content, String destination) {
        if ("console".equalsIgnoreCase(destination)) {
            exportToConsole(content);
        } else {
            exportToFile(content, destination);
        }
    }

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
}
