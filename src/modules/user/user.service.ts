import prisma from "../../../prisma/prisma.service";
import { hashPassword } from "../../utils/hash";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
	const { password, ...rest } = input;
	const { hashedPassword, salt } = await hashPassword(password);
	const user = await prisma.user.create({
		data: { ...rest, salt, password: hashedPassword },
	});

	return user;
}

export async function findUserByEmail(email: string) {
	return await prisma.user.findUnique({
		where: {
			email,
		},
	});
}

export async function findUsers() {
	return await prisma.user.findMany({
		select: {
			email: true,
			name: true,
			id: true,
		},
	});
}