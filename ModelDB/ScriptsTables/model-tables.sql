CREATE TABLE "EstadoPrestatario" (
    "id" SERIAL PRIMARY KEY,
    "estado" VARCHAR NOT NULL,
    "descripcion" VARCHAR
);

CREATE TABLE "EstadoPrestamo" (
    "id" SERIAL PRIMARY KEY,
    "estado" VARCHAR NOT NULL,
    "descripcion" VARCHAR
);

CREATE TABLE "Prestatario" (
    "id" INT PRIMARY KEY,
    "nombres" VARCHAR NOT NULL,
    "apellidos" VARCHAR NOT NULL,
    "telefono" VARCHAR,
    "fechaRegistro" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "idEstadoPrestatario" INT REFERENCES "EstadoPrestatario"("id")
);

CREATE TABLE "Prestamos" (
    "id" SERIAL PRIMARY KEY,
    "idPrestatario" INT REFERENCES "Prestatario"("id"),
    "montoPrestamo" INT NOT NULL,
    "tasaInteres" DECIMAL(5, 2) NOT NULL,
    "fecha" TIME NOT NULL,
    "fechaPlazoFinal" TIME NOT NULL,
    "idEstadoPrestamo" INT REFERENCES "EstadoPrestamo"("id")
);

CREATE TABLE "Pagos" (
    "id" SERIAL PRIMARY KEY,
    "idPrestamo" INT REFERENCES "Prestamos"("id"),
    "pagoAbono" DECIMAL(10, 2) NOT NULL,
    "pagoInteres" DECIMAL(10, 2) NOT NULL,
    "fecha" TIME NOT NULL
);

COMMIT;