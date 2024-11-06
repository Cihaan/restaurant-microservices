CREATE TABLE IF NOT EXISTS "deliveries" (
	"id" serial PRIMARY KEY NOT NULL,
	"assigned_driver_id" varchar(255) NOT NULL,
	"status" "delivery_status" NOT NULL,
	"delivery_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "assigned_driver_id_idx" ON "deliveries" USING btree ("assigned_driver_id");