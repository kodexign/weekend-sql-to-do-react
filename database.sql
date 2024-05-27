CREATE TABLE "todolist" (
	"id" SERIAL PRIMARY KEY,
	"task" varchar(255),
	"complete" BOOLEAN DEFAULT FALSE
);
INSERT INTO todolist ("task", "complete")
VALUES 
('grocery shop', false),
('meal prep', false),
('clean kitchen', false),
('clean bathroom', false);
