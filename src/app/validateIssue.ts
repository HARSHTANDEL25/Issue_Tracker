import { z } from "zod";

// HERE WE ARE VALIDATING THE ISSUE DATa with the zos livrary
//we only validate the 2 properties others are by default so
export const validateIssue = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required").max(500),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
});
  