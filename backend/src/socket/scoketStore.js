const connectedUsers = new Map();

export const addUserSocket = (userId, socketId) => {
  connectedUsers.set(userId, socketId);
};

export const removeUserSocket = (userId) => {
  connectedUsers.delete(userId);
};

export const getUserSocket = (userId) => {
  return connectedUsers.get(userId);
};

export const getConnectedUsers = () => {
  return connectedUsers;
};