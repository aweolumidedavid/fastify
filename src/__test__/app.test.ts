import { test } from "tap";
import { server } from "../app";

test("requests the `/healthcheck` route", async (t) => {
	t.teardown(() => {
		server.close();
	});

	const response = await server.inject({
		method: "GET",
		url: "/healthcheck",
	});

	t.equal(response.statusCode, 200);
	t.same(response.json(), { status: "OK" });
});
