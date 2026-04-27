/**
 * net-04: TODO — Encode ProtocolMessage to bytes: [1 byte type][4 bytes length][N bytes payload]
 */
import java.nio.ByteBuffer;

public class ProtocolEncoder {
    public static byte[] encode(ProtocolMessage msg) {
        // TODO: allocate ByteBuffer, put type, putInt length, put payload, return array
        return new byte[0];
    }
}
