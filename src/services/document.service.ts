import { prisma } from "../lib/prisma";

export class DocumentService {
  async getDocumentById(id: string) {
    return await prisma.document.findUnique({ where: { id } });
  }

  async getAllDocuments() {
    return await prisma.document.findMany();
  }

  async createDocument(data: {
    title: string;
    content: string;
    createdById: string;
  }) {
    return await prisma.document.create({ data });
  }

  async updateDocument(id: string, data: { title?: string; content?: string }) {
    return await prisma.document.update({ where: { id }, data });
  }

  async deleteDocument(id: string) {
    return await prisma.document.delete({ where: { id } });
  }

  async addCollaborator(documentId: string, userId: string) {
    return await prisma.accessList.create({
      data: {
        documentId,
        userId,
      },
    });
  }

  async removeCollaborator(documentId: string, userId: string) {
    const onwer = await prisma.document.findUnique({
      where: { id: documentId, createdById: userId },
    });

    if (!onwer) {
      throw new Error("Owner cannot be removed as collaborator");
    }

    return await prisma.accessList.deleteMany({
      where: {
        documentId,
        userId,
      },
    });
  }
}
