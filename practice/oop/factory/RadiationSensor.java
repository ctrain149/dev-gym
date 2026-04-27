/**
 * oop-03: TODO — Implement the Sensor interface.
 * read() should return a simulated radiation level (0-100 mSv range + noise).
 */
public class RadiationSensor implements Sensor {
    @Override public double read() { return 0; }
    @Override public void calibrate() {}
    @Override public String getType() { return "radiation"; }
}
