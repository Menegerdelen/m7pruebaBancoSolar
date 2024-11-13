CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nombre VARCHAR(50),
balance FLOAT CHECK (balance >= 0));

CREATE TABLE transferencias (id SERIAL PRIMARY KEY, emisor INT, receptor
INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY (emisor) REFERENCES
usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));

select * from usuarios

INSERT INTO usuarios (nombre, balance) VALUES 
('Juan Pérez', 150000),
('María López', 230000),
('Carlos Sánchez', 125000),
('Ana González', 190000),
('Luis Fernández', 800000),
('Sofía Martínez', 275000),
('Pablo Ramírez', 300000),
('Laura Torres', 350000),
('Diego Vargas', 220000),
('Lucía Rojas', 185000);


select * from transferencias

begin
INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES 
(1, 2, 25000, '2023-10-01 10:30:00'),
(3, 4, 30050, '2023-10-02 11:00:00'),
(5, 6, 15075, '2023-10-03 09:15:00'),
(7, 8, 50000, '2023-10-04 12:00:00'),
(9, 10, 20020, '2023-10-05 14:45:00'),
(2, 3, 35000, '2023-10-06 16:30:00'),
(4, 5, 40050, '2023-10-07 10:10:00'),
(6, 7, 17575, '2023-10-08 11:45:00'),
(8, 9, 60000, '2023-10-09 13:30:00'),
(10, 1, 45000, '2023-10-10 15:15:00');
commit;