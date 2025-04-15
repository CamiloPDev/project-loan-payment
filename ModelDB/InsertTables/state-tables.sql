INSERT INTO "EstadoPrestamo" ("estado", "descripcion") VALUES
('Pendiente', 'El préstamo ha sido solicitado pero no aprobado.'),
('Activo', 'El préstamo ha sido desembolsado y está en curso.'),
('Finalizado', 'El préstamo ha sido pagado completamente.'),
('Moroso', 'El préstamo tiene pagos vencidos.'),
('Cancelado', 'El préstamo fue cancelado antes de activarse.');

INSERT INTO "EstadoPrestatario" ("estado", "descripcion") VALUES
('Activo', 'El prestatario está habilitado para solicitar préstamos.'),
('Inactivo', 'El prestatario no puede realizar operaciones por el momento.'),
('Moroso', 'El prestatario tiene deudas vencidas.'),
('Vetado', 'El prestatario ha sido vetado por mal historial de pagos.');

COMMIT;