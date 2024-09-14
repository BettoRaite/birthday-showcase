import { z } from "zod";
// [-]: Finish schema
export const WishFormSchema = z.object({
  authorName: z
    .string()
    .max(50, "Максимальное количество знаков 50")
    .trim()
    .optional(),
  role: z.enum(["", "студент", "учитель"]).optional(),
  group: z
    .string()
    .refine((value) => {
      if (!value) {
        return true;
      }
      const groupCodeRegex = /^\d{2}-\d{2}$/;
      return groupCodeRegex.test(value);
    }, "Неправильный формат, должно быть в виде хх-хх")
    .optional(),
  content: z
    .string()
    .max(500, "Максимальное количество знаков 500")
    .min(10, "Минимальное количество знаков для пожелания 10"),
});
