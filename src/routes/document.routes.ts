import express from "express";
import { DocumentController } from "../controllers/document.controller";

const router = express.Router();
const documentController = new DocumentController();

router.get("/:id", (req, res) => documentController.getDocumentById(req, res));

router.get("/", (req, res) => documentController.getAllDocuments(req, res));

router.post("/", (req, res) => documentController.createDocument(req, res));

router.put("/:id", (req, res) => documentController.updateDocument(req, res));

router.delete("/:id", (req, res) =>
  documentController.deleteDocument(req, res),
);

router.post("/:id/collaborators", (req, res) =>
  documentController.addCollaborator(req, res),
);

export default router;
