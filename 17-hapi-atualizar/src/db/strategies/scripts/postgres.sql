drop table if exists TB_Herois;
CREATE TABLE TB_HEROIS(
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

--CREATE
INSERT INTO TB_HEROIS (NOME, PODER)
 VALUES
  ('Flash', 'Velocidade'),
  ('Aquaman', 'Falacom os animais'),
  ('Batman', 'Dinheiro'),

  --READ
  SELECT * FROM TB_HEROIS
  SELECT * FROM TB_HEROIS WHERE NOME='Flash'

  --UPDATE
  UPDATE TB_HEROIS SET NOME='Goku', PODER='Deus' where ID=1;

  --DELETE

  DELETE FROM TB_HEROIS WHERE ID=2
