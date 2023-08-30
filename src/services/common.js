const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
};

const isValidToken = (token) => {
    if (!token) {
        return false;
    }
    const parsedToken = parseJwt(token);
    const currentTime = Date.now() / 1000;
    return parsedToken.exp > currentTime;
}

const checkToken = () => {
    const token = localStorage.getItem('token');
    console.log('checkToken', token);
    const isValidTokenVal = isValidToken(token);
    console.log('isValidTokenVal', isValidTokenVal);
    // Add your logic to check if the token is expired here
    // For example, you can compare the token's expiration time with the current time
    return token !== null ? isValidTokenVal : false;
};
export { parseJwt, isValidToken, checkToken };