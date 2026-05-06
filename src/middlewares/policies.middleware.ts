// RBAC , ABAC and ACL

import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

export const roles = {
  ADMIN: ["*"],
  STAFF: [
    "edit:order",
    "view:order",
    "create:order",
    "create:item",
    "edit:item",
  ],
  USER: ["view:order", "create:order"],
};

export const authorize = (claim: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user as { role: Role };

    if (roles[role]?.includes("*") || roles[role]?.includes(claim)) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  };
};

export const authorizeRole = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user as { role: Role };

    if (role && allowedRoles.includes(role)) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  };
};

export const authorizeByAttribute = (attribute: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { departmentId } = req.user as { departmentId: string };

    if (departmentId === attribute) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  };
};

export const authorizeAccess = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.user as { userId: string };
  const { id: resourceId } = req.params;

  const owner = await prisma.document.findUnique({
    where: { id: `${resourceId}`, createdById: userId },
  });

  if (owner) {
    return next();
  }

  const access = await prisma.accessList.findFirst({
    where: {
      userId,
      documentId: `${resourceId}`,
    },
  });

  if (access) {
    return next();
  }

  return res.status(403).json({ message: "Forbidden" });
};
