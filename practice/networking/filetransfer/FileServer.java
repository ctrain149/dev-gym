/**
 * net-05: TCP File Server.
 * TODO: Accept filename request, send file size (long) then stream file bytes.
 *       If file not found, send -1 as size.
 *       Use 8KB buffer for streaming.
 */
import java.net.*;
import java.io.*;

public class FileServer {
    private static final String SERVE_DIR = "./files";

    public static void main(String[] args) throws IOException {
        // TODO: ServerSocket(9002), accept, read filename, stream file
    }
}
