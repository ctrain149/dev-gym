/** net-02: Runnable that handles one client connection in its own thread. */
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
        try (
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true)
        ) {
            String line;
            while ((line = in.readLine()) != null) {
                int count = MultiServer.incrementMessages();
                System.out.println("[Client " + clientId + "] msg #" + count + ": " + line);
                out.println("[" + clientId + "] " + line);
            }
        } catch (IOException e) {
            System.err.println("[Client " + clientId + "] error: " + e.getMessage());
        } finally {
            try { socket.close(); } catch (IOException ignored) {}
            System.out.println("[Client " + clientId + "] disconnected. Total messages: " + MultiServer.getMessageCount());
        }
    }
}
