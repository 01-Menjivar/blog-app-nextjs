import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL);

const password = "password123";
const passwordHash = await bcrypt.hash(password, 10);

await sql`TRUNCATE TABLE blogs, users RESTART IDENTITY CASCADE`;

const [alice, bob] = await sql`
  INSERT INTO users (username, name, password_hash) VALUES
    ('alice', 'Alice Johnson', ${passwordHash}),
    ('bob', 'Bob Smith', ${passwordHash})
  RETURNING id`;

await sql`
  INSERT INTO blogs (title, author, url, likes, user_id) VALUES
    ('Intro to Next.js', 'Alice Johnson', 'https://nextjs.org/docs', 5, ${alice.id}),
    ('Drizzle ORM basics', 'Alice Johnson', 'https://orm.drizzle.team', 3, ${alice.id}),
    ('Authentication with NextAuth', 'Bob Smith', 'https://authjs.dev', 7, ${bob.id})`;

console.log(`Seeded 2 users (alice, bob) with password "${password}" and 3 blogs`);
