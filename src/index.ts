import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import { authorize, authorizeRole } from "./middlewares/policies.middleware";
import { Role } from "../generated/prisma/enums";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Auth Playground");
});
app.use("/auth", authRoutes);
app.use(
  "/users",
  authMiddleware,
  authorizeRole([Role.STAFF, Role.ADMIN]),
  userRoutes,
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:9000`);
});
