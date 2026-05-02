import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "YOUR_PROJECT_ID", // Grab this from your Sanity dashboard
  dataset: "production",
  apiVersion: "2024-03-20", 
  useCdn: true,
});