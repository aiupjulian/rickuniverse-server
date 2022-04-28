import httpStatus from "http-status";
import supertest from "supertest";
import { generateAccessToken } from "../../utils/auth.js";
import app from "../../app.js";
import User from "./user.model.js";

const request = supertest(app);

describe("user api", function () {
  describe("should fail without token", function () {
    it("PUT /me/favs/:id", async function () {
      const response = await request.put("/api/user/me/favs/1");
      expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
    });
    it("DELETE /me/favs/:id", async function () {
      const response = await request.delete("/api/user/me/favs/1");
      expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
    });
  });
  describe("should change favs if logged in", function () {
    let token;
    const MOCK_USER = { username: "user", password: "pass", favs: [1] };
    beforeEach(async () => {
      await User.create(MOCK_USER);
      token = await generateAccessToken(MOCK_USER.username);
    });
    it("PUT /me/favs/:id", async function () {
      const response = await request
        .put(`/api/user/me/favs/2`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toEqual(httpStatus.OK);
      const dbUser = await User.findOne({ username: MOCK_USER.username });
      expect(dbUser.favs).toEqual([1, 2]);
    });
    it("DELETE /me/favs/:id", async function () {
      const response = await request
        .delete(`/api/user/me/favs/1`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toEqual(httpStatus.OK);
      const dbUser = await User.findOne({ username: MOCK_USER.username });
      expect(dbUser.favs).toEqual([]);
    });
  });
});
