/** oop-06: TODO — Set a parameter on PlantConfig, store previous value for undo. */
public class SetParameterCommand implements Command {
    // TODO: fields for target config, param name, new value, old value
    // TODO: implement execute(), undo(), describe()

    public SetParameterCommand(PlantConfig config, String paramName, Object newValue) {
        // TODO
    }

    @Override public void execute() { /* TODO */ }
    @Override public void undo() { /* TODO */ }
    @Override public String describe() { return "TODO"; }
}
