import { createClient } from "corebase-js";

export const corebase = createClient(import.meta.env.VITE_COREBASE_URL!, import.meta.env.VITE_COREBASE_PUBLIC_KEY!);
