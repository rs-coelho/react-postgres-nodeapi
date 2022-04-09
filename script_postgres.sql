CREATE DATABASE "database"; 
CREATE TABLE IF NOT EXISTS "cadastros" ("codPessoa"  SERIAL , "nome" VARCHAR(100) NOT NULL,
 "telefone" INTEGER NOT NULL, "senhaEncriptada" VARCHAR(200) NOT NULL, "login" VARCHAR(40) NOT NULL,
 "cpf" INTEGER, "rg" INTEGER, "cnpj" INTEGER, "inscricaoEstadual" VARCHAR(100), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("codPessoa"));