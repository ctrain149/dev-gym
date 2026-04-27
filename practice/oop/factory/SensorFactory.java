/**
 * oop-03: Factory that creates Sensor instances by type string.
 *
 * TODO: Implement using a Map<String, Supplier<Sensor>> registry.
 *       SensorFactory.create("temperature") -> new TemperatureSensor()
 *       Adding a new sensor type should require only registration, not
 *       modifying the create() method.
 */
import java.util.*;
import java.util.function.Supplier;

public class SensorFactory {

    private static final Map<String, Supplier<Sensor>> registry = new HashMap<>();

    static {
        // TODO: register sensor types here
    }

    public static Sensor create(String type) {
        // TODO: look up type in registry, throw if unknown
        return null;
    }

    public static void register(String type, Supplier<Sensor> supplier) {
        registry.put(type, supplier);
    }

    public static void main(String[] args) {
        // TODO: create sensors via factory, call read() and calibrate()
    }
}
