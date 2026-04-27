/**
 * oop-03: TODO — Implement the Sensor interface.
 * read() should return a simulated pressure (0-200 bar range + noise).
 */
public class PressureSensor implements Sensor {
    @Override public double read() { return 0; }
    @Override public void calibrate() {}
    @Override public String getType() { return "pressure"; }
}
