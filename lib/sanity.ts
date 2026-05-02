import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ujdzbxv0", // Grab this from your Sanity dashboard
  dataset: "production",
  apiVersion: "2024-03-20", 
  useCdn: true,
});