/** oop-05: TODO — Average each value with its N neighbors. */
public class MovingAverageStrategy implements ProcessingStrategy {
    private final int windowSize;
    public MovingAverageStrategy(int windowSize) { this.windowSize = windowSize; }
    @Override public double[] process(double[] readings) { return readings; /* TODO */ }
    @Override public String getName() { return "MovingAverage(window=" + windowSize + ")"; }
}
