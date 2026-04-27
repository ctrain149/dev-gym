/**
 * net-02: Test client for MultiServer.
 * Connects, sends a few messages, and disconnects.
 */
import java.net.*;
import java.io.*;

public class MultiClient {
    public static void main(String[] args) throws IOException {
        String host = "localhost";
        int port = 9000;

        try (
            Socket socket = new Socket(host, port);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader stdin = new BufferedReader(new InputStreamReader(System.in))
        ) {
            System.out.println("Connected to multi-server at " + host + ":" + port);
            System.out.println("Type messages (Ctrl+D to quit):");

            String line;
            while ((line = stdin.readLine()) != null) {
                out.println(line);
                String response = in.readLine();
                System.out.println("Server: " + response);
            }
        }
        System.out.println("Disconnected.");
    }
}
