/**
 * net-06: Multi-threaded Port Scanner.
 * Scans ports in parallel, reports open ports with latency.
 */
import java.net.*;
import java.io.*;
import java.util.concurrent.*;
import java.util.*;

public class PortScanner {
    public static void main(String[] args) throws Exception {
        String host = "localhost";
        int startPort = 1, endPort = 1024, timeout = 200;

        System.out.println("Scanning " + host + " ports " + startPort + "-" + endPort + "...");
        long startTime = System.currentTimeMillis();

        ExecutorService pool = Executors.newFixedThreadPool(50);
        List<Future<String>> futures = new ArrayList<>();

        for (int port = startPort; port <= endPort; port++) {
            final int p = port;
            futures.add(pool.submit(() -> {
                long t0 = System.nanoTime();
                try (Socket s = new Socket()) {
                    s.connect(new InetSocketAddress(host, p), timeout);
                    long latency = (System.nanoTime() - t0) / 1_000_000;
                    return String.format("  Port %-5d  OPEN   %dms", p, latency);
                } catch (IOException e) {
                    return null; // closed
                }
            }));
        }

        int openCount = 0;
        for (Future<String> f : futures) {
            String result = f.get();
            if (result != null) {
                System.out.println(result);
                openCount++;
            }
        }

        pool.shutdown();
        long elapsed = System.currentTimeMillis() - startTime;
        System.out.println("\nScan complete: " + openCount + " open port(s) found in " + elapsed + "ms");
    }
}
