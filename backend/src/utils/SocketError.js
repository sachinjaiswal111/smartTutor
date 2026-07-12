export default class SocketError extends Error {
    constructor(message, code = "SOCKET_ERROR") {
        super(message);

        this.code = code;
    }
}