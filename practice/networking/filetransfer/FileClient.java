/**
 * net-05: TCP File Client.
 * Sends filename, receives file size (long), streams file bytes to disk.
 * Verifies received file size matches expected size.
 */
import java.net.*;
import java.io.*;

public class FileClient {
    public static void main(String[] args) throws IOException {
        String host = "localhost";
        int port = 9002;
        String filename = args.length > 0 ? args[0] : "test.txt";
        String savePath = "downloaded_" + filename;

        try (
            Socket socket = new Socket(host, port);
            DataInputStream in = new DataInputStream(socket.getInputStream());
            DataOutputStream out = new DataOutputStream(socket.getOutputStream())
        ) {
            // Request the file
            out.writeUTF(filename);
            out.flush();

            // Read file size
            long fileSize = in.readLong();
            if (fileSize == -1) {
                System.out.println("Error: file '" + filename + "' not found on server.");
                return;
            }
            System.out.println("Receiving " + filename + " (" + fileSize + " bytes)...");

            // Stream to disk
            byte[] buffer = new byte[8192];
            long totalReceived = 0;
            try (FileOutputStream fos = new FileOutputStream(savePath)) {
                int bytesRead;
                while (totalReceived < fileSize && (bytesRead = in.read(buffer)) != -1) {
                    fos.write(buffer, 0, bytesRead);
                    totalReceived += bytesRead;
                }
            }

            // Verify
            if (totalReceived == fileSize) {
                System.out.println("Success! Saved to " + savePath + " (" + totalReceived + " bytes)");
            } else {
                System.out.println("Warning: expected " + fileSize + " bytes but received " + totalReceived);
            }
        }
    }
}
