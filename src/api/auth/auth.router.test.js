import httpStatus from "http-status";
import supertest from "supertest";
import User from "../user/user.model.js";
import app from "../../app.js";

const request = supertest(app);

const MOCK_USER = { username: "user", password: "pass" };

describe("auth api", () => {
  describe("POST /register", () => {
    it("should create user if passed username and password", async () => {
      const response = await request
        .post("/api/auth/register")
        .send(MOCK_USER)
        .set("Content-Type", "application/json");

      expect(response.statusCode).toEqual(httpStatus.CREATED);
      expect(typeof response.body.token).toEqual("string");
      const dbUser = await User.findOne({ username: MOCK_USER.username });
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(MOCK_USER.password);
    });
    it("should fail if no username provided", async () => {
      const response = await request
        .post("/api/auth/register")
        .send({ password: MOCK_USER.password })
        .set("Content-Type", "application/json");

      expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
      expect(typeof response.body.token).toEqual("undefined");
    });
    it("should fail if no password provided", async () => {
      const response = await request
        .post("/api/auth/register")
        .send({ username: MOCK_USER.username })
        .set("Content-Type", "application/json");

      expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
      expect(typeof response.body.token).toEqual("undefined");
    });
    it("should fail if username already exists", async () => {
      await User.create(MOCK_USER);
      const response = await request
        .post("/api/auth/register")
        .send(MOCK_USER)
        .set("Content-Type", "application/json");

      expect(response.statusCode).toEqual(httpStatus.CONFLICT);
      expect(typeof response.body.token).toEqual("undefined");
    });

    describe("POST /login", () => {
      beforeEach(async () => {
        await User.create(MOCK_USER);
      });
      it("should login user if passed correct username and password", async () => {
        const response = await request
          .post("/api/auth/login")
          .send(MOCK_USER)
          .set("Content-Type", "application/json");

        expect(response.statusCode).toEqual(httpStatus.OK);
        expect(typeof response.body.token).toEqual("string");
      });
      it("should fail if no username provided", async () => {
        const response = await request
          .post("/api/auth/login")
          .send({ password: MOCK_USER.password })
          .set("Content-Type", "application/json");

        expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
        expect(typeof response.body.token).toEqual("undefined");
      });
      it("should fail if no password provided", async () => {
        const response = await request
          .post("/api/auth/login")
          .send({ username: MOCK_USER.username })
          .set("Content-Type", "application/json");

        expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
        expect(typeof response.body.token).toEqual("undefined");
      });
      it("should fail if username doesn't exist", async () => {
        const response = await request
          .post("/api/auth/login")
          .send({ username: "john", password: "pass" })
          .set("Content-Type", "application/json");

        expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        expect(typeof response.body.token).toEqual("undefined");
      });
      it("should fail if wrong password", async () => {
        const response = await request
          .post("/api/auth/login")
          .send({
            username: MOCK_USER.username,
            password: `${MOCK_USER.pass}1234`,
          })
          .set("Content-Type", "application/json");

        expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
        expect(typeof response.body.token).toEqual("undefined");
      });
    });
  });
});
