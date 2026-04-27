/** net-02: TODO — Runnable that handles one client connection in its own thread. */
import java.net.*;
import java.io.*;

public class ClientHandler implements Runnable {
    private final Socket socket;
    private final int clientId;

    public ClientHandler(Socket socket, int clientId) {
        this.socket = socket;
        this.clientId = clientId;
    }

    @Override
    public void run() {
        // TODO: read lines, echo back, increment message counter, close
    }
}
