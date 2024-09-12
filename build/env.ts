import { z } from "zod";
import { configDotenv } from "dotenv";

configDotenv();

// yeah ok might be overkill lol but I had more env variables before

const schema = z.object({
  GH_PAT: z.string().min(1),
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
