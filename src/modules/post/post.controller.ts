import { FastifyRequest, FastifyReply } from "fastify";
import {
	createPost,
	getPosts,
	findPostByPost,
	deletePostById,
	updatePostById,
	countDocuments,
	findManyWithPaginationParams,
} from "./post.service";
import { CreatePostInput, UpdatePostInput } from "./post.schema";

export async function createPostHandler(
	request: FastifyRequest<{ Body: CreatePostInput }>
) {
	const post = await createPost({
		...request.body,
		authorId: request.user.id,
	});
	return post;
}

export async function getPostsHandler() {
	const posts = await getPosts();
	return posts;
}

export async function deletePostHandler(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const params = request.params as { id?: unknown }; // Cast to an object with 'id' property of unknown type
		if (params.id !== undefined) {
			const id = Number(params.id);
			if (!isNaN(id)) {
				// 'id' is now a number, and you can use it here
				const existingBlogPost = await findPostByPost(id);
				if (existingBlogPost) {
					await deletePostById(id);
					reply.send({ message: "Blog post deleted" });
				} else {
					reply.code(404).send({ message: "Blog post not found" });
				}
			}

			if (isNaN(id)) {
				// Handle the case where 'id' is missing or undefined or not a number
				reply
					.code(500)
					.send({ message: "bad request, param must be a number" });
			}
		}
		if (params.id === undefined) {
			reply.code(500).send({ message: "bad request, invalid param type" });
		}
	} catch (error) {
		reply.code(500).send({ message: "Internal Server Error" });
	}
}

export async function getAllPaginatedBlogPostsHandler(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const { page = 1, limit = 10 } = request.query as {
			page?: number;
			limit?: number;
		};
		const skip = (page - 1) * limit;
		const total = await countDocuments();
		const blogPosts = await findManyWithPaginationParams(skip, limit);
		reply.send({ total, blogPosts });
	} catch (error) {
		reply.code(500).send({ message: "Internal Server Error" });
	}
}

export async function getBlogPostByIdHandler(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const params = request.params as { id?: unknown }; // Cast to an object with 'id' property of unknown type
		if (params.id !== undefined) {
			const id = Number(params.id);
			if (!isNaN(id)) {
				// 'id' is now a number, and you can use it here
				const blogPost = await findPostByPost(id);
				if (blogPost) {
					reply.send(blogPost);
				} else {
					reply.code(404).send({ message: "Blog post not found" });
				}
			}

			if (isNaN(id)) {
				// Handle the case where 'id' is missing or undefined or not a number
				reply
					.code(500)
					.send({ message: "bad request, param must be a number" });
			}
		}
		if (params.id === undefined) {
			reply.code(500).send({ message: "bad request, invalid param type" });
		}
	} catch (error) {
		reply.code(500).send({ message: "Internal Server Error" });
	}
}

export async function updateBlogPostHandler(
	request: FastifyRequest<{ Body: UpdatePostInput }>,
	reply: FastifyReply
) {
	try {
		//
		const params = request.params as { id?: unknown }; // Cast to an object with 'id' property of unknown type
		if (params.id !== undefined) {
			const id = Number(params.id);
			if (!isNaN(id)) {
				// 'id' is now a number, and you can use it here
				const blogPost = await findPostByPost(id);
				if (blogPost) {
					const updatedBlogPost = await updatePostById(request.body, id);
					reply.send(updatedBlogPost);
				} else {
					reply.code(404).send({ message: "Blog post not found" });
				}
			}
			if (isNaN(id)) {
				// Handle the case where 'id' is missing or undefined or not a number
				reply
					.code(500)
					.send({ message: "bad request, param must be a number" });
			}
		}
		if (params.id === undefined) {
			reply.code(500).send({ message: "bad request, invalid param type" });
		}
	} catch (error) {
		reply.code(500).send({ message: "Internal Server Error" });
	}
}
