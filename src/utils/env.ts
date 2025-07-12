import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    BUSINESSMAP_API_URL: z.string(),
    BUSINESSMAP_API_KEY: z.string(),
    BUSINESSMAP_READ_ONLY: z
      .string()
      .default("")
      .transform((val) => val === "true"),
  });

  const envVars = {
    BUSINESSMAP_API_URL: process.env.BUSINESSMAP_API_URL,
    BUSINESSMAP_API_KEY: process.env.BUSINESSMAP_API_KEY,
    BUSINESSMAP_READ_ONLY: process.env.BUSINESSMAP_READ_ONLY,
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n")}
  `
    );
  }

  return parsedEnv.data ?? {};
};

export const env = createEnv();
