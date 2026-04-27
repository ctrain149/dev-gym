/**
 * net-03: UDP Sensor Sender.
 * Sends simulated sensor readings as datagrams to port 9001 every 500ms.
 * Format: SENSOR_TYPE:VALUE:TIMESTAMP
 */
import java.net.*;
import java.io.*;
import java.time.Instant;

public class SensorSender {
    public static void main(String[] args) throws Exception {
        DatagramSocket socket = new DatagramSocket();
        InetAddress address = InetAddress.getByName("localhost");
        int port = 9001;
        String[] sensors = {"TEMP", "PRES", "FLOW"};
        double[] baselines = {300.0, 155.0, 12.0};
        double[] amplitudes = {20.0, 5.0, 2.0};

        System.out.println("Sending sensor data to " + address + ":" + port);
        int seq = 0;

        while (true) {
            for (int i = 0; i < sensors.length; i++) {
                double value = baselines[i] + amplitudes[i] * Math.sin(seq * 0.1) + Math.random() * 2;
                String msg = sensors[i] + ":" + String.format("%.2f", value) + ":" + Instant.now();
                byte[] data = msg.getBytes();
                DatagramPacket packet = new DatagramPacket(data, data.length, address, port);
                socket.send(packet);
                System.out.println("Sent: " + msg);
            }
            seq++;
            Thread.sleep(500);
        }
    }
}
