import * as z from "zod";

export const usernameSchema = z
.string()
    .min(3, "Username Must be 3 Char Long")
    .max(20, "Username Cant be more than 20 Char Long");

export const inputSchema = z.object({
    username: usernameSchema,
    newUsername: usernameSchema.optional(),
});
