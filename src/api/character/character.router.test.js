import httpStatus from "http-status";
import nock from "nock";
import supertest from "supertest";
import { generateAccessToken } from "../../utils/auth.js";
import { CHARACTER_ENDPOINT, RICK_AND_MORTY_API } from "./character.service.js";
import { CHARACTERS_MOCK, CHARACTER_MOCK } from "./__mocks__/index.js";
import app from "../../app.js";
import User from "../user/user.model.js";

const request = supertest(app);

describe("character api", function () {
  describe("should fail without token", function () {
    it("GET /", async function () {
      nock(RICK_AND_MORTY_API)
        .get(CHARACTER_ENDPOINT)
        .reply(httpStatus.OK, CHARACTERS_MOCK);

      const response = await request.get("/api/character");
      expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
    });
    it("GET /:id", async function () {
      const CHARACTER_ID = 1;
      nock(RICK_AND_MORTY_API)
        .get(`${CHARACTER_ENDPOINT}/${CHARACTER_ID}`)
        .reply(httpStatus.OK, CHARACTER_MOCK);

      const response = await request.get(`/api/character/${CHARACTER_ID}`);
      expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
    });
  });
  describe("should return data with token", function () {
    let token;
    const MOCK_USER = { username: "user", password: "pass", favs: [1] };
    beforeEach(async () => {
      await User.create(MOCK_USER);
      token = await generateAccessToken(MOCK_USER.username);
    });
    it("GET /", async function () {
      nock(RICK_AND_MORTY_API)
        .get(CHARACTER_ENDPOINT)
        .reply(200, CHARACTERS_MOCK);

      const response = await request
        .get("/api/character")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body.results[0].fav).toEqual(true);
      expect(response.body.results[1].fav).toEqual(false);
    });
    it("GET /:id", async function () {
      const CHARACTER_ID = 1;
      nock(RICK_AND_MORTY_API)
        .get(`${CHARACTER_ENDPOINT}/${CHARACTER_ID}`)
        .reply(200, CHARACTER_MOCK);

      const response = await request
        .get(`/api/character/${CHARACTER_ID}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toEqual(200);
      expect(response.body.fav).toEqual(true);
    });
  });
});
