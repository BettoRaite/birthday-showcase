import type { WishFormSchema } from "./schemas";
export type ScopeData = Record<string, unknown>;
export type WishFormItem = ReturnType<typeof WishFormSchema.parse>;
