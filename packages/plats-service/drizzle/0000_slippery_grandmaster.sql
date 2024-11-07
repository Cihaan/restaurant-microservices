CREATE TABLE IF NOT EXISTS "plats" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"price" varchar NOT NULL,
	"image" varchar,
	"created_at" varchar,
	"updated_at" varchar
);
