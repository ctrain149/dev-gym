/**
 * net-06: Multi-threaded Port Scanner.
 * TODO: Scan ports in parallel, report open ports with latency.
 */
import java.net.*;
import java.io.*;
import java.util.concurrent.*;

public class PortScanner {
    public static void main(String[] args) throws Exception {
        String host = "localhost";
        int startPort = 1, endPort = 1024, timeout = 200;

        // TODO: ExecutorService, submit scan tasks, collect results
        // For each open port: print port number, service name (if known), latency ms
    }
}
