# UTS Enterprise Website - Phase 10 & Future Roadmap

The codebase has reached `v1.0 Production Ready`. The architecture is fully static, secure, and optimized for maximum speed and SEO.

The next evolutionary phases of the platform involve transitioning from a static marketing layer into a full-scale digital ecosystem.

## Phase 10: Backend & Database Architecture
- **Supabase Integration:** Setup PostgreSQL schema for products, categories, and brands to replace static mock data (`mockBrands.ts`, `mockProducts.ts`).
- **Content Management System (CMS):** Connect a headless CMS (Sanity / Strapi / Supabase Admin) allowing the UTS team to manage inventory without touching code.
- **Server Actions:** Refactor the Quote Form and Contact Form to securely process data server-side and insert it into a Supabase `leads` table.
- **Transactional Email:** Integrate Resend/Nodemailer to send immediate confirmation emails to clients upon requesting a quote.

## Phase 11: Portals & Authentication
- **Dealer Portal:** Secure login area for verified dealers to view B2B pricing, download technical data sheets, and track orders.
- **Customer Portal:** Client login to view quotation statuses, invoices, and service booking histories.

## Phase 12: Enterprise Integrations
- **CRM Sync:** Push lead data automatically to Salesforce / HubSpot.
- **ERP Integration:** Inventory sync with backend SAP or Tally systems.
- **AI Semantic Search:** Implement vector embeddings on product descriptions using OpenAI or Gemini API, allowing users to search by concept (e.g., "valve for high temperature steam").
- **WhatsApp API:** Automated WhatsApp bot for immediate customer query resolution.
