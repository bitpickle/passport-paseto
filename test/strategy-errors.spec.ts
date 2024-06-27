import { describe, expect, test } from "vitest";
import { PasetoStrategy } from "../src/strategy";

describe("Strategy errors", () => {
  test("should throw if constructed without a verify callback", () => {
    expect(() => {
      new PasetoStrategy(
        {
          publicKey: "foo",
          tokenExtractor: () => "foo",
        },
        null as unknown as () => void,
      );
    }).to.throw(TypeError, "PasetoStrategy requires a verify callback");
  });

  test("should throw if constructed without a publicKey or publicKeyProvider", () => {
    expect(() => {
      new PasetoStrategy(
        {
          tokenExtractor: () => "foo",
        },
        () => {},
      );
    }).to.throw(
      TypeError,
      "PasetoStrategy requires either a publicKey or a publicKeyProvider",
    );
  });

  test("should throw if constructed without a tokenExtractor", () => {
    expect(() => {
      new PasetoStrategy(
        {
          publicKey: "foo",
        },
        () => {},
      );
    }).to.throw(TypeError, "PasetoStrategy requires a token extractor");
  });

  test("should throw if constructed both publicKey and publicKeyProvider", () => {
    expect(() => {
      new PasetoStrategy(
        {
          publicKey: "foo",
          publicKeyProvider: () => {},
          tokenExtractor: () => "foo",
        },
        () => {},
      );
    }).to.throw(
      TypeError,
      "PasetoStrategy cannot be constructed with both a publicKey and a publicKeyProvider",
    );
  });

  test("should be constructed succesfully if the options are correct", () => {
    expect(() => {
      new PasetoStrategy(
        {
          publicKey: "foo",
          tokenExtractor: () => "foo",
        },
        () => {},
      );
    }).not.to.throw();
  });
});
