import type { Request } from "express";
import { describe, expect, test } from "vitest";
import extractTokenFromAuthorizationHeader from "../src/extract-token";
import { RequestMock } from "./mock/request";
import { testData } from "./mock/test-data";

describe("extractTokenFromAuthorizationHeader", () => {
  test("should return null if no authorization header is present", () => {
    const req = new RequestMock();
    const token = extractTokenFromAuthorizationHeader(req as Request);

    expect(token).toBeNull();
  });

  test("should return null if the authorization header is not a bearer token", () => {
    const req = new RequestMock();
    req.headers.authorization = "Basic dXNlcjpwYXNz";

    const token = extractTokenFromAuthorizationHeader(req as Request);

    expect(token).toBeNull();
  });

  test("should return the token if the authorization header is a bearer token", () => {
    const req = new RequestMock();
    req.headers.authorization = `Bearer ${testData.valid_token.encoded}`;

    const token = extractTokenFromAuthorizationHeader(req as Request);
    expect(token).toBe(testData.valid_token.encoded);
  });
});
