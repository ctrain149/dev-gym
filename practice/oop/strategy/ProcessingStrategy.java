/** oop-05: Strategy interface for data processing algorithms. */
public interface ProcessingStrategy {
    double[] process(double[] readings);
    String getName();
}
