/**
 * Function to extract and decode payload of the json web token
 * @param {string} token - Json Web Token
 * @returns {Object} payload
 */
export const decode = (
    token: string,
): {
    id: number;
    name: string;
    email: string;
    iat: number;
    exp: number;
} => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''),
    );

    return JSON.parse(jsonPayload);
};
