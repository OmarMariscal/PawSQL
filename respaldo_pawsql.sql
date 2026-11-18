--
-- PostgreSQL database dump
--

\restrict KEtgHKbK7iT5pHMhjMmeBl1vQgNGT8wghTGGdHJY3ZZKaLBzH5G6nggICWGHrcl

-- Dumped from database version 15.19
-- Dumped by pg_dump version 15.19

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.mascota DROP CONSTRAINT IF EXISTS fk_mascota_cliente;
ALTER TABLE IF EXISTS ONLY public.consulta_tratamiento DROP CONSTRAINT IF EXISTS fk_ct_tratamiento;
ALTER TABLE IF EXISTS ONLY public.consulta_tratamiento DROP CONSTRAINT IF EXISTS fk_ct_consulta;
ALTER TABLE IF EXISTS ONLY public.consulta DROP CONSTRAINT IF EXISTS fk_consulta_veterinario;
ALTER TABLE IF EXISTS ONLY public.consulta DROP CONSTRAINT IF EXISTS fk_consulta_mascota;
ALTER TABLE IF EXISTS ONLY public.veterinario DROP CONSTRAINT IF EXISTS veterinario_pkey;
ALTER TABLE IF EXISTS ONLY public.veterinario DROP CONSTRAINT IF EXISTS veterinario_cedula_profesional_key;
ALTER TABLE IF EXISTS ONLY public.tratamiento DROP CONSTRAINT IF EXISTS tratamiento_pkey;
ALTER TABLE IF EXISTS ONLY public.mascota DROP CONSTRAINT IF EXISTS mascota_pkey;
ALTER TABLE IF EXISTS ONLY public.consulta_tratamiento DROP CONSTRAINT IF EXISTS consulta_tratamiento_pkey;
ALTER TABLE IF EXISTS ONLY public.consulta DROP CONSTRAINT IF EXISTS consulta_pkey;
ALTER TABLE IF EXISTS ONLY public.cliente DROP CONSTRAINT IF EXISTS cliente_telefono_key;
ALTER TABLE IF EXISTS ONLY public.cliente DROP CONSTRAINT IF EXISTS cliente_pkey;
ALTER TABLE IF EXISTS ONLY public.cliente DROP CONSTRAINT IF EXISTS cliente_email_key;
ALTER TABLE IF EXISTS public.veterinario ALTER COLUMN id_veterinario DROP DEFAULT;
ALTER TABLE IF EXISTS public.tratamiento ALTER COLUMN id_tratamiento DROP DEFAULT;
ALTER TABLE IF EXISTS public.mascota ALTER COLUMN id_mascota DROP DEFAULT;
ALTER TABLE IF EXISTS public.consulta ALTER COLUMN id_consulta DROP DEFAULT;
ALTER TABLE IF EXISTS public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.veterinario_id_veterinario_seq;
DROP TABLE IF EXISTS public.veterinario;
DROP SEQUENCE IF EXISTS public.tratamiento_id_tratamiento_seq;
DROP TABLE IF EXISTS public.tratamiento;
DROP SEQUENCE IF EXISTS public.mascota_id_mascota_seq;
DROP TABLE IF EXISTS public.mascota;
DROP TABLE IF EXISTS public.consulta_tratamiento;
DROP SEQUENCE IF EXISTS public.consulta_id_consulta_seq;
DROP TABLE IF EXISTS public.consulta;
DROP SEQUENCE IF EXISTS public.cliente_id_cliente_seq;
DROP TABLE IF EXISTS public.cliente;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cliente; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    nombre character varying(100) NOT NULL,
    telefono character varying(15),
    email character varying(100),
    fecha_registro date DEFAULT CURRENT_DATE
);


ALTER TABLE public.cliente OWNER TO admin;

--
-- Name: cliente_id_cliente_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.cliente_id_cliente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cliente_id_cliente_seq OWNER TO admin;

--
-- Name: cliente_id_cliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.cliente_id_cliente_seq OWNED BY public.cliente.id_cliente;


--
-- Name: consulta; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.consulta (
    id_consulta integer NOT NULL,
    id_mascota integer NOT NULL,
    id_veterinario integer NOT NULL,
    fecha_consulta date NOT NULL,
    motivo character varying(255) NOT NULL,
    peso_kg numeric(5,2),
    CONSTRAINT consulta_peso_kg_check CHECK ((peso_kg > (0)::numeric))
);


ALTER TABLE public.consulta OWNER TO admin;

--
-- Name: consulta_id_consulta_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.consulta_id_consulta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.consulta_id_consulta_seq OWNER TO admin;

--
-- Name: consulta_id_consulta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.consulta_id_consulta_seq OWNED BY public.consulta.id_consulta;


--
-- Name: consulta_tratamiento; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.consulta_tratamiento (
    id_consulta integer NOT NULL,
    id_tratamiento integer NOT NULL,
    dosis_o_indicacion character varying(255)
);


ALTER TABLE public.consulta_tratamiento OWNER TO admin;

--
-- Name: mascota; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.mascota (
    id_mascota integer NOT NULL,
    id_cliente integer NOT NULL,
    nombre character varying(50) NOT NULL,
    especie character varying(50) NOT NULL,
    raza character varying(50),
    fecha_nacimiento date
);


ALTER TABLE public.mascota OWNER TO admin;

--
-- Name: mascota_id_mascota_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.mascota_id_mascota_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mascota_id_mascota_seq OWNER TO admin;

--
-- Name: mascota_id_mascota_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.mascota_id_mascota_seq OWNED BY public.mascota.id_mascota;


--
-- Name: tratamiento; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tratamiento (
    id_tratamiento integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    costo numeric(10,2),
    CONSTRAINT tratamiento_costo_check CHECK ((costo >= (0)::numeric))
);


ALTER TABLE public.tratamiento OWNER TO admin;

--
-- Name: tratamiento_id_tratamiento_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.tratamiento_id_tratamiento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tratamiento_id_tratamiento_seq OWNER TO admin;

--
-- Name: tratamiento_id_tratamiento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.tratamiento_id_tratamiento_seq OWNED BY public.tratamiento.id_tratamiento;


--
-- Name: veterinario; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.veterinario (
    id_veterinario integer NOT NULL,
    nombre character varying(100) NOT NULL,
    especialidad character varying(80) NOT NULL,
    cedula_profesional character varying(20) NOT NULL
);


ALTER TABLE public.veterinario OWNER TO admin;

--
-- Name: veterinario_id_veterinario_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.veterinario_id_veterinario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.veterinario_id_veterinario_seq OWNER TO admin;

--
-- Name: veterinario_id_veterinario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.veterinario_id_veterinario_seq OWNED BY public.veterinario.id_veterinario;


--
-- Name: cliente id_cliente; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public.cliente_id_cliente_seq'::regclass);


--
-- Name: consulta id_consulta; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consulta ALTER COLUMN id_consulta SET DEFAULT nextval('public.consulta_id_consulta_seq'::regclass);


--
-- Name: mascota id_mascota; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.mascota ALTER COLUMN id_mascota SET DEFAULT nextval('public.mascota_id_mascota_seq'::regclass);


--
-- Name: tratamiento id_tratamiento; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tratamiento ALTER COLUMN id_tratamiento SET DEFAULT nextval('public.tratamiento_id_tratamiento_seq'::regclass);


--
-- Name: veterinario id_veterinario; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.veterinario ALTER COLUMN id_veterinario SET DEFAULT nextval('public.veterinario_id_veterinario_seq'::regclass);


--
-- Data for Name: cliente; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.cliente VALUES (1, 'Juan Perez', '5551234567', 'juan@email.com', '2023-01-15');
INSERT INTO public.cliente VALUES (2, 'Maria Garcia', '5552345678', 'maria@email.com', '2023-02-20');
INSERT INTO public.cliente VALUES (3, 'Carlos Lopez', '5553456789', 'carlos@email.com', '2023-03-10');
INSERT INTO public.cliente VALUES (4, 'Ana Martinez', '5554567890', 'ana@email.com', '2023-04-05');
INSERT INTO public.cliente VALUES (5, 'Luis Rodriguez', '5555678901', 'luis@email.com', '2023-05-12');
INSERT INTO public.cliente VALUES (6, 'Laura Gomez', '5556789012', 'laura@email.com', '2023-06-25');
INSERT INTO public.cliente VALUES (7, 'Jorge Diaz', '5557890123', 'jorge@email.com', '2023-07-30');
INSERT INTO public.cliente VALUES (8, 'Sofia Hernandez', '5558901234', 'sofia@email.com', '2023-08-14');
INSERT INTO public.cliente VALUES (9, 'Miguel Torres', '5559012345', 'miguel@email.com', '2023-09-18');
INSERT INTO public.cliente VALUES (10, 'Elena Flores', '5550123456', 'elena@email.com', '2023-10-22');


--
-- Data for Name: consulta; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.consulta VALUES (1, 1, 1, '2023-11-01', 'Revisión anual', 30.50);
INSERT INTO public.consulta VALUES (2, 2, 6, '2023-11-02', 'Vacunación', 4.20);
INSERT INTO public.consulta VALUES (3, 3, 2, '2023-11-03', 'Cojera pata delantera', 22.00);
INSERT INTO public.consulta VALUES (4, 4, 3, '2023-11-04', 'Alergia en la piel', 6.50);
INSERT INTO public.consulta VALUES (5, 5, 6, '2023-11-05', 'Control de peso', 5.80);
INSERT INTO public.consulta VALUES (6, 6, 1, '2023-11-06', 'Vómitos', 2.50);
INSERT INTO public.consulta VALUES (7, 7, 1, '2023-11-07', 'Chequeo general', 4.00);
INSERT INTO public.consulta VALUES (8, 8, 5, '2023-11-08', 'Problema al caminar', 25.00);
INSERT INTO public.consulta VALUES (9, 9, 10, '2023-11-09', 'Infección ocular', 8.00);
INSERT INTO public.consulta VALUES (10, 10, 6, '2023-11-10', 'Caída de pelo', 5.00);
INSERT INTO public.consulta VALUES (11, 11, 1, '2023-11-11', 'Vacunación múltiple', 12.00);
INSERT INTO public.consulta VALUES (12, 12, 6, '2023-11-12', 'Desparasitación', 3.50);


--
-- Data for Name: consulta_tratamiento; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.consulta_tratamiento VALUES (1, 1, 'Ninguna indicación adicional');
INSERT INTO public.consulta_tratamiento VALUES (2, 2, 'Aplicar refuerzo en 1 año');
INSERT INTO public.consulta_tratamiento VALUES (3, 7, 'Tomar 2 placas de la pata derecha');
INSERT INTO public.consulta_tratamiento VALUES (4, 1, 'Aplicar pomada 2 veces al día');
INSERT INTO public.consulta_tratamiento VALUES (5, 1, 'Cambio de dieta a comida light');
INSERT INTO public.consulta_tratamiento VALUES (6, 9, 'Ayuno de 8 horas previo al estudio');
INSERT INTO public.consulta_tratamiento VALUES (7, 3, 'Tableta vía oral, repetir en 15 días');
INSERT INTO public.consulta_tratamiento VALUES (8, 7, 'Reposo absoluto por 1 semana');
INSERT INTO public.consulta_tratamiento VALUES (9, 10, 'Limpieza ocular cada 8 horas con solución');
INSERT INTO public.consulta_tratamiento VALUES (10, 9, 'Resultados pendientes en 24 horas');
INSERT INTO public.consulta_tratamiento VALUES (1, 2, 'Vacuna aplicada con éxito');
INSERT INTO public.consulta_tratamiento VALUES (3, 10, 'Curación y vendaje ligero');
INSERT INTO public.consulta_tratamiento VALUES (6, 1, 'Se recetan antieméticos para control en casa');


--
-- Data for Name: mascota; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.mascota VALUES (1, 1, 'Max', 'Perro', 'Labrador', '2020-05-10');
INSERT INTO public.mascota VALUES (2, 2, 'Luna', 'Gato', 'Siamés', '2021-03-15');
INSERT INTO public.mascota VALUES (3, 3, 'Rocky', 'Perro', 'Bulldog', '2019-11-20');
INSERT INTO public.mascota VALUES (4, 4, 'Bella', 'Perro', 'Poodle', '2022-01-05');
INSERT INTO public.mascota VALUES (5, 5, 'Milo', 'Gato', 'Persa', '2020-08-30');
INSERT INTO public.mascota VALUES (6, 6, 'Coco', 'Perro', 'Chihuahua', '2021-12-12');
INSERT INTO public.mascota VALUES (7, 7, 'Simba', 'Gato', 'Mestizo', '2022-04-18');
INSERT INTO public.mascota VALUES (8, 8, 'Kira', 'Perro', 'Husky', '2018-07-25');
INSERT INTO public.mascota VALUES (9, 9, 'Lola', 'Perro', 'Pug', '2023-02-14');
INSERT INTO public.mascota VALUES (10, 10, 'Nala', 'Gato', 'Bengalí', '2021-09-09');
INSERT INTO public.mascota VALUES (11, 1, 'Toby', 'Perro', 'Beagle', '2022-06-20');
INSERT INTO public.mascota VALUES (12, 2, 'Mia', 'Gato', 'Angora', '2019-04-11');


--
-- Data for Name: tratamiento; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.tratamiento VALUES (1, 'Consulta General', 'Revisión física completa del animal', 350.00);
INSERT INTO public.tratamiento VALUES (2, 'Vacunación Antirrábica', 'Aplicación de vacuna contra la rabia', 250.00);
INSERT INTO public.tratamiento VALUES (3, 'Desparasitación', 'Tratamiento contra parásitos internos y externos', 200.00);
INSERT INTO public.tratamiento VALUES (4, 'Limpieza Dental', 'Profilaxis dental bajo anestesia', 1200.00);
INSERT INTO public.tratamiento VALUES (5, 'Esterilización Canina', 'Cirugía de esterilización para perros', 1500.00);
INSERT INTO public.tratamiento VALUES (6, 'Esterilización Felina', 'Cirugía de esterilización para gatos', 1000.00);
INSERT INTO public.tratamiento VALUES (7, 'Radiografía', 'Estudio de rayos X, por placa', 450.00);
INSERT INTO public.tratamiento VALUES (8, 'Ecografía', 'Estudio de ultrasonido abdominal', 600.00);
INSERT INTO public.tratamiento VALUES (9, 'Análisis de Sangre', 'Biometría hemática y química sanguínea', 800.00);
INSERT INTO public.tratamiento VALUES (10, 'Curación de Herida', 'Limpieza y sutura de heridas superficiales', 400.00);


--
-- Data for Name: veterinario; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.veterinario VALUES (1, 'Dr. Roberto Santos', 'Medicina General', 'CED1001');
INSERT INTO public.veterinario VALUES (2, 'Dra. Carmen Vega', 'Cirugía', 'CED1002');
INSERT INTO public.veterinario VALUES (3, 'Dr. Fernando Rios', 'Dermatología', 'CED1003');
INSERT INTO public.veterinario VALUES (4, 'Dra. Patricia Luna', 'Cardiología', 'CED1004');
INSERT INTO public.veterinario VALUES (5, 'Dr. Ricardo Silva', 'Ortopedia', 'CED1005');
INSERT INTO public.veterinario VALUES (6, 'Dra. Silvia Mendez', 'Medicina Felina', 'CED1006');
INSERT INTO public.veterinario VALUES (7, 'Dr. Alberto Cruz', 'Exóticos', 'CED1007');
INSERT INTO public.veterinario VALUES (8, 'Dra. Natalia Ruiz', 'Oncología', 'CED1008');
INSERT INTO public.veterinario VALUES (9, 'Dr. Hugo Reyes', 'Neurología', 'CED1009');
INSERT INTO public.veterinario VALUES (10, 'Dra. Monica Castro', 'Oftalmología', 'CED1010');


--
-- Name: cliente_id_cliente_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.cliente_id_cliente_seq', 10, true);


--
-- Name: consulta_id_consulta_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.consulta_id_consulta_seq', 12, true);


--
-- Name: mascota_id_mascota_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.mascota_id_mascota_seq', 12, true);


--
-- Name: tratamiento_id_tratamiento_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.tratamiento_id_tratamiento_seq', 10, true);


--
-- Name: veterinario_id_veterinario_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.veterinario_id_veterinario_seq', 10, true);


--
-- Name: cliente cliente_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_email_key UNIQUE (email);


--
-- Name: cliente cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);


--
-- Name: cliente cliente_telefono_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_telefono_key UNIQUE (telefono);


--
-- Name: consulta consulta_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT consulta_pkey PRIMARY KEY (id_consulta);


--
-- Name: consulta_tratamiento consulta_tratamiento_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consulta_tratamiento
    ADD CONSTRAINT consulta_tratamiento_pkey PRIMARY KEY (id_consulta, id_tratamiento);


--
-- Name: mascota mascota_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.mascota
    ADD CONSTRAINT mascota_pkey PRIMARY KEY (id_mascota);


--
-- Name: tratamiento tratamiento_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tratamiento
    ADD CONSTRAINT tratamiento_pkey PRIMARY KEY (id_tratamiento);


--
-- Name: veterinario veterinario_cedula_profesional_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.veterinario
    ADD CONSTRAINT veterinario_cedula_profesional_key UNIQUE (cedula_profesional);


--
-- Name: veterinario veterinario_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.veterinario
    ADD CONSTRAINT veterinario_pkey PRIMARY KEY (id_veterinario);


--
-- Name: consulta fk_consulta_mascota; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT fk_consulta_mascota FOREIGN KEY (id_mascota) REFERENCES public.mascota(id_mascota) ON DELETE CASCADE;


--
-- Name: consulta fk_consulta_veterinario; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consulta
    ADD CONSTRAINT fk_consulta_veterinario FOREIGN KEY (id_veterinario) REFERENCES public.veterinario(id_veterinario);


--
-- Name: consulta_tratamiento fk_ct_consulta; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consulta_tratamiento
    ADD CONSTRAINT fk_ct_consulta FOREIGN KEY (id_consulta) REFERENCES public.consulta(id_consulta) ON DELETE CASCADE;


--
-- Name: consulta_tratamiento fk_ct_tratamiento; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.consulta_tratamiento
    ADD CONSTRAINT fk_ct_tratamiento FOREIGN KEY (id_tratamiento) REFERENCES public.tratamiento(id_tratamiento) ON DELETE CASCADE;


--
-- Name: mascota fk_mascota_cliente; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.mascota
    ADD CONSTRAINT fk_mascota_cliente FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict KEtgHKbK7iT5pHMhjMmeBl1vQgNGT8wghTGGdHJY3ZZKaLBzH5G6nggICWGHrcl

