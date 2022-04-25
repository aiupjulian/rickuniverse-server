import nock from "nock";
import request from "supertest";
import app from "../../app.js";
import { CHARACTER_ENDPOINT, RICK_AND_MORTY_API } from "./character.service.js";
import { CHARACTERS_MOCK, CHARACTER_MOCK } from "./__mocks__/index.js";

describe("character", function () {
  describe("GET /", function () {
    it("returns a list of mocked characters", async function () {
      nock(RICK_AND_MORTY_API)
        .get(CHARACTER_ENDPOINT)
        .reply(200, CHARACTERS_MOCK);

      const response = await request(app).get("/character");
      expect(response?.statusCode).toEqual(200);
      expect(typeof response.body?.info).toEqual("object");
      const firstCharacter = response.body?.results?.[0];
      expect(typeof firstCharacter?.id).toEqual("number");
      expect(typeof firstCharacter?.name).toEqual("string");
    });
  });
  describe("GET /:id", function () {
    it("returns a mocked character", async function () {
      const CHARACTER_ID = 1;
      nock(RICK_AND_MORTY_API)
        .get(`${CHARACTER_ENDPOINT}/${CHARACTER_ID}`)
        .reply(200, CHARACTER_MOCK);
      const response = await request(app).get(`/character/${CHARACTER_ID}`);
      expect(response?.statusCode).toEqual(200);
      expect(typeof response.body?.id).toEqual("number");
      expect(typeof response.body?.name).toEqual("string");
    });
  });
});
