/**
 * net-03: UDP Sensor Receiver.
 * Binds to port 9001, receives datagrams, parses and displays readings.
 */
import java.net.*;

public class SensorReceiver {
    public static void main(String[] args) throws Exception {
        int port = 9001;
        DatagramSocket socket = new DatagramSocket(port);
        byte[] buffer = new byte[1024];

        System.out.println("Listening for sensor data on port " + port + "...");
        int received = 0;

        while (true) {
            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
            socket.receive(packet);
            received++;

            String msg = new String(packet.getData(), 0, packet.getLength());
            String[] parts = msg.split(":");

            if (parts.length >= 3) {
                String sensor = parts[0];
                String value = parts[1];
                String timestamp = parts[2];
                System.out.printf("[#%d] %-5s = %s  (at %s)  from %s%n",
                    received, sensor, value, timestamp, packet.getSocketAddress());
            } else {
                System.out.println("Malformed packet: " + msg);
            }
        }
    }
}
