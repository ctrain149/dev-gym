/**
 * net-04: Decode bytes back into ProtocolMessage.
 * Reads 1 byte type, 4 bytes length, then N bytes payload.
 */
import java.io.*;

public class ProtocolDecoder {
    public static ProtocolMessage decode(DataInputStream in) throws IOException {
        byte typeCode = in.readByte();
        MessageType type = MessageType.fromCode(typeCode);
        int length = in.readInt();
        byte[] payload = new byte[length];
        in.readFully(payload);
        return new ProtocolMessage(type, payload);
    }
}
