const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
};

const isValidToken = (token) => {
    const parsedToken = parseJwt(token);
    const currentTime = Date.now() / 1000;
    return parsedToken.exp > currentTime;
}
export { parseJwt, isValidToken };