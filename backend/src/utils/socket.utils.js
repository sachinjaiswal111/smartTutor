export const emitSuccess = (
    socket,
    event,
    data = {},
    message = "Success"
) => {
    socket.emit(event, {
        success: true,
        message,
        data,
    });
};

export const emitError = (
    socket,
    event,
    message = "Something went wrong"
) => {
    socket.emit(event, {
        success: false,
        message,
    });
};