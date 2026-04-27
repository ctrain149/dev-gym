/**
 * oop-06: TODO — Undo/redo stack manager.
 *   execute(cmd) — runs cmd and pushes to undoStack
 *   undo() — pops from undoStack, calls undo(), pushes to redoStack
 *   redo() — pops from redoStack, calls execute(), pushes to undoStack
 */
import java.util.Stack;

public class CommandHistory {
    private final Stack<Command> undoStack = new Stack<>();
    private final Stack<Command> redoStack = new Stack<>();

    public void execute(Command cmd) { /* TODO */ }
    public void undo() { /* TODO */ }
    public void redo() { /* TODO */ }
    public boolean canUndo() { return !undoStack.isEmpty(); }
    public boolean canRedo() { return !redoStack.isEmpty(); }
}
