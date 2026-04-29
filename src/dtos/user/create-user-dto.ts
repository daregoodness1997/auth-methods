import zod from "zod";

export const CreateUserSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
  role: zod
    .enum(["USER", "STAFF", "ADMIN"], {
      error: "Role must be one of USER, STAFF, or ADMIN",
    })
    .default("USER"),
});

export type CreateUserDtoType = zod.infer<typeof CreateUserSchema>;
