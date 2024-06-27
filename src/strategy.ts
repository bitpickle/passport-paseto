import { Strategy } from "passport-strategy";
import type {
  PassportPasetoConfig,
  PublicKeyProvider,
  Request,
  TokenExtractor,
  VerifiedCallback,
  VerifyCallback,
  VerifyCallbackWithRequest,
} from "./types";
import { verifyToken } from "./verify-token";

export class PasetoStrategy extends Strategy {
  name: string;
  private _publicKeyProvider: PublicKeyProvider;
  private _verify: VerifyCallbackWithRequest;
  private _tokenExtractor: TokenExtractor;

  constructor(
    options: PassportPasetoConfig,
    verify: VerifyCallbackWithRequest,
  ) {
    super();
    if (options.publicKeyProvider && options.publicKey) {
      throw new TypeError(
        "PasetoStrategy cannot be constructed with both a publicKey and a publicKeyProvider",
      );
    }

    if (!options.publicKey && !options.publicKeyProvider) {
      throw new TypeError(
        "PasetoStrategy requires either a publicKey or a publicKeyProvider",
      );
    }

    if (!verify) {
      throw new TypeError("PasetoStrategy requires a verify callback");
    }

    if (!options.tokenExtractor) {
      throw new TypeError("PasetoStrategy requires a token extractor");
    }

    this.name = "paseto";
    this._verify = verify;
    this._tokenExtractor = options.tokenExtractor;

    this._publicKeyProvider =
      options.publicKeyProvider ||
      ((request, rawToken, done) => {
        done(null, options.publicKey);
      });
  }

  async authenticate(request: Request) {
    const token = this._tokenExtractor(request);

    if (!token) {
      return this.fail(
        {
          type: "invalid_token",
          message: "No token provided",
        },
        401,
      );
    }

    this._publicKeyProvider(request, token, (publicKeyError, publicKey) => {
      if (publicKeyError) {
        return this.error(publicKeyError);
      }

      if (!publicKey) {
        return this.fail(
          {
            type: "invalid_token",
            message: "No public key provided",
          },
          401,
        );
      }

      verifyToken(token, publicKey, (tokenError, tokenPayload) => {
        if (tokenError) {
          return this.fail(
            {
              type: "invalid_token",
              message: "Invalid token",
            },
            401,
          );
        }

        const verified: VerifiedCallback = (err, user, info) => {
          if (err) {
            return this.error(err);
          }

          if (!user) {
            return this.fail(info, 401);
          }

          this.success(user, info);
        };

        try {
          this._verify(request, tokenPayload, verified);
        } catch (err) {
          this.error(err as Error);
        }
      });
    });
  }
}
