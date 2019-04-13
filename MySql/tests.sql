

select * from usuarios;
select * from antojos;
select * from images;
select * from contracciones;
INSERT INTO pregnant.usuarios (usuario, password, Nombre, Apellidos, FechaNacimientoMama, FechaEmbarazo, NombrePadre, FechaNacimientoPadre, ApellidosPadre)
VALUES(?,?,?,?,?,?,?,?,?);

INSERT INTO pregnant.contracciones (usuario, inicio, final)
VALUES('1234', '2019-04-13 12:15:17', '2019-04-13 12:15:24');

update usuarios set FechaNacimientoMama= '2019-04-17 23:12:02' where usuario='1234';
select NOW();