/**
 * net-02: Multi-threaded TCP server.
 * Uses ExecutorService to handle multiple clients simultaneously.
 */
import java.net.*;
import java.io.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

public class MultiServer {
    private static final AtomicInteger messageCount = new AtomicInteger(0);
    private static final AtomicInteger clientIdGen = new AtomicInteger(0);

    public static void main(String[] args) throws IOException {
        ExecutorService pool = Executors.newFixedThreadPool(10);
        int port = 9000;

        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Multi-server listening on port " + port);
            while (true) {
                Socket client = serverSocket.accept();
                int clientId = clientIdGen.incrementAndGet();
                System.out.println("[Client " + clientId + "] connected from " + client.getRemoteSocketAddress());
                pool.submit(new ClientHandler(client, clientId));
            }
        }
    }

    public static int getMessageCount() { return messageCount.get(); }
    public static int incrementMessages() { return messageCount.incrementAndGet(); }
}
