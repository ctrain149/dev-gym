/**
 * oop-05: TODO — Holds a ProcessingStrategy, delegates to it.
 *                setStrategy() swaps algorithms at runtime.
 */
public class DataProcessor {
    private ProcessingStrategy strategy;

    public DataProcessor(ProcessingStrategy strategy) { this.strategy = strategy; }
    public void setStrategy(ProcessingStrategy strategy) { this.strategy = strategy; }

    public double[] process(double[] readings) {
        // TODO: delegate to strategy
        return readings;
    }

    public static void main(String[] args) {
        // TODO: demo switching strategies mid-stream
    }
}
