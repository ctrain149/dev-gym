/** net-04: Represents a message with type and payload. */
public record ProtocolMessage(MessageType type, byte[] payload) {
    public String payloadAsString() { return new String(payload); }
}
