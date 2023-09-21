import { FastifyInstance } from "fastify";
import {
	createPostHandler,
	getPostsHandler,
	deletePostHandler,
	getBlogPostByIdHandler,
	updateBlogPostHandler,
	getAllPaginatedBlogPostsHandler,
} from "./post.controller";
import { $ref } from "./post.schema";

async function postRoutes(server: FastifyInstance) {
	server.post(
		"/create",
		{
			preHandler: [server.authenticate],
			schema: {
				body: $ref("createPostSchema"),
				response: {
					201: $ref("postResponseSchema"),
				},
			},
		},
		createPostHandler
	);

	server.get(
		"/view-all",
		{
			schema: {
				response: {
					200: $ref("postsSchema"),
				},
			},
		},

		getPostsHandler
	);

	server.delete(
		"/:id",
		{
			preHandler: [server.authenticate],
		},
		deletePostHandler
	);

	server.get("/view/:id", getBlogPostByIdHandler);

	server.put(
		"/update/:id",
		{
			preHandler: [server.authenticate],
			schema: {
				body: $ref("updatePostSchema"),
				response: {
					200: $ref("postResponseSchema"),
				},
			},
		},
		updateBlogPostHandler
	);

	server.get("/all", getAllPaginatedBlogPostsHandler);
}

export default postRoutes;
