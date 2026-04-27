/**
 * oop-04: Alarm system that publishes events to subscribers.
 * TODO: Implement subscribe(), unsubscribe(), checkReading().
 *       checkReading compares value to threshold and fires an AlarmEvent
 *       to all observers if exceeded.
 */
import java.util.*;

public class AlarmSystem {

    private final List<AlarmObserver> observers = new ArrayList<>();
    private final Map<String, Double> thresholds = new HashMap<>();

    public void setThreshold(String sensorType, double threshold) {
        thresholds.put(sensorType, threshold);
    }

    public void subscribe(AlarmObserver observer) {
        // TODO
    }

    public void unsubscribe(AlarmObserver observer) {
        // TODO
    }

    public void checkReading(String sensorType, double value) {
        // TODO: compare to threshold, determine severity, notify observers
    }
}
