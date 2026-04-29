import zod from "zod";

export const LoginUserSchema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginUserDtoType = zod.infer<typeof LoginUserSchema>;
