/**
 * net-02: Multi-threaded TCP server.
 * TODO: Use ExecutorService to handle multiple clients simultaneously.
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
        // TODO: accept loop, submit ClientHandler for each connection
    }

    public static int getMessageCount() { return messageCount.get(); }
    public static int incrementMessages() { return messageCount.incrementAndGet(); }
}
