-- MySQL Script generated by MySQL Workbench
-- Sat Aug 17 16:08:20 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema inventarioRealEn
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `inventarioRealEn` ;

-- -----------------------------------------------------
-- Schema inventarioRealEn
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `inventarioRealEn` DEFAULT CHARACTER SET utf8 ;
USE `inventarioRealEn` ;

-- -----------------------------------------------------
-- Table `inventarioRealEn`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`users` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NULL,
  `password` VARCHAR(255) NOT NULL,
  `username_rfdi` VARCHAR(100) NULL,
  `password_rfdi` VARCHAR(255) NULL,
  `group_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`groups` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`suppliers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`suppliers` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`suppliers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`products` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ean` VARCHAR(45) NULL COMMENT '	',
  `plu` VARCHAR(45) NULL COMMENT '	',
  `plu2` VARCHAR(45) NULL,
  `plu3` VARCHAR(45) NULL,
  `branch` VARCHAR(45) NULL,
  `gender` VARCHAR(45) NULL,
  `color` VARCHAR(45) NULL,
  `size` VARCHAR(45) NULL,
  `category` VARCHAR(45) NULL,
  `description` TEXT NULL,
  `amount` MEDIUMTEXT NULL,
  `imagen` TEXT NULL,
  `cost_price` DOUBLE NULL,
  `sell_price` DOUBLE NULL,
  `company_id` INT NOT NULL,
  `supplier_id` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`devolutions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`devolutions` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`devolutions` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '	',
  `name` VARCHAR(45) NULL,
  `type` TINYINT(1) NULL DEFAULT 1-> Cliente, 2->Proveedores,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`zones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`zones` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`zones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `shop_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`companies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`companies` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`shops`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`shops` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`shops` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`sells`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`sells` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`sells` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`epcs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`epcs` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`epcs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `state` INT NULL COMMENT '0->Sin asignar.\n1->Asignado.\n2->Usado.\n3->Vendido.\n4->Desaparecido',
  `epc` VARCHAR(45) NULL,
  `company_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `epc_UNIQUE` (`epc` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`products_has_zones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`products_has_zones` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`products_has_zones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `admission_date` DATETIME NULL,
  `sell_date` DATETIME NULL,
  `return_date` DATETIME NULL,
  `notes_return` TEXT NULL,
  `logs_users` TEXT NULL,
  `product_id` INT NOT NULL,
  `zone_id` INT NOT NULL,
  `devolution_id` INT NOT NULL,
  `sell_id` INT NOT NULL,
  `epc_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`salidas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`salidas` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`salidas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`employees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`employees` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `shop_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_id_UNIQUE` (`user_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`consolidated_inventories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`consolidated_inventories` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`consolidated_inventories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `employee_id` INT NOT NULL,
  `total_products` INT NULL DEFAULT Suma de productos de todos los inventarios,
  `createdAt` DATETIME NULL COMMENT '	',
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`inventories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`inventories` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`inventories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL,
  `parcial` TINYINT(1) NULL COMMENT 'Determina si ya se consolido o no\n0-> Consolidado,\n1-> Parcial',
  `collaborative` TINYINT(1) NULL COMMENT 'Determina si es un inventario colaborativo',
  `zone_id` INT NOT NULL,
  `consolidated_inventory_id` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`employees_inventories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`employees_inventories` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`employees_inventories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `inventory_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`inventories_has_products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`inventories_has_products` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`inventories_has_products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `inventory_id` INT NOT NULL,
  `epc_id` INT NOT NULL,
  `zone_id` INT NOT NULL,
  `products_has_zone_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `inventories_has_productscol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`transfers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`transfers` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`transfers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `state` TINYINT(1) NULL DEFAULT 0 COMMENT 'Determina si ya se hizo la transferencia.\n0-> No se ha hecho.\n1-> Ya se hizo',
  `manifest` VARCHAR(45) NULL COMMENT '0 -> First Letter Company\n1 -> First number from Id Company\n2 -> First number from Id Local Orig\n3 -> First number from Id Local Dest\n4 -> Amount of product\n5,6,7,8 -> Random text',
  `message` TEXT NULL,
  `employee_id` INT NOT NULL COMMENT 'Employees \'id who created the transfer',
  `shop_source_id` INT NOT NULL,
  `shop_destination_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`transfers_has_zones_products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`transfers_has_zones_products` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`transfers_has_zones_products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `products_has_zone_id` INT NOT NULL,
  `transfer_id` INT NOT NULL,
  `state` TINYINT(1) NULL COMMENT 'Determina si ya se recibió o no\n0-> No se ha recibido.\n1-> Se recibió',
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`locations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`locations` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`locations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `epc_id` INT NOT NULL,
  `zone_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`reports`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`reports` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`reports` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` INT NULL COMMENT '1: Diferencia unidades fisicas;\n2: Unidades vendidas',
  `amount` INT NULL,
  `units_sell` INT NULL COMMENT 'Unidades vendidas para reporte de unidades vendidas',
  `units_returned` INT NULL COMMENT 'Unidades devueltas para reporte de unidades vendidas',
  `employee_id` INT NOT NULL,
  `inventory_first_id` INT NOT NULL,
  `inventory_second_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealEn`.`reports_has_products_zones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealEn`.`reports_has_products_zones` ;

CREATE TABLE IF NOT EXISTS `inventarioRealEn`.`reports_has_products_zones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `homologator_employee_id` INT NULL DEFAULT 0 COMMENT 'Id del empleado que homologo la unidad, 0 en caso de que no haya sido homologada',
  `report_id` INT NOT NULL,
  `products_zone_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`users` (`id`, `username`, `password`, `username_rfdi`, `password_rfdi`, `group_id`, `createdAt`, `updatedAt`) VALUES (1, 'jamper91', '$2a$10$aeX8/2lzP3.t4rsJA.ozZuz5jDaScKuC4S0QRXMWqf.eOOa9WEcqS', ' ', NULL, 1, '2018-08-10 00:00:00', '2018-08-10 00:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`groups`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (1, 'SuperAdministrador', '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealEn`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (2, 'Administrador', '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealEn`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (3, 'Cajero', '2018-08-10', '2018-08-10');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`suppliers`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`suppliers` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (0, 'Sin proovedor', '2018-10-24', '2018-10-24');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`products`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`products` (`id`, `ean`, `plu`, `plu2`, `plu3`, `branch`, `gender`, `color`, `size`, `category`, `description`, `amount`, `imagen`, `cost_price`, `sell_price`, `company_id`, `supplier_id`, `createdAt`, `updatedAt`) VALUES (1, '11111', 'p11111', 'p211111', 'p311111', 'Arturo Calle', 'M', 'Negro', 'S', 'Camisas', 'Camisa hombre', '10', NULL, 150000, 160000, 1, DEFAULT, '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealEn`.`products` (`id`, `ean`, `plu`, `plu2`, `plu3`, `branch`, `gender`, `color`, `size`, `category`, `description`, `amount`, `imagen`, `cost_price`, `sell_price`, `company_id`, `supplier_id`, `createdAt`, `updatedAt`) VALUES (2, '11112', 'p11112', 'p211112', 'p311112', 'Arturo Calle', 'F', 'Rosa', 'S', 'Camisas', 'Camisa mujer', '10', NULL, 10000, 16000, 1, DEFAULT, '2018-08-10', '2018-08-10');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`devolutions`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`devolutions` (`id`, `name`, `type`, `createdAt`, `updatedAt`) VALUES (0, 'Sin devoluciones', NULL, '2018-10-24', '2018-10-24');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`zones`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`zones` (`id`, `name`, `shop_id`, `createdAt`, `updatedAt`) VALUES (1, 'Bodega', 1, '2018-10-27', '2018-10-27');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`companies`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`companies` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (1, 'Inventario Real', '2018-08-10', '2018-08-10');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`shops`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`shops` (`id`, `company_id`, `name`, `createdAt`, `updatedAt`) VALUES (1, 1, 'Cll 80', '2018-08-10', '2018-08-10');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`sells`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`sells` (`id`, `user_id`, `createdAt`, `updatedAt`) VALUES (0, 0, '2018-10-24', '2018-10-24');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`epcs`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`epcs` (`id`, `state`, `epc`, `company_id`, `createdAt`, `updatedAt`) VALUES (1, 0, '12345', 1, '2018-08-10', '2018-08-10');
INSERT INTO `inventarioRealEn`.`epcs` (`id`, `state`, `epc`, `company_id`, `createdAt`, `updatedAt`) VALUES (2, 0, '12346', 1, '2018-08-10', '2018-08-10');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`products_has_zones`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`products_has_zones` (`id`, `admission_date`, `sell_date`, `return_date`, `notes_return`, `logs_users`, `product_id`, `zone_id`, `devolution_id`, `sell_id`, `epc_id`, `createdAt`, `updatedAt`) VALUES (1, '2018-10-27', NULL, NULL, NULL, NULL, 1, 1, 1, -1, 1, '2018-10-27', '2018-10-27');
INSERT INTO `inventarioRealEn`.`products_has_zones` (`id`, `admission_date`, `sell_date`, `return_date`, `notes_return`, `logs_users`, `product_id`, `zone_id`, `devolution_id`, `sell_id`, `epc_id`, `createdAt`, `updatedAt`) VALUES (2, '2018-10-27', NULL, NULL, NULL, NULL, 1, 1, 1, -1, 1, '2018-10-27', '2018-10-27');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`salidas`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (DEFAULT, 'Perdida', '2018-08-10 00:00:00', '2018-08-10 00:00:00');
INSERT INTO `inventarioRealEn`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (DEFAULT, 'Extravio', '2018-08-10 00:00:00', '2018-08-10 00:00:00');
INSERT INTO `inventarioRealEn`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (DEFAULT, 'Robo', '2018-08-10 00:00:00', '2018-08-10 00:00:00');
INSERT INTO `inventarioRealEn`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (DEFAULT, 'Retiro', '2018-08-10 00:00:00', '2018-08-10 00:00:00');

COMMIT;


-- -----------------------------------------------------
-- Data for table `inventarioRealEn`.`employees`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioRealEn`;
INSERT INTO `inventarioRealEn`.`employees` (`id`, `company_id`, `user_id`, `shop_id`, `createdAt`, `updatedAt`) VALUES (1, 1, 1, 1, '2018-08-10', '2018-08-10');

COMMIT;

