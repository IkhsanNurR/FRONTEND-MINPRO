import { CookieValueTypes } from "cookies-next";
import * as jwt from "jsonwebtoken";

export default function decodeTokenName(token: CookieValueTypes) {
    if (typeof token === "string") {
        const decodedToken = jwt.decode(token);
        if (typeof decodedToken === "object" && decodedToken?.aud) {
            const nameValue = decodedToken.aud as string;
            return nameValue
        }
    }
    return null
}