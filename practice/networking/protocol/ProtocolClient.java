/**
 * net-04: Binary Protocol Client.
 * Sends binary-encoded messages to the protocol server and reads responses.
 */
import java.net.*;
import java.io.*;

public class ProtocolClient {
    public static void main(String[] args) throws IOException {
        String host = "localhost";
        int port = 9003;

        try (
            Socket socket = new Socket(host, port);
            DataInputStream in = new DataInputStream(socket.getInputStream());
            DataOutputStream out = new DataOutputStream(socket.getOutputStream())
        ) {
            System.out.println("Connected to protocol server.");

            // Send a COMMAND
            sendMessage(out, MessageType.COMMAND, "SET TEMP_SETPOINT 350");
            ProtocolMessage resp1 = ProtocolDecoder.decode(in);
            System.out.println("Response: " + resp1.payloadAsString());

            // Send a STATUS request
            sendMessage(out, MessageType.STATUS, "REACTOR_STATUS");
            ProtocolMessage resp2 = ProtocolDecoder.decode(in);
            System.out.println("Response: " + resp2.payloadAsString());

            // Send an ALARM
            sendMessage(out, MessageType.ALARM, "HIGH TEMP ZONE 4");
            ProtocolMessage resp3 = ProtocolDecoder.decode(in);
            System.out.println("Response: " + resp3.payloadAsString());
        }
    }

    private static void sendMessage(DataOutputStream out, MessageType type, String payload) throws IOException {
        byte[] encoded = ProtocolEncoder.encode(new ProtocolMessage(type, payload.getBytes()));
        out.write(encoded);
        out.flush();
        System.out.println("Sent " + type + ": " + payload);
    }
}
