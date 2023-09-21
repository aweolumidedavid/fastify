import prisma from "../../../prisma/prisma.service";
import { CreatePostInput, UpdatePostInput } from "./post.schema";

// Create a new blog post with a title, content, and author.
export async function createPost(data: CreatePostInput & { authorId: number }) {
	return await prisma.post.create({
		data,
	});
}

// Retrieve a list of all blog posts.
export async function getPosts() {
	return await prisma.post.findMany({
		select: {
			content: true,
			title: true,
			id: true,
			createdAt: true,
			updatedAt: true,
			author: {
				select: {
					name: true,
					id: true,
				},
			},
		},
	});
}

// Delete a blog post by its ID.
export async function deletePostById(id: number) {
	return await prisma.post.delete({
		where: {
			id: id,
		},
	});
}

//Retrieve a single blog post by its ID.
export async function findPostByPost(id: number) {
	return await prisma.post.findUnique({
		where: {
			id: id,
		},
	});
}

// Update a blog post.
export async function updatePostById(postData: UpdatePostInput, id: number) {
	return await prisma.post.update({
		data: postData,
		where: {
			id: id,
		},
	});
}

//count docs
export async function countDocuments() {
	return await prisma.post.count();
}

export async function findManyWithPaginationParams(
	skip: number,
	limit: number
) {
	return await prisma.post.findMany({
		skip,
		take: limit,
		orderBy: { createdAt: "desc" },
	});
}
