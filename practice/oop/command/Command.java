/** oop-06: Command interface with execute/undo. */
public interface Command {
    void execute();
    void undo();
    String describe();
}
