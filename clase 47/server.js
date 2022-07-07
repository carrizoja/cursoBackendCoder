import { serve } from "https://deno.land/std@0.147.0/http/server.ts";

serve((_req) => new Response("Hello World"), { port: 8080 });
console.log("Server running on http://localhost:8080");