/**
 * net-04: Encode ProtocolMessage to bytes: [1 byte type][4 bytes length][N bytes payload]
 */
import java.nio.ByteBuffer;

public class ProtocolEncoder {
    public static byte[] encode(ProtocolMessage msg) {
        byte[] payload = msg.payload();
        ByteBuffer buf = ByteBuffer.allocate(1 + 4 + payload.length);
        buf.put(msg.type().getCode());
        buf.putInt(payload.length);
        buf.put(payload);
        return buf.array();
    }
}
