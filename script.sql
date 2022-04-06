CREATE TABLE sedes (
    id INT UNSIGNED AUTO_INCREMENT, 
    nombre VARCHAR(200) NOT NULL,
    calle VARCHAR(10) NOT NULL,
    carrera VARCHAR(10) NOT NULL,
    nomenclatura VARCHAR(10) NOT NULL, 
    barrio VARCHAR(50), 
    ciudad VARCHAR(100) NOT NULL, 
    descripcion TEXT,
    CONSTRAINT `pk_id_sedes` PRIMARY KEY(id) 
); 

/*INSERT*/

INSERT INTO sedes (calle,nombre,carrera,nomenclatura,ciudad)
VALUES ('Natura sede Medellín 323232342342424242','Calle 3','Carrera 3','NSD3','Medellín'),
('Natura sede Medellín 1','Calle 2','Carrera 2','NSD2','Medellín');

/*DELETE*/
DELETE FROM sedes WHERE nombre='Calle 3' OR nombre= 'Calle 2';
DELETE FROM sedes;
DELETE FROM sedes WHERE nombre='Calle 3' AND nomenclatura= 'NSD3';


/*UPDATE*/

UPDATE sedes 
SET nombre = 'Natura sede bogota', calle = 'Calle 70', ciudad = 'Bogota', barrio = 'Kenedy', descripcion = 'Buena sede'
WHERE id = 7;

/*SELECT*/
SELECT * FROM sedes;


ALTER TABLE sedes ADD CONSTRAINT `uq_nombre_sedes` UNIQUE(nombre);

CREATE TABLE productos (
    id INT UNSIGNED AUTO_INCREMENT, 
    nombre VARCHAR(255) NOT NULL, 
    descripcion VARCHAR(500), 
    numero_pasillo INT UNSIGNED NOT NULL, 
    estanteria VARCHAR(5) NOT NULL, 
    nivel INT NOT NULL, 
    precio FLOAT(6,3) UNSIGNED NOT NULL, 
    stock INT UNSIGNED DEFAULT 1, 
    id_sede INT UNSIGNED NOT NULL, 
    CONSTRAINT `pk_id_productos` PRIMARY KEY(id), 
    CONSTRAINT `fk_id_sede_productos` FOREIGN KEY (id_sede) REFERENCES sedes(id) 
);

ALTER TABLE productos ADD CONSTRAINT `uq_nombre_productos` UNIQUE(nombre);

CREATE TABLE ventas ( 
    id INT UNSIGNED AUTO_INCREMENT, 
    fecha DATE, 
    id_vendedor INT UNSIGNED, 
    id_cliente INT UNSIGNED, 
    id_sede INT UNSIGNED, 
    CONSTRAINT `pk_id_ventas` PRIMARY KEY(id), 
    CONSTRAINT `fk_id_vendedor_ventas` FOREIGN KEY (id_vendedor) REFERENCES usuarios(id) , 
    CONSTRAINT `fk_id_cliente_ventas` FOREIGN KEY (id_cliente) REFERENCES usuarios(id), 
    CONSTRAINT `fk_id_sede_ventas` FOREIGN KEY (id_sede) REFERENCES sedes(id) 
);