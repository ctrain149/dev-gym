/**
 * net-05: TCP File Server.
 * Accepts filename request, sends file size (long) then streams file bytes.
 * If file not found, sends -1 as size.
 * Uses 8KB buffer for streaming.
 */
import java.net.*;
import java.io.*;

public class FileServer {
    private static final String SERVE_DIR = "./files";

    public static void main(String[] args) throws IOException {
        int port = 9002;
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            System.out.println("File server on port " + port + ", serving from " + SERVE_DIR);

            while (true) {
                Socket client = serverSocket.accept();
                System.out.println("Client connected: " + client.getRemoteSocketAddress());

                try (
                    DataInputStream in = new DataInputStream(client.getInputStream());
                    DataOutputStream out = new DataOutputStream(client.getOutputStream())
                ) {
                    String filename = in.readUTF();
                    System.out.println("Requested: " + filename);

                    File file = new File(SERVE_DIR, filename);
                    if (!file.exists() || !file.isFile()) {
                        System.out.println("File not found: " + filename);
                        out.writeLong(-1);
                        out.flush();
                        continue;
                    }

                    long fileSize = file.length();
                    out.writeLong(fileSize);
                    System.out.println("Sending " + filename + " (" + fileSize + " bytes)");

                    byte[] buffer = new byte[8192];
                    try (FileInputStream fis = new FileInputStream(file)) {
                        int bytesRead;
                        long totalSent = 0;
                        while ((bytesRead = fis.read(buffer)) != -1) {
                            out.write(buffer, 0, bytesRead);
                            totalSent += bytesRead;
                        }
                        out.flush();
                        System.out.println("Sent " + totalSent + " bytes.");
                    }
                } catch (IOException e) {
                    System.err.println("Transfer error: " + e.getMessage());
                } finally {
                    client.close();
                }
            }
        }
    }
}
