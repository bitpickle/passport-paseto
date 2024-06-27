import { V4 as paseto } from "paseto";

export async function verifyToken(
	token: string,
	publicKey: string | Buffer,
	callback: (err: Error | null, user?: Record<string, unknown>) => void,
): Promise<void> {
	try {
		const payload = await paseto.verify(token, publicKey);
		callback(null, payload);
	} catch (err) {
		callback(err as Error);
	}
}
