/** oop-05: TODO — Clamp all values to [min, max]. */
public class ThresholdClipStrategy implements ProcessingStrategy {
    private final double min, max;
    public ThresholdClipStrategy(double min, double max) { this.min = min; this.max = max; }
    @Override public double[] process(double[] readings) { return readings; /* TODO */ }
    @Override public String getName() { return "ThresholdClip[" + min + "," + max + "]"; }
}
