const publicKey = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAHrnbu7wEfAP9cGBOAHHwmH4Wsot1ciXBHwBBXQ4gsaI=
-----END PUBLIC KEY-----`;

const privateKey = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEILTL+0PfTOIQcn2VPkpxMwf6Gbt9n4UEFDjZ4RuUKjd0
-----END PRIVATE KEY-----`;

const wrongPublicKey = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAHrnbu9wEfAP9cGBOAHHwmH4Wsot1ciXBHwBBXQ4gsaI=
-----END PUBLIC KEY-----`;

export const testData = {
  valid_token: {
    encoded:
      "v4.public.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsImlhdCI6IjIwMjQtMDYtMzBUMTc6MTE6NDcuMjA1WiIsImV4cCI6IjIxMjQtMDctMDFUMTc6MTE6NDcuMjA1WiJ9Zhm7bDUQUoRJivBtGb_OlLq8PbBF42IBRp0C4i9M5aWE-vSN5O-4_w6rmpKfPcqk6B6s-aUUG7oEusZEqzP4Cg",
    decoded: {
      name: "John Doe",
      email: "john@doe.com",
      iat: "2024-06-30T17:11:47.205Z",
      exp: "2124-07-01T17:11:47.205Z",
    },
  },
  publicKey,
  privateKey,
  wrongPublicKey,
};
