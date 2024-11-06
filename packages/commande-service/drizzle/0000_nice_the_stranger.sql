CREATE TABLE IF NOT EXISTS "plats" (
	"id" serial PRIMARY KEY NOT NULL,
	"intitule" varchar(255) NOT NULL,
	CONSTRAINT "plats_intitule_unique" UNIQUE("intitule")
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS "commandes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
	"status" varchar(50) NOT NULL, -- Statut de la commande
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

-- Table d'association commande-plats
CREATE TABLE IF NOT EXISTS "commande_plats" (
	"id" serial PRIMARY KEY NOT NULL,
	"commande_id" integer NOT NULL REFERENCES "commandes" ("id") ON DELETE CASCADE,
	"plat_id" integer NOT NULL REFERENCES "plats" ("id") ON DELETE CASCADE,
	"quantite" integer NOT NULL CHECK (quantite > 0)
);