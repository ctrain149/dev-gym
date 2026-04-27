/**
 * oop-03: Common Sensor interface.
 * All sensor types implement this contract.
 */
public interface Sensor {
    double read();
    void calibrate();
    String getType();
}
