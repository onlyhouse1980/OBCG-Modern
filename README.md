# OBCG - Orchard Beach Community Group - Customer Portal
 

Orchard Beach Community Group website with public documents, member water-usage tools, and private billing/admin features. The obcg.org platform combines a public community information site with authenticated customer tools for water-meter lookup, billing visibility, and spreadsheet-style meter-reading administration.

The public side provides Orchard Beach community content, governance records, newsletters, bylaws, permits, consumer confidence reports, water-system documents, historical notices, videos, contact/map pages, and a large meeting-minutes archive. Navigation is centralized through src/components/NavBar.js.

The member side includes email/password signup and login, an authenticated dashboard showing recent water usage and overage charges, meter lookup by serial number, usage calculations with a speedometer-style display, billing lookup by customer last name, charts for usage and billed amounts, and an admin spreadsheet editor backed by MongoDB.

Built with Next.js 16 App Router, React 19.2, JavaScript/JSX, TypeScript, MongoDB Atlas, Mongoose, NextAuth v4 Credentials, JWT sessions, bcrypt/bcryptjs, Resend, Recharts, MUI, Bootstrap, CSS Modules, Sass, Framer Motion, FontAwesome, Lucide, React Icons, Cloudinary, Next Image, and App Router API route handlers, the site mixes static public documents/media with dynamic authenticated customer and admin workflows.

MongoDB powers meter readings, dashboard data, lookup tools, spreadsheet edits, authentication, signup, login, and password-reset flows, with bundled fallback datasets used when database access is unavailable.

