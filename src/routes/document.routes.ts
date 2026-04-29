import express from "express";
import { DocumentController } from "../controllers/document.controller";
import { authorizeAccess } from "../middlewares/policies.middleware";

const router = express.Router();
const documentController = new DocumentController();

/**
 * @openapi
 * /documents:
 *   get:
 *     summary: Get all documents
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       500:
 *         description: Internal server error
 */
router.get("/", (req, res) => documentController.getAllDocuments(req, res));

/**
 * @openapi
 * /documents:
 *   post:
 *     summary: Create a new document
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDocumentRequest'
 *     responses:
 *       201:
 *         description: Document created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       500:
 *         description: Internal server error
 */
router.post("/", (req, res) => documentController.createDocument(req, res));

/**
 * @openapi
 * /documents/{id}:
 *   put:
 *     summary: Update a document
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDocumentRequest'
 *     responses:
 *       200:
 *         description: Document updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authorizeAccess, (req, res) =>
  documentController.updateDocument(req, res),
);

/**
 * @openapi
 * /documents/{id}:
 *   delete:
 *     summary: Delete a document
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The document ID
 *     responses:
 *       204:
 *         description: Document deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authorizeAccess, (req, res) =>
  documentController.deleteDocument(req, res),
);

/**
 * @openapi
 * /documents/{id}/collaborators:
 *   post:
 *     summary: Add a collaborator to a document
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddCollaboratorRequest'
 *     responses:
 *       201:
 *         description: Collaborator added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessList'
 *       500:
 *         description: Internal server error
 */
router.post("/:id/collaborators", authorizeAccess, (req, res) =>
  documentController.addCollaborator(req, res),
);

/**
 * @openapi
 * /documents/{id}:
 *   get:
 *     summary: Get a document by ID
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The document ID
 *     responses:
 *       200:
 *         description: Document found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Document not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authorizeAccess, (req, res) =>
  documentController.getDocumentById(req, res),
);

export default router;
