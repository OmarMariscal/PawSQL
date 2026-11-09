-- 1. Insertar Clientes (10 registros)
INSERT INTO cliente (nombre, telefono, email, fecha_registro) VALUES
('Juan Perez', '5551234567', 'juan@email.com', '2023-01-15'),
('Maria Garcia', '5552345678', 'maria@email.com', '2023-02-20'),
('Carlos Lopez', '5553456789', 'carlos@email.com', '2023-03-10'),
('Ana Martinez', '5554567890', 'ana@email.com', '2023-04-05'),
('Luis Rodriguez', '5555678901', 'luis@email.com', '2023-05-12'),
('Laura Gomez', '5556789012', 'laura@email.com', '2023-06-25'),
('Jorge Diaz', '5557890123', 'jorge@email.com', '2023-07-30'),
('Sofia Hernandez', '5558901234', 'sofia@email.com', '2023-08-14'),
('Miguel Torres', '5559012345', 'miguel@email.com', '2023-09-18'),
('Elena Flores', '5550123456', 'elena@email.com', '2023-10-22');

-- 2. Insertar Veterinarios (10 registros)
INSERT INTO veterinario (nombre, especialidad, cedula_profesional) VALUES
('Dr. Roberto Santos', 'Medicina General', 'CED1001'),
('Dra. Carmen Vega', 'Cirugía', 'CED1002'),
('Dr. Fernando Rios', 'Dermatología', 'CED1003'),
('Dra. Patricia Luna', 'Cardiología', 'CED1004'),
('Dr. Ricardo Silva', 'Ortopedia', 'CED1005'),
('Dra. Silvia Mendez', 'Medicina Felina', 'CED1006'),
('Dr. Alberto Cruz', 'Exóticos', 'CED1007'),
('Dra. Natalia Ruiz', 'Oncología', 'CED1008'),
('Dr. Hugo Reyes', 'Neurología', 'CED1009'),
('Dra. Monica Castro', 'Oftalmología', 'CED1010');

-- 3. Insertar Mascotas (12 registros)
-- Nota: id_cliente corresponde a los generados en el paso 1 (1 al 10)
INSERT INTO mascota (id_cliente, nombre, especie, raza, fecha_nacimiento) VALUES
(1, 'Max', 'Perro', 'Labrador', '2020-05-10'),
(2, 'Luna', 'Gato', 'Siamés', '2021-03-15'),
(3, 'Rocky', 'Perro', 'Bulldog', '2019-11-20'),
(4, 'Bella', 'Perro', 'Poodle', '2022-01-05'),
(5, 'Milo', 'Gato', 'Persa', '2020-08-30'),
(6, 'Coco', 'Perro', 'Chihuahua', '2021-12-12'),
(7, 'Simba', 'Gato', 'Mestizo', '2022-04-18'),
(8, 'Kira', 'Perro', 'Husky', '2018-07-25'),
(9, 'Lola', 'Perro', 'Pug', '2023-02-14'),
(10, 'Nala', 'Gato', 'Bengalí', '2021-09-09'),
(1, 'Toby', 'Perro', 'Beagle', '2022-06-20'),
(2, 'Mia', 'Gato', 'Angora', '2019-04-11');

-- 4. Insertar Tratamientos (10 registros)
INSERT INTO tratamiento (nombre, descripcion, costo) VALUES
('Consulta General', 'Revisión física completa del animal', 350.00),
('Vacunación Antirrábica', 'Aplicación de vacuna contra la rabia', 250.00),
('Desparasitación', 'Tratamiento contra parásitos internos y externos', 200.00),
('Limpieza Dental', 'Profilaxis dental bajo anestesia', 1200.00),
('Esterilización Canina', 'Cirugía de esterilización para perros', 1500.00),
('Esterilización Felina', 'Cirugía de esterilización para gatos', 1000.00),
('Radiografía', 'Estudio de rayos X, por placa', 450.00),
('Ecografía', 'Estudio de ultrasonido abdominal', 600.00),
('Análisis de Sangre', 'Biometría hemática y química sanguínea', 800.00),
('Curación de Herida', 'Limpieza y sutura de heridas superficiales', 400.00);

-- 5. Insertar Consultas (12 registros)
-- Se respeta el CHECK (peso_kg > 0)
INSERT INTO consulta (id_mascota, id_veterinario, fecha_consulta, motivo, peso_kg) VALUES
(1, 1, '2023-11-01', 'Revisión anual', 30.5),
(2, 6, '2023-11-02', 'Vacunación', 4.2),
(3, 2, '2023-11-03', 'Cojera pata delantera', 22.0),
(4, 3, '2023-11-04', 'Alergia en la piel', 6.5),
(5, 6, '2023-11-05', 'Control de peso', 5.8),
(6, 1, '2023-11-06', 'Vómitos', 2.5),
(7, 1, '2023-11-07', 'Chequeo general', 4.0),
(8, 5, '2023-11-08', 'Problema al caminar', 25.0),
(9, 10, '2023-11-09', 'Infección ocular', 8.0),
(10, 6, '2023-11-10', 'Caída de pelo', 5.0),
(11, 1, '2023-11-11', 'Vacunación múltiple', 12.0),
(12, 6, '2023-11-12', 'Desparasitación', 3.5);

-- 6. Insertar Consulta_Tratamiento (Relación muchos a muchos, 13 registros)
INSERT INTO consulta_tratamiento (id_consulta, id_tratamiento, dosis_o_indicacion) VALUES
(1, 1, 'Ninguna indicación adicional'),
(2, 2, 'Aplicar refuerzo en 1 año'),
(3, 7, 'Tomar 2 placas de la pata derecha'),
(4, 1, 'Aplicar pomada 2 veces al día'),
(5, 1, 'Cambio de dieta a comida light'),
(6, 9, 'Ayuno de 8 horas previo al estudio'),
(7, 3, 'Tableta vía oral, repetir en 15 días'),
(8, 7, 'Reposo absoluto por 1 semana'),
(9, 10, 'Limpieza ocular cada 8 horas con solución'),
(10, 9, 'Resultados pendientes en 24 horas'),
(1, 2, 'Vacuna aplicada con éxito'),
(3, 10, 'Curación y vendaje ligero'),
(6, 1, 'Se recetan antieméticos para control en casa');