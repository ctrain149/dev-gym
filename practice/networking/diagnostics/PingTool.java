/**
 * net-06: Ping-like reachability checker.
 * Sends N periodic checks, reports packet loss percentage.
 */
import java.net.*;

public class PingTool {
    public static void main(String[] args) throws Exception {
        String host = args.length > 0 ? args[0] : "localhost";
        int count = 10, timeout = 1000;

        InetAddress address = InetAddress.getByName(host);
        System.out.println("PING " + host + " (" + address.getHostAddress() + ")");

        int success = 0;
        long totalTime = 0;

        for (int i = 1; i <= count; i++) {
            long start = System.nanoTime();
            boolean reachable = address.isReachable(timeout);
            long elapsed = (System.nanoTime() - start) / 1_000_000;

            if (reachable) {
                System.out.println("Reply from " + host + ": time=" + elapsed + "ms");
                success++;
                totalTime += elapsed;
            } else {
                System.out.println("Request timed out.");
            }
            Thread.sleep(1000);
        }

        int lost = count - success;
        double lossPercent = (lost * 100.0) / count;
        System.out.println("\n--- " + host + " ping statistics ---");
        System.out.printf("%d packets sent, %d received, %.0f%% loss%n", count, success, lossPercent);
        if (success > 0) {
            System.out.printf("avg round-trip: %dms%n", totalTime / success);
        }
    }
}
