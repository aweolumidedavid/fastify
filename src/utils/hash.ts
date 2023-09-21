import * as bcrypt from "bcryptjs";

export const verifyPassword = async (
	rawPassword: string,
	hashedPassword: string
): Promise<boolean> => {
	try {
		return await bcrypt.compare(rawPassword, hashedPassword);
	} catch (e: unknown) {
		const err = e as Error;
		throw new Error(err.message);
	}
};

export const hashPassword = async (
	pass: string
): Promise<{ hashedPassword: string; salt: string }> => {
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(pass, salt);
		return { hashedPassword, salt };
	} catch (e: unknown) {
		const err = e as Error;
		throw new Error(err.message);
	}
};
