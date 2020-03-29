DROP SCHEMA IF EXISTS `inventarioRealTest` ;
CREATE SCHEMA IF NOT EXISTS `inventarioRealTest` DEFAULT CHARACTER SET utf8 ;
USE `inventarioRealTest` ;

-- -----------------------------------------------------
-- Table `inventarioRealTest`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`users` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `username` VARCHAR(100) NULL,
  `password` VARCHAR(255) NOT NULL,
  `username_rfdi` VARCHAR(100) NULL,
  `password_rfdi` VARCHAR(255) NULL,
  `active` TINYINT(1) NULL,
  `group_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`groups` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`dealers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`dealers` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`dealers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`companies`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`companies` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `photo` TEXT NULL,
  `dealer_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`suppliers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`suppliers` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`suppliers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `company_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`products` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`products` (
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
  `amount` INT NULL,
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
-- Table `inventarioRealTest`.`devolutions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`devolutions` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`devolutions` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '	',
  `name` VARCHAR(45) NULL,
  `type` TINYINT(1) NULL COMMENT '1-> Cliente, 2->Proveedores',
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`zones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`zones` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`zones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `shop_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`shops`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`shops` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`shops` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`sells`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`sells` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`sells` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`epcs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`epcs` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`epcs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `state` INT NULL COMMENT '0->Sin asignar.\n1->Asignado.\n2->Usado.\n3->Vendido.\n4->Desaparecido',
  `epc` VARCHAR(45) NULL,
  `company_id` INT NOT NULL,
  `dealer_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `epc_UNIQUE` (`epc` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`products_has_zones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`products_has_zones` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`products_has_zones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `admission_date` DATETIME NULL,
  `transfer_date` DATETIME NULL,
  `sell_date` DATETIME NULL,
  `notes_return` TEXT NULL,
  `logs_users` TEXT NULL,
  `wasTransfered` TINYINT(1) NULL DEFAULT 0 COMMENT 'Check is the product was transfered\n',
  `product_id` INT NOT NULL,
  `zone_id` INT NOT NULL,
  `devolution_id` INT NULL COMMENT 'Last devolutions id',
  `sell_id` INT NULL COMMENT 'Id of the last sell',
  `epc_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `epc_id_UNIQUE` (`epc_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`salidas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`salidas` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`salidas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`employees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`employees` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `shop_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_id_UNIQUE` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`consolidated_inventories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`consolidated_inventories` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`consolidated_inventories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `employee_id` INT NOT NULL,
  `total_products` INT NULL COMMENT 'Suma de productos de todos los inventarios',
  `createdAt` DATETIME NULL COMMENT '	',
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`inventories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`inventories` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`inventories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL,
  `parcial` TINYINT(1) NULL COMMENT 'Determina si ya se consolido o no\n0-> Consolidado,\n1-> Parcial',
  `collaborative` TINYINT(1) NULL COMMENT 'Determina si es un inventario colaborativo',
  `zone_id` INT NOT NULL,
  `consolidated_inventory_id` INT NOT NULL DEFAULT 0,
  `message` TEXT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`employees_inventories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`employees_inventories` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`employees_inventories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `inventory_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`inventories_has_products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`inventories_has_products` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`inventories_has_products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `inventory_id` INT NOT NULL,
  `epc_id` INT NOT NULL,
  `zone_id` INT NOT NULL,
  `products_has_zone_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`transfers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`transfers` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`transfers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `state` TINYINT(1) NULL DEFAULT 0 COMMENT 'Determina si ya se hizo la transferencia.\n0-> No se ha hecho.\n1-> Ya se hizo',
  `manifest` VARCHAR(45) NULL COMMENT '0 -> First Letter Company\n1 -> First number from Id Company\n2 -> First number from Id Local Orig\n3 -> First number from Id Local Dest\n4 -> Amount of product\n5,6,7,8 -> Random text',
  `message` TEXT NULL,
  `employee_id` INT NOT NULL COMMENT 'Employees id who created the transfer',
  `shop_source_id` INT NOT NULL,
  `shop_destination_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`transfers_has_zones_products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`transfers_has_zones_products` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`transfers_has_zones_products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `products_has_zone_id` INT NOT NULL,
  `transfer_id` INT NOT NULL,
  `state` TINYINT(1) NULL COMMENT 'Determina si ya se recibió o no\n0-> No se ha recibido.\n1-> Se recibió',
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`reports`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`reports` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`reports` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` INT NULL COMMENT '1: Diferencia unidades fisicas;\n2: Unidades vendidas',
  `amount` INT NULL,
  `units_sell` INT NULL COMMENT 'Unidades vendidas para reporte de unidades vendidas',
  `units_returned` INT NULL COMMENT 'Unidades devueltas para reporte de unidades vendidas',
  `firstDate` DATETIME NULL,
  `secondDate` DATETIME NULL,
  `employee_id` INT NOT NULL,
  `inventory_first_id` INT NOT NULL,
  `inventory_second_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`reports_has_products_zones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`reports_has_products_zones` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`reports_has_products_zones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `homologator_employee_id` INT NULL DEFAULT 0 COMMENT 'Id del empleado que homologo la unidad, 0 en caso de que no haya sido homologada',
  `report_id` INT NOT NULL,
  `products_zone_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`sales_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`sales_history` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`sales_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `products_has_zone_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`devolutions_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`devolutions_history` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`devolutions_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `products_has_zone_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioRealTest`.`inventory_erp`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioRealTest`.`inventory_erp` ;

CREATE TABLE IF NOT EXISTS `inventarioRealTest`.`inventory_erp` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `shop_id` INT NOT NULL,
  `products` JSON NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


