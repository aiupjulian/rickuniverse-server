import httpStatus from "http-status";
import supertest from "supertest";
import User from "../user/user.model.js";
import app from "../../app.js";

const request = supertest(app);

const MOCK_USER = { username: "user", password: "pass" };

describe("auth api", () => {
  describe("register", () => {
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
      const response = await request
        .post("/api/auth/register")
        .send({ username: MOCK_USER.username })
        .set("Content-Type", "application/json");

      expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
      expect(typeof response.body.token).toEqual("undefined");
    });
  });

  // it("should create user", () => {
  //   return cleanExceptDefaultUser().then(() => {
  //     return request
  //       .post(apiBase + "/auth/signup")
  //       .send(newUser)
  //       .expect(200)
  //       .then((res) => {
  //         res.body.success.should.be.true;
  //       });
  //   });
  // });

  // it("should retrieve the token", () => {
  //   return cleanExceptDefaultUser().then((res) => {
  //     return loginWithDefaultUser().then((res) => {
  //       res.status.should.equal(200);
  //       res.body.success.should.be.true;
  //       res.body.token.should.not.be.empty;
  //     });
  //   });
  // });

  // it("should not login with the right user but wrong password", () => {
  //   return request
  //     .post(apiBase + "/auth/signin")
  //     .send({ username: newUser.username, password: "random" })
  //     .expect(401);
  // });

  // it("should return invalid credentials error", () => {
  //   return request
  //     .post(apiBase + "/auth/signin")
  //     .send({ username: newUser.username, password: "" })
  //     .expect(401)
  //     .then((res) => {
  //       return request
  //         .post(apiBase + "/auth/signin")
  //         .send({ username: newUser.username, password: "mypass" })
  //         .expect(401);
  //     });
  // });
});
