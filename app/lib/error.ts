"use client";
import type { ScopeData } from "./definitions";
export class AppError extends Error {
  public readonly isOperational: boolean;
  public readonly scopeData: ScopeData;
  constructor(
    description: string,
    isOperational: boolean,
    scopeData: ScopeData = {}
  ) {
    super(description);
    this.isOperational = isOperational;
    this.name = "AppError";
    this.scopeData = scopeData;
  }
}
