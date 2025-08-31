CREATE DATABASE `tmpdb`;

CREATE TABLE `tipousuario` (
  `idTipoUsuario` int NOT NULL AUTO_INCREMENT,
  `tipoUsuario` varchar(30) NOT NULL,
  PRIMARY KEY (`idTipoUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `idTipoUsuario` int NOT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `usuarios_tipousuario_FK` (`idTipoUsuario`),
  CONSTRAINT `usuarios_tipousuario_FK` FOREIGN KEY (`idTipoUsuario`) REFERENCES `tipousuario` (`idTipoUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO tmpdb.tipousuario
(idTipoUsuario, tipoUsuario)
VALUES(1, 'Admin');
INSERT INTO tmpdb.tipousuario
(idTipoUsuario, tipoUsuario)
VALUES(2, 'Entrenador');
INSERT INTO tmpdb.tipousuario
(idTipoUsuario, tipoUsuario)
VALUES(3, 'Deportista');

INSERT INTO tmpdb.usuarios
(idUsuario, nombre, email, pass, idTipoUsuario)
VALUES(1, 'Daniel Gonzalez', 'dan@gmail.com', 'dannort12', 1);
INSERT INTO tmpdb.usuarios
(idUsuario, nombre, email, pass, idTipoUsuario)
VALUES(2, 'Duvan Duarte', 'duv@gmail.com', 'duva12', 2);
INSERT INTO tmpdb.usuarios
(idUsuario, nombre, email, pass, idTipoUsuario)
VALUES(3, 'Gabriel Arteaga', 'gabo@gmail.com', 'gabo12', 3);