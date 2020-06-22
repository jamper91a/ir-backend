

-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`users` (`id`, `name`, `username`, `password`, `username_rfdi`, `password_rfdi`, `active`, `group_id`, `createdAt`, `updatedAt`) VALUES (1, 'SAdmin', 'superAdmin', '$2a$10$Q9UXHnOJbe0puFTeZmT.Q.vBRoP.OP/PeDMGIV3mZB/HPQAimu1.m', ' ', NULL, 1, 1, '2018-08-10 00:00:00', '2018-08-10 00:00:00');
INSERT INTO `inventarioRealTest`.`users` (`id`, `name`, `username`, `password`, `username_rfdi`, `password_rfdi`, `active`, `group_id`, `createdAt`, `updatedAt`) VALUES (2, 'Gerente Inv Real', 'gerente@ir.com', '$2a$10$Q9UXHnOJbe0puFTeZmT.Q.vBRoP.OP/PeDMGIV3mZB/HPQAimu1.m', NULL, NULL, 1, 2, '2018-08-10 00:00:00', '2018-08-10 00:00:00');
INSERT INTO `inventarioRealTest`.`users` (`id`, `name`, `username`, `password`, `username_rfdi`, `password_rfdi`, `active`, `group_id`, `createdAt`, `updatedAt`) VALUES (3, 'Cajero Inv Real', 'cajero@ir.com', '$2a$10$Q9UXHnOJbe0puFTeZmT.Q.vBRoP.OP/PeDMGIV3mZB/HPQAimu1.m', NULL, NULL, 1, 3, '2019-11-15 15:28:53', '2019-11-15 15:28:53');
INSERT INTO `inventarioRealTest`.`users` (`id`, `name`, `username`, `password`, `username_rfdi`, `password_rfdi`, `active`, `group_id`, `createdAt`, `updatedAt`) VALUES (4, 'Dealer Inv Real', 'dealer@ir.com', '$2a$10$Q9UXHnOJbe0puFTeZmT.Q.vBRoP.OP/PeDMGIV3mZB/HPQAimu1.m', NULL, NULL, 1, 5, '2019-11-15 15:28:53', '2019-11-15 15:28:53');
INSERT INTO `inventarioRealTest`.`users` (`id`, `name`, `username`, `password`, `username_rfdi`, `password_rfdi`, `active`, `group_id`, `createdAt`, `updatedAt`) VALUES (5, 'Gerente Calle 80', 'gerente80@ir.com', '$2a$10$Q9UXHnOJbe0puFTeZmT.Q.vBRoP.OP/PeDMGIV3mZB/HPQAimu1.m', NULL, NULL, 1, 6, '2019-11-15 15:28:53', '2019-11-15 15:28:53');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`groups`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (1, 'SuperAdministrador', '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (2, 'Administrador Empresa', '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (3, 'Cajero', '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (4, 'Bodega', '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (5, 'Distribuidor', '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (6, 'Administrador Local', '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (DEFAULT, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`dealers`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`dealers` (`id`, `name`, `user_id`, `createdAt`, `updatedAt`) VALUES (1, 'Inventario Real', 4, '2019-11-11', '2019-11-11');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`companies`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`companies` (`id`, `name`, `photo`, `dealer_id`, `user_id`, `createdAt`, `updatedAt`) VALUES (1, 'Inventario Real', NULL, 1, 2, '2018-08-10', '2018-08-10');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`suppliers`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`suppliers` (`id`, `name`, `company_id`, `createdAt`, `updatedAt`) VALUES (1, 'Sin proovedor', 1, '2018-10-24', '2018-10-24');
INSERT INTO `inventarioRealTest`.`suppliers` (`id`, `name`, `company_id`, `createdAt`, `updatedAt`) VALUES (2, 'Arturo Calle', 1, '2018-10-24', '2018-10-24');
INSERT INTO `inventarioRealTest`.`suppliers` (`id`, `name`, `company_id`, `createdAt`, `updatedAt`) VALUES (8, 'Sin proveedor', 1, '2018-10-24', '2018-10-24');
INSERT INTO `inventarioRealTest`.`suppliers` (`id`, `name`, `company_id`, `createdAt`, `updatedAt`) VALUES (9, 'Arturo Calle', 1, '2018-10-24', '2018-10-24');
INSERT INTO `inventarioRealTest`.`suppliers` (`id`, `name`, `company_id`, `createdAt`, `updatedAt`) VALUES (10, 'Pat Primo', 1, '2018-10-24', '2018-10-24');
INSERT INTO `inventarioRealTest`.`suppliers` (`id`, `name`, `company_id`, `createdAt`, `updatedAt`) VALUES (11, 'Meo Nostra', 1, '2018-10-24', '2018-10-24');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`products`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`products` (`id`, `ean`, `plu`, `plu2`, `plu3`, `branch`, `gender`, `color`, `size`, `category`, `description`, `amount`, `imagen`, `cost_price`, `sell_price`, `company_id`, `supplier_id`, `createdAt`, `updatedAt`) VALUES (1, '11111', 'p11111', 'p211111', 'p311111', 'Arturo Calle', 'M', 'Negro', 'S', 'Camisas', 'Camisa hombre', 10, NULL, 150000, 160000, 1, 1, '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`products` (`id`, `ean`, `plu`, `plu2`, `plu3`, `branch`, `gender`, `color`, `size`, `category`, `description`, `amount`, `imagen`, `cost_price`, `sell_price`, `company_id`, `supplier_id`, `createdAt`, `updatedAt`) VALUES (2, '11112', 'p11112', 'p211112', 'p311112', 'Arturo Calle', 'F', 'Rosa', 'S', 'Camisas', 'Camisa mujer', 10, NULL, 10000, 16000, 1, 1, '2018-08-10', '2018-08-10');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`devolutions`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`devolutions` (`id`, `name`, `type`, `createdAt`, `updatedAt`) VALUES (1, 'Sin devoluciones', NULL, '2018-10-24', '2018-10-24');
INSERT INTO `inventarioRealTest`.`devolutions` (`id`, `name`, `type`, `createdAt`, `updatedAt`) VALUES (2, 'Garantia', 1, '2018-10-24', '2018-10-24');
INSERT INTO `inventarioRealTest`.`devolutions` (`id`, `name`, `type`, `createdAt`, `updatedAt`) VALUES (3, 'Talla no coincide', 1, '2018-10-24', '2018-10-24');
INSERT INTO `inventarioRealTest`.`devolutions` (`id`, `name`, `type`, `createdAt`, `updatedAt`) VALUES (4, 'Mal estado delproducto', 1, '2018-10-24', '2018-10-24');
INSERT INTO `inventarioRealTest`.`devolutions` (`id`, `name`, `type`, `createdAt`, `updatedAt`) VALUES (5, 'Garantia', 2, '2018-10-24', '2018-10-24');
INSERT INTO `inventarioRealTest`.`devolutions` (`id`, `name`, `type`, `createdAt`, `updatedAt`) VALUES (6, 'Talla no coincide', 2, '2018-10-24', '2018-10-24');
INSERT INTO `inventarioRealTest`.`devolutions` (`id`, `name`, `type`, `createdAt`, `updatedAt`) VALUES (7, 'Mal estado delproducto', 2, '2018-10-24', '2018-10-24');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`zones`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`zones` (`id`, `name`, `shop_id`, `createdAt`, `updatedAt`) VALUES (1, 'Bodega Calle 80', 1, '2018-10-27', '2018-10-27');
INSERT INTO `inventarioRealTest`.`zones` (`id`, `name`, `shop_id`, `createdAt`, `updatedAt`) VALUES (2, 'Bodega Calle 26', 2, '2018-10-27', '2018-10-27');
INSERT INTO `inventarioRealTest`.`zones` (`id`, `name`, `shop_id`, `createdAt`, `updatedAt`) VALUES (3, 'Vitrina Calle 80', 1, '2018-10-27', '2018-10-27');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`shops`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`shops` (`id`, `company_id`, `name`, `createdAt`, `updatedAt`) VALUES (1, 1, 'Calle 80', '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`shops` (`id`, `company_id`, `name`, `createdAt`, `updatedAt`) VALUES (2, 1, 'Calle 26', '2018-08-10', '2018-08-10');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`epcs`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`epcs` (`id`, `state`, `epc`, `company_id`, `dealer_id`, `createdAt`, `updatedAt`) VALUES (1, 1, '0036', 1, 1, '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`epcs` (`id`, `state`, `epc`, `company_id`, `dealer_id`, `createdAt`, `updatedAt`) VALUES (2, 1, 'E20053828213013412009C3E', 1, 1, '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`epcs` (`id`, `state`, `epc`, `company_id`, `dealer_id`, `createdAt`, `updatedAt`) VALUES (3, 1, 'E20053828213010711909BD1', 1, 1, '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`epcs` (`id`, `state`, `epc`, `company_id`, `dealer_id`, `createdAt`, `updatedAt`) VALUES (4, 1, 'E20053828213027012009E5E', 1, 1, '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealTest`.`epcs` (`id`, `state`, `epc`, `company_id`, `dealer_id`, `createdAt`, `updatedAt`) VALUES (5, 0, 'E20053828213011911909C01', 1, 1, '2018-08-10', '2018-08-10');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`products_has_zones`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`products_has_zones` (`id`, `admission_date`, `transfer_date`, `sell_date`, `notes_return`, `logs_users`, `wasTransfered`, `product_id`, `zone_id`, `devolution_id`, `sell_id`, `epc_id`, `createdAt`, `updatedAt`) VALUES (1, '2018-10-27 00:00:00', NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, 1, '2018-10-27', '2018-10-27');
INSERT INTO `inventarioRealTest`.`products_has_zones` (`id`, `admission_date`, `transfer_date`, `sell_date`, `notes_return`, `logs_users`, `wasTransfered`, `product_id`, `zone_id`, `devolution_id`, `sell_id`, `epc_id`, `createdAt`, `updatedAt`) VALUES (2, '2018-10-27 00:00:00', NULL, NULL, NULL, NULL, NULL, 2, 1, NULL, NULL, 2, '2018-10-27', '2018-10-27');
INSERT INTO `inventarioRealTest`.`products_has_zones` (`id`, `admission_date`, `transfer_date`, `sell_date`, `notes_return`, `logs_users`, `wasTransfered`, `product_id`, `zone_id`, `devolution_id`, `sell_id`, `epc_id`, `createdAt`, `updatedAt`) VALUES (3, '2018-10-27 00:00:00', NULL, NULL, NULL, NULL, NULL, 1, 2, NULL, NULL, 3, '2018-10-27', '2018-10-27');
INSERT INTO `inventarioRealTest`.`products_has_zones` (`id`, `admission_date`, `transfer_date`, `sell_date`, `notes_return`, `logs_users`, `wasTransfered`, `product_id`, `zone_id`, `devolution_id`, `sell_id`, `epc_id`, `createdAt`, `updatedAt`) VALUES (4, '2018-10-27 00:00:00', NULL, NULL, NULL, NULL, NULL, 2, 2, NULL, NULL, 4, '2018-10-27', '2018-10-27');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`salidas`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (DEFAULT, 'Perdida', '2018-08-10 00:00:00', '2018-08-10 00:00:00');
INSERT INTO `inventarioRealTest`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (DEFAULT, 'Extravio', '2018-08-10 00:00:00', '2018-08-10 00:00:00');
INSERT INTO `inventarioRealTest`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (DEFAULT, 'Robo', '2018-08-10 00:00:00', '2018-08-10 00:00:00');
INSERT INTO `inventarioRealTest`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (DEFAULT, 'Retiro', '2018-08-10 00:00:00', '2018-08-10 00:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealTest`.`employees`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealTest`;
INSERT INTO `inventarioRealTest`.`employees` (`id`, `company_id`, `user_id`, `shop_id`, `createdAt`, `updatedAt`) VALUES (1, 1, 2, 1, '2019-11-11', '2019-11-11');
INSERT INTO `inventarioRealTest`.`employees` (`id`, `company_id`, `user_id`, `shop_id`, `createdAt`, `updatedAt`) VALUES (2, 1, 3, 1, '2019-11-11', '2019-11-11');
INSERT INTO `inventarioRealTest`.`employees` (`id`, `company_id`, `user_id`, `shop_id`, `createdAt`, `updatedAt`) VALUES (3, 1, 5, 1, '2019-11-11', '2019-11-11');

COMMIT;
