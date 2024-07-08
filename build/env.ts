import { z } from "zod";
import { configDotenv } from "dotenv";

configDotenv();

const schema = z.object({
  GITHUB_PAT: z.string().min(1),
  GITHUB_USERNAME: z.string().min(1),
});

const result = schema.safeParse(process.env);
if (result.success === false) {
  console.error("❌ Invalid environment variables");
  console.error(
    result.error.errors
      .map((error) => `- ${error.path.join(".")}: ${error.message}`)
      .join("\n"),
  );
  process.exit(1);
}

export const env = result.data;
