/** net-04: Binary protocol message types. */
public enum MessageType {
    COMMAND((byte) 0x01),
    STATUS((byte) 0x02),
    ALARM((byte) 0x03);

    private final byte code;
    MessageType(byte code) { this.code = code; }
    public byte getCode() { return code; }

    public static MessageType fromCode(byte code) {
        for (MessageType t : values()) if (t.code == code) return t;
        throw new IllegalArgumentException("Unknown message type: " + code);
    }
}
