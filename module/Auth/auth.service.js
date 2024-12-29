// Format user response to send to the client
exports.formatUserResponse = (user) => ({
  accessToken: user.accessToken,
  refreshToken: user.refreshToken,
  user: {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    profileImage: user.profileImage,
  },
});
