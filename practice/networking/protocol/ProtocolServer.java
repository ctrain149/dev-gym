/**
 * net-04: Binary Protocol Server.
 * Accepts connections, decodes binary messages, sends responses.
 */
import java.net.*;
import java.io.*;

public class ProtocolServer {
    public static void main(String[] args) throws IOException {
        int port = 9003;
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("Protocol server on port " + port);

            while (true) {
                Socket client = serverSocket.accept();
                System.out.println("Client connected: " + client.getRemoteSocketAddress());

                try (
                    DataInputStream in = new DataInputStream(client.getInputStream());
                    DataOutputStream out = new DataOutputStream(client.getOutputStream())
                ) {
                    while (true) {
                        ProtocolMessage msg = ProtocolDecoder.decode(in);
                        System.out.println("Received " + msg.type() + ": " + msg.payloadAsString());

                        // Build a response
                        String response;
                        switch (msg.type()) {
                            case COMMAND:
                                response = "ACK: " + msg.payloadAsString();
                                break;
                            case STATUS:
                                response = "STATUS OK";
                                break;
                            case ALARM:
                                response = "ALARM RECEIVED — initiating safety protocol";
                                break;
                            default:
                                response = "UNKNOWN";
                        }

                        byte[] encoded = ProtocolEncoder.encode(
                            new ProtocolMessage(msg.type(), response.getBytes()));
                        out.write(encoded);
                        out.flush();
                    }
                } catch (EOFException e) {
                    System.out.println("Client disconnected.");
                }
            }
        }
    }
}
