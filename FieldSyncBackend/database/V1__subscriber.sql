CREATE TABLE IF NOT EXISTS public."users" (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(255) NOT NULL,
  "createdAt" timestamp with time zone,
	"updatedAt" timestamp with time zone
);


ALTER TABLE IF EXISTS public."users"
	OWNER to testuser;

INSERT INTO users (name, company, email, phone, "createdAt", "updatedAt") VALUES
('Trey', 'Myself','tminarcin3@gmail.com', '(720) 209-6161', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);