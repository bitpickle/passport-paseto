import { V4 } from "paseto";
import { describe, expect, test } from "vitest";
import { verifyToken } from "../src/verify-token";
import { testData } from "./mock/test-data";

describe("verifyToken", () => {
  test("should return the payload if the token is valid", async () => {
    const payload = {
      name: "John Doe",
      email: "john@email.com",
    };
    const token = await V4.sign(payload, testData.privateKey);
    let decoded: Record<string, unknown> = {};
    await verifyToken(token, testData.publicKey, (_, result) => {
      decoded = result || {};
    });
    expect(decoded.name).toBe(payload.name);
    expect(decoded.email).toBe(payload.email);
  });

  test("should return undefined if the token is invalid", async () => {
    const token = "invalid_token";
    let decoded: Record<string, unknown> = {};
    let error: Error | null = null;
    await verifyToken(token, testData.publicKey, (err, result) => {
      decoded = result || {};
      error = err || null;
    });
    expect(decoded).toEqual({});
    expect(error).not.toBeNull();
  });

  test("should return undefined if the token is expired", async () => {
    const payload = {
      name: "John Doe",
      email: "john@email.com",
    };
    const token = await V4.sign(payload, testData.privateKey, {
      expiresIn: "0s",
    });
    let decoded: Record<string, unknown> = {};
    let error: Error | null = null;
    await verifyToken(token, testData.publicKey, (err, result) => {
      decoded = result || {};
      error = err || null;
    });
    expect(decoded).toEqual({});
    expect(error).not.toBeNull();
  });

  test("should return undefined if the token is not signed with the correct key", async () => {
    const payload = {
      name: "John Doe",
      email: "john@email.com",
    };
    const token = await V4.sign(payload, testData.privateKey);
    let decoded: Record<string, unknown> = {};
    let error: Error | null = null;
    await verifyToken(token, testData.wrongPublicKey, (err, result) => {
      decoded = result || {};
      error = err;
    });
    expect(decoded).toEqual({});
    expect(error).not.toBeNull();
  });
});
