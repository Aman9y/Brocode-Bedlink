import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 uses Turbopack by default; configure CSS handling here.
  // The @import "tailwindcss" directive is processed by the PostCSS plugin
  // defined in postcss.config.mjs (@tailwindcss/postcss).
  turbopack: {
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
};

export default nextConfig;
