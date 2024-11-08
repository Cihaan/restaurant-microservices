CREATE TABLE IF NOT EXISTS "deliveries" (
	"id" serial PRIMARY KEY NOT NULL,
	"assigned_driver_id" varchar(255) NOT NULL,
	"delivery_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drivers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"order_id" varchar,
	"status" "driver_status" DEFAULT 'available',
	"assigned_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now()
);
