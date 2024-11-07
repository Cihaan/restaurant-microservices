CREATE TABLE IF NOT EXISTS "plats" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"price" varchar NOT NULL,
	"image" varchar,
<<<<<<<< HEAD:packages/plats-service/drizzle/0000_handy_lionheart.sql
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
========
	"created_at" varchar,
	"updated_at" varchar
>>>>>>>> 5af8cf460c11d0b1ac08ff8fc75e744d41f88f55:packages/plats-service/drizzle/0000_slippery_grandmaster.sql
);
