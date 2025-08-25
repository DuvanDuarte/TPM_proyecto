CREATE DATABASE `tmpdb`;

CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO tmpdb.usuarios
(idUsuario, nombre, email, pass)
VALUES(1, 'Daniel Gonzalez', 'dan@gmail.com', 'dannort12');
INSERT INTO tmpdb.usuarios
(idUsuario, nombre, email, pass)
VALUES(2, 'Duvan Duarte', 'duv@gmail.com', 'duva12');
INSERT INTO tmpdb.usuarios
(idUsuario, nombre, email, pass)
VALUES(3, 'Gabriel Arteaga', 'gabo@gmail.com', 'gabo12');