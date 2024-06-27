import type { Request as ExpressRequest } from "express";

export type Request = ExpressRequest;

export type VerifiedCallback = (
	err: Error | null,
	user?: Record<string, unknown>,
	info?: Record<string, unknown>,
) => void;

export type PublicKeyProvider = (
	request: Request,
	rawToken: string,
	done: (err: Error | null, publicKey?: string | Buffer) => void,
) => void;

export type PassportPasetoConfig = {
	publicKey?: string | Buffer;
	publicKeyProvider?: PublicKeyProvider;
	tokenExtractor?: TokenExtractor;
};

export type VerifyCallback = (
	token_payload: Record<string, unknown>,
	done: (
		err: Error | null,
		user?: Record<string, unknown>,
		info?: unknown,
	) => void,
) => void;

export type VerifyCallbackWithRequest = (
	request: Request,
	token_payload: Record<string, unknown>,
	done: (
		err: Error | null,
		user?: Record<string, unknown>,
		info?: unknown,
	) => void,
) => void;

export type TokenExtractor = (request: Request) => string | null;
