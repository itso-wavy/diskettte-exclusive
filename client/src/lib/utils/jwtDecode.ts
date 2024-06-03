export const jwtDecode = (token: string | null) => {
  if (token) {
    const [, payload] = token.split('.');
    const decodedPayload = atob(payload!);
    const payloadData = JSON.parse(decodedPayload);
    const userId = payloadData.payload;
    return userId;
  }
};
// const userId = jwtDecode(accessToken);
