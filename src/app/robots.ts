import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/login", "/mypage", "/payment/"],
    },
    sitemap: "https://sundayplay.life/sitemap.xml",
  };
}
