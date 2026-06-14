import { pgTable, pgEnum, uuid, text, varchar, timestamp, unique } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['tenant', 'admin', 'superAdmin', 'publicViewer']);

export const users = pgTable("users", {
    id: uuid().primaryKey().notNull(),
    name: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 100 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 25 }).notNull(),
    avatarUrl: text('avatar_url'),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: 'string' }),
    role: roleEnum('role').notNull().default('publicViewer')
}, (table) => [
    unique("users_email_key").on(table.email),
]);