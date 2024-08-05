import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
<<<<<<< HEAD
  base: "/Buddy/",
=======
  base: "/", // Ensure this matches your deployment path
>>>>>>> master
  plugins: [react()],
});
