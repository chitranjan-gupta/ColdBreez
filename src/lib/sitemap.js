import { WEBSITE_URL } from "@/lib/name";

export function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
         <loc>${WEBSITE_URL}</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
         <priority>1.00</priority>
       </url>
       <url>
         <loc>${WEBSITE_URL}/news</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
         <priority>0.80</priority>
       </url>
       <url>
          <loc>${WEBSITE_URL}/about</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.80</priority>
      </url>
      <url>
          <loc>${WEBSITE_URL}/privacypolicy</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.80</priority>
      </url>
      <url>
          <loc>${WEBSITE_URL}/contactus</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.80</priority>
      </url>
      <url>
          <loc>${WEBSITE_URL}/disclaimer</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.80</priority>
      </url>
      <url>
          <loc>${WEBSITE_URL}/signin</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.80</priority>
      </url>
      <url>
          <loc>${WEBSITE_URL}/signup</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.64</priority>
      </url>
       ${posts
         .map(({ _id, slug = "", lastModified = new Date(),categories, subcategories }) => {
           return `
         <url>
             <loc>${WEBSITE_URL}/news/${categories[0].toLowerCase()}/${subcategories[0].toLowerCase()}/${slug.current}</loc>
             <lastmod>${new Date(lastModified).toISOString()}</lastmod>
             <priority>0.80</priority>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
}
