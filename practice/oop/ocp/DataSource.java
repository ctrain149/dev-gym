/**
 * oop-02: Define the DataSource abstraction.
 * TODO: Declare a method that returns sensor data.
 */
import java.util.*;

public interface DataSource {
    List<Map<String, Object>> fetch(String source);
}
