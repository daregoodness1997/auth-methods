import express from "express";

import { ApiKeyController } from "../controllers/apiKey.controller";

const router = express.Router();
const apiKeyController = new ApiKeyController();

/**
 * @openapi
 * /api-keys:
 *   post:
 *     summary: Create a new API key
 *     tags:
 *       - API Keys
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateApiKeyRequest'
 *     responses:
 *       201:
 *         description: API key created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiKey'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", (req, res) => apiKeyController.createApiKey(req, res));

/**
 * @openapi
 * /api-keys:
 *   get:
 *     summary: Get all API keys
 *     tags:
 *       - API Keys
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all API keys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ApiKey'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", (req, res) => apiKeyController.getAllApiKeys(req, res));
