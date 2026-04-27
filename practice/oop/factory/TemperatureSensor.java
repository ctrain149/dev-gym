/**
 * oop-03: TODO — Implement the Sensor interface.
 * read() should return a simulated temperature (20-500°C range + noise).
 * calibrate() should reset any offset/drift.
 */
public class TemperatureSensor implements Sensor {
    // TODO: implement
    @Override public double read() { return 0; }
    @Override public void calibrate() {}
    @Override public String getType() { return "temperature"; }
}
