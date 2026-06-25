import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AlHadi Cooling",
    short_name: "AlHadi Cooling",
    description:
      "AC installation, repair and appliance service in Jeddah. 24/7 emergency.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#A1C9F2",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
