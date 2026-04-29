import { Request, Response } from "express";
import { DocumentService } from "../services/document.service";

export class DocumentController {
  private documentService: DocumentService;

  constructor() {
    this.documentService = new DocumentService();
  }

  async getDocumentById(req: Request, res: Response) {
    try {
      const document = await this.documentService.getDocumentById(
        req.params.id as string,
      );
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllDocuments(req: Request, res: Response) {
    try {
      const documents = await this.documentService.getAllDocuments();
      res.json(documents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createDocument(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const { userId } = req.user as { userId: string };
      const document = await this.documentService.createDocument({
        title,
        content,
        createdById: userId,
      });
      res.status(201).json(document);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateDocument(req: Request, res: Response) {
    try {
      const { title, content } = req.body;
      const document = await this.documentService.updateDocument(
        req.params.id as string,
        { title, content },
      );
      res.json(document);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteDocument(req: Request, res: Response) {
    try {
      await this.documentService.deleteDocument(req.params.id as string);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async addCollaborator(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const access = await this.documentService.addCollaborator(
        req.params.id as string,
        userId,
      );
      res.status(201).json(access);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async removeCollaborator(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      await this.documentService.removeCollaborator(
        req.params.id as string,
        userId,
      );
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
