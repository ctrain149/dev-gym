/** oop-05: TODO — Simplified Kalman filter: blend readings with estimate. */
public class KalmanFilterStrategy implements ProcessingStrategy {
    private final double gain; // 0.0 to 1.0
    public KalmanFilterStrategy(double gain) { this.gain = gain; }
    @Override public double[] process(double[] readings) { return readings; /* TODO */ }
    @Override public String getName() { return "KalmanFilter(gain=" + gain + ")"; }
}
