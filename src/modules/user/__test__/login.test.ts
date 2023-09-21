import faker from "@faker-js/faker";
import prisma from "../../../../prisma/prisma.service";
import { test } from "tap";
import { server } from "../../../app";
import { UserType } from "fastify-jwt";

test("POST `/api/users/login`", async () => {
	test("given the email and password are correct", async (t) => {
		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		t.teardown(async () => {
			server.close();
			await prisma.user.deleteMany({});
		});

		await server.inject({
			method: "POST",
			url: "/api/users",
			payload: {
				email,
				password,
				name,
			},
		});

		const response = await server.inject({
			method: "POST",
			url: "/api/users/login",
			payload: {
				email,
				password,
			},
		});

		t.equal(response.statusCode, 200);

		const verified = server.jwt.verify<UserType & { iat: number }>(
			response.json().accessToken
		);

		t.equal(verified.email, email);
		t.equal(verified.name, name);
		t.type(verified.id, "number");
		t.type(verified.iat, "number");
	});

	test("given the email and password are not correct", async (t) => {
		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		t.teardown(async () => {
			server.close();
			await prisma.user.deleteMany({});
		});

		await server.inject({
			method: "POST",
			url: "/api/users",
			payload: {
				email,
				password,
				name,
			},
		});

		const response = await server.inject({
			method: "POST",
			url: "/api/users/login",
			payload: {
				email,
				password: "wrong",
			},
		});

		t.equal(response.statusCode, 401);

		const json = response.json();

		t.equal(json.message, "Invalid email or password");
	});
});
