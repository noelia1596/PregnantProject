create database pregnant;
use pregnant;
CREATE USER 'noe'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pregnant';

GRANT ALL PRIVILEGES on *.* to 'noe'@'localhost';

CREATE TABLE `usuarios` (
  `usuario` varchar(60) NOT NULL,
  `password` varchar(20) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `FechaNacimientoMama` date NOT NULL,
  `FechaEmbarazo` date DEFAULT NULL,
  `NombrePadre` varchar(30) DEFAULT NULL,
  `FechaNacimientoPadre` date DEFAULT NULL,
  `ApellidosPadre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`usuario`)
);

CREATE TABLE `antojos` (
	`id` int auto_increment,
  `usuario` varchar(60) NOT NULL,
  `NombreDelAntojo` varchar(50) NOT NULL,
  `TipoDeAntojo` varchar(50) DEFAULT NULL,
  `FechaDelAntojo` date DEFAULT NULL,
  `VecesDadasDelAntojo` int DEFAULT NULL,
  `AQuienLeDio` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  foreign key (`usuario`) references usuarios(`usuario`)
  on delete cascade
);

CREATE TABLE `pregnant`.`images` (
  `id` VARCHAR(300) NOT NULL,
  `usuario` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuario_idx` (`usuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario`
    FOREIGN KEY (`usuario`)
    REFERENCES `pregnant`.`usuarios` (`usuario`)
    ON DELETE CASCADE
   );

   CREATE TABLE `contracciones` (
	`id` int auto_increment,
     `usuario` varchar(60) NOT NULL,
     `inicio` datetime not null,
     `final` datetime not null,
	 PRIMARY KEY (`id`),
	foreign key (`usuario`) references usuarios(`usuario`)
	on delete cascade
);