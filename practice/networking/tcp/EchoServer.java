/**
 * net-01: TCP Echo Server.
 * Listens on port 9000, accepts a client, echoes back every line.
 */
import java.net.*;
import java.io.*;

public class EchoServer {
    public static void main(String[] args) throws IOException {
        int port = 9000;
        System.out.println("Echo server starting on port " + port + "...");

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            while (true) {
                Socket client = serverSocket.accept();
                System.out.println("Client connected: " + client.getRemoteSocketAddress());

                try (
                    BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
                    PrintWriter out = new PrintWriter(client.getOutputStream(), true)
                ) {
                    String line;
                    while ((line = in.readLine()) != null) {
                        System.out.println("Received: " + line);
                        out.println(line);
                    }
                } finally {
                    System.out.println("Client disconnected: " + client.getRemoteSocketAddress());
                    client.close();
                }
            }
        }
    }
}
