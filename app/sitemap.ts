import type { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/getPosts";

const SITE_URL = "https://www.agilecoder.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts(["slug", "date"]) || [];

  const pages = [
    { url: `${SITE_URL}/`, lastModified: new Date() },
    { url: `${SITE_URL}/blog`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date() },
    { url: `${SITE_URL}/terms-of-service`, lastModified: new Date() },
  ];

  const postsUrls = posts
    .filter((post) => post?.slug)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date || new Date(),
    }));

  return [...pages, ...postsUrls];
}
