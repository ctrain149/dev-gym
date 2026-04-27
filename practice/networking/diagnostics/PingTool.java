/**
 * net-06: Ping-like reachability checker.
 * TODO: Send N periodic checks, report packet loss percentage.
 */
import java.net.*;

public class PingTool {
    public static void main(String[] args) throws Exception {
        String host = args.length > 0 ? args[0] : "localhost";
        int count = 10, timeout = 1000;

        // TODO: InetAddress.isReachable() in loop, track success/fail
        // Print: "Reply from host: time=Xms" or "Request timed out"
        // Final: "X packets sent, Y received, Z% loss"
    }
}
