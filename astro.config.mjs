import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  integrations: [
    icon({
      include: {
        pixel: [
          "briefcase",
          "trophy",
          "heart",
          "badge-check",
          "book",
          "lightbulb",
          "folder",
          "twitter",
          "github",
          "bluesky",
          "instagram",
          "linkedin",
        ],
      },
    }),
  ],
});
