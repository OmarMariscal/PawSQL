-- 1. Tabla: cliente
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) UNIQUE,
    email VARCHAR(100) UNIQUE,
    fecha_registro DATE DEFAULT CURRENT_DATE
);

-- 2. Tabla: mascota
CREATE TABLE mascota (
    id_mascota SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raza VARCHAR(50),
    fecha_nacimiento DATE,
    CONSTRAINT fk_mascota_cliente 
        FOREIGN KEY (id_cliente) 
        REFERENCES cliente(id_cliente) ON DELETE CASCADE
);

-- 3. Tabla: veterinario
CREATE TABLE veterinario (
    id_veterinario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(80) NOT NULL,
    cedula_profesional VARCHAR(20) UNIQUE NOT NULL
);

-- 4. Tabla: consulta
CREATE TABLE consulta (
    id_consulta SERIAL PRIMARY KEY,
    id_mascota INT NOT NULL,
    id_veterinario INT NOT NULL,
    fecha_consulta DATE NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    peso_kg NUMERIC(5,2) CHECK (peso_kg > 0), -- Constraint de tipo CHECK
    CONSTRAINT fk_consulta_mascota 
        FOREIGN KEY (id_mascota) 
        REFERENCES mascota(id_mascota) ON DELETE CASCADE,
    CONSTRAINT fk_consulta_veterinario 
        FOREIGN KEY (id_veterinario) 
        REFERENCES veterinario(id_veterinario)
);

-- 5. Tabla: tratamiento
CREATE TABLE tratamiento (
    id_tratamiento SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    costo NUMERIC(10,2) CHECK (costo >= 0) -- Constraint de tipo CHECK
);

-- 6. Tabla: consulta_tratamiento (Relación Muchos a Muchos)
CREATE TABLE consulta_tratamiento (
    id_consulta INT NOT NULL,
    id_tratamiento INT NOT NULL,
    dosis_o_indicacion VARCHAR(255),
    PRIMARY KEY (id_consulta, id_tratamiento), -- Llave primaria compuesta
    CONSTRAINT fk_ct_consulta 
        FOREIGN KEY (id_consulta) 
        REFERENCES consulta(id_consulta) ON DELETE CASCADE,
    CONSTRAINT fk_ct_tratamiento 
        FOREIGN KEY (id_tratamiento) 
        REFERENCES tratamiento(id_tratamiento) ON DELETE CASCADE
);