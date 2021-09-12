

-- Create a table
CREATE TABLE "products"(
                        "id" BIGSERIAL PRIMARY KEY NOT NULL,
                        "name" VARCHAR(255) NOT NULL ,

);

-- Create a table
CREATE TABLE "transactions"(
                        "id" BIGSERIAL PRIMARY KEY NOT NULL,
                        "quantity" INTEGER NOT NULL,
                        "time" INTEGER ,
                        "productId" INTEGER NOT NULL,
                        FOREIGN KEY ("productId") REFERENCES "products"("id")
);

-- Create data
INSERT INTO "products" ("name")
VALUES('John Doe'),
      ('Masum'),
      ('Rezaul');

INSERT INTO "transactions" ("quantity","time","productId")
VALUES(10, 1233434, 1),
      (100, 6754643, 2),
      (500, 565656, 3),
      (800, 87656546, 1),
      (900, 444444, 2);

-- Drop schema
DROP TABLE "Product"; DROP TABLE "Transaction";