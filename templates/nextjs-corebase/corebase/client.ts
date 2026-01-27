import { createClient } from "corebase-js";

export const corebase = createClient(process.env.NEXT_PUBLIC_COREBASE_URL!, process.env.NEXT_PUBLIC_COREBASE_PUBLIC_KEY!);
