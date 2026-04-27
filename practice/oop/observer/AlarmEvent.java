/** oop-04: Immutable event record. */
public record AlarmEvent(String sensorType, double value, double threshold, Severity severity) {
    public enum Severity { WARNING, CRITICAL, EMERGENCY }
}
