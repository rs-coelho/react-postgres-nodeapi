CREATE DATABASE "database"; 
CREATE TABLE IF NOT EXISTS "cadastros" ("cpf_cnpj" VARCHAR(14) , "nome" VARCHAR(100), "senha" VARCHAR(200),
 "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("cpf_cnpj"));