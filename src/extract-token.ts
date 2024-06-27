import type { TokenExtractor } from "./types";

const AUTHORIZATION_HEADER = "authorization";
const TOKEN_TYPE = "bearer";

const extractTokenFromAuthorizationHeader: TokenExtractor = (request) => {
	const header = request.headers?.[AUTHORIZATION_HEADER];

	if (!header) return null;

	const [type, token] = header.split(" ");

	if (type.toLowerCase() !== TOKEN_TYPE || !token) return null;

	return token;
};

export default extractTokenFromAuthorizationHeader;
