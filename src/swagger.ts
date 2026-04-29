import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth Methods API",
      version: "1.0.0",
      description: "Authentication API with JWT-based auth flows",
    },
    servers: [
      {
        url: "http://localhost:{port}",
        variables: {
          port: {
            default: "9000",
          },
        },
      },
    ],
    components: {
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "securePassword123",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            role: {
              type: "string",
              enum: ["USER", "STAFF", "ADMIN"],
              default: "USER",
              example: "USER",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "securePassword123",
            },
          },
        },
        TokenResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "User already exists",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            name: {
              type: "string",
              nullable: true,
              example: "John Doe",
            },
            role: {
              type: "string",
              enum: ["USER", "STAFF", "ADMIN"],
              example: "USER",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Document: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            title: {
              type: "string",
              example: "Project Proposal",
            },
            content: {
              type: "string",
              example: "This document outlines the project scope.",
            },
            createdById: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440001",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        CreateDocumentRequest: {
          type: "object",
          required: ["title", "content"],
          properties: {
            title: {
              type: "string",
              example: "Project Proposal",
            },
            content: {
              type: "string",
              example: "This document outlines the project scope.",
            },
          },
        },
        UpdateDocumentRequest: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Updated Title",
            },
            content: {
              type: "string",
              example: "Updated content.",
            },
          },
        },
        AddCollaboratorRequest: {
          type: "object",
          required: ["userId"],
          properties: {
            userId: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440002",
            },
          },
        },
        AccessList: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            userId: {
              type: "string",
              format: "uuid",
            },
            documentId: {
              type: "string",
              format: "uuid",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        PersonalDataRequest: {
          type: "object",
          required: ["gender", "age", "nin", "bvn", "vin", "maritalStatus"],
          properties: {
            gender: {
              type: "string",
            },
            age: {
              type: "integer",
            },
            nin: {
              type: "string",
            },
            bvn: {
              type: "string",
            },
            vin: {
              type: "string",
            },
            maritalStatus: {
              type: "string",
            },
          },
          example: {
            gender: "Male",
            age: 30,
            nin: "12345678901",
            bvn: "22345678901",
            vin: "32345678901234567890",
            maritalStatus: "Single",
          },
        },
        PersonalData: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            userId: {
              type: "string",
              format: "uuid",
            },
            gender: {
              type: "string",
              example: "Male",
            },
            age: {
              type: "integer",
              example: 30,
            },
            nin: {
              type: "string",
              example: "12345678901",
            },
            bvn: {
              type: "string",
              example: "22345678901",
            },
            vin: {
              type: "string",
              example: "32345678901234567890",
            },
            maritalStatus: {
              type: "string",
              example: "Single",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        CreateApiKeyRequest: {
          type: "object",
          properties: {
            maxUsage: {
              type: "integer",
              nullable: true,
            },
          },
          example: {
            maxUsage: 100,
          },
        },
        ApiKey: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            key: {
              type: "string",
            },
            valid: {
              type: "boolean",
            },
            usageCount: {
              type: "integer",
            },
            maxUsage: {
              type: "integer",
              nullable: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
