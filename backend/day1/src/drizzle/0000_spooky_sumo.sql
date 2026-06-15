CREATE TYPE "public"."role" AS ENUM('tenant', 'admin', 'superAdmin', 'publicViewer');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone_number" varchar(25) NOT NULL,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"role" "role" DEFAULT 'publicViewer' NOT NULL,
	CONSTRAINT "users_email_key" UNIQUE("email")
);

