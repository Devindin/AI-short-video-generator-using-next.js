/**@type {import("drizzle-kit").Config} */
export default{
    schema:"./configs/schema.js",
    dialect:"postgresql",
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_w0nfIM9ZzOaV@ep-proud-wave-a83v1blz-pooler.eastus2.azure.neon.tech/ai-short-video-generator?sslmode=require',
    }
}
