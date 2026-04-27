/**
 * oop-02: ReportGenerator depends ONLY on interfaces.
 * TODO: Accept DataSource, Formatter, Exporter via constructor.
 *       The generate() method coordinates all three.
 */
public class ReportGenerator {

    // TODO: constructor injection of DataSource, Formatter, Exporter

    public void generate(String source) {
        // TODO: fetch -> format -> export
    }

    public static void main(String[] args) {
        // TODO: wire together with concrete implementations
    }
}
