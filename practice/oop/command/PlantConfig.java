/** oop-06: Mutable plant configuration — the target of commands. */
import java.util.*;

public class PlantConfig {
    private final Map<String, Object> params = new HashMap<>();

    public void set(String key, Object value) { params.put(key, value); }
    public Object get(String key) { return params.get(key); }
    public Map<String, Object> getAll() { return Collections.unmodifiableMap(params); }

    @Override
    public String toString() { return params.toString(); }
}
