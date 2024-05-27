CREATE TABLE "todolist" (
	"id" SERIAL PRIMARY KEY,
	"todo" varchar(255),
	"complete" BOOLEAN DEFAULT FALSE
);
INSERT INTO todolist ("todo", "complete")
VALUES 
('grocery shop', false),
('meal prep', false),
('clean kitchen', false),
('clean bathroom', false);