import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const postInput = {
	title: z.string(),
	content: z.string(),
};

const postGenerated = {
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
};

const updateInput = {
	title: z.string().optional(),
	content: z.string().optional(),
};
const createPostSchema = z.object({
	...postInput,
});
const updatePostSchema = z.object({
	...updateInput,
});
const postResponseSchema = z.object({
	...postInput,
	...postGenerated,
});

const postsSchema = z.array(postResponseSchema);

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;

export const { schemas: postSchemas, $ref } = buildJsonSchemas({
	createPostSchema,
	postResponseSchema,
	postsSchema,
	updatePostSchema,
});
