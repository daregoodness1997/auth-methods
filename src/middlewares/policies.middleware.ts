// RBAC , ABAC and ACL

import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";

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

export const authorize = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user as { role: Role };

    if (roles[role]?.includes("*") || roles[role]?.includes(permission)) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  };
};

export const authorizeRole = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user as { role: Role };

    if (role || allowedRoles.includes(role)) {
      next();
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
