import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt from "fastify-jwt";
import userRoutes from "./modules/user/user.route";
import postRoutes from "./modules/post/post.route";
import { userSchemas } from "./modules/user/user.schema";
import { postSchemas } from "./modules/post/post.schema";

export const server = Fastify();
declare module "fastify" {
	export interface FastifyInstance {
		authenticate: any;
	}
}
declare module "fastify-jwt" {
	interface FastifyJWT {
		user: {
			id: number;
			email: string;
			name: string;
		};
	}
}
const tokenSecret = process.env.TOKEN_SECRET as unknown as string;
server.register(fjwt, {
	secret: tokenSecret,
});
server.decorate(
	"authenticate",
	async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			await request.jwtVerify();
		} catch (e) {
			return reply.send(e);
		}
	}
);
server.get("/health-check", async function () {
	return { status: "OK" };
});

async function main() {
	for (const schema of [...userSchemas, ...postSchemas]) {
		server.addSchema(schema);
	}
	server.register(userRoutes, { prefix: "api/users" });
	server.register(postRoutes, { prefix: "api/blog-post" });
	try {
		await server.listen(4500, "0.0.0.0");
		console.log("server ready at http://localhost:4500");
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
}

main();
