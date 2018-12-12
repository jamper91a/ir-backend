

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `inventarioReal` ;
CREATE SCHEMA IF NOT EXISTS `inventarioReal` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `inventarioReal` ;

GRANT ALL PRIVILEGES on inventarioReal.*
TO 'root'@'%' IDENTIFIED BY 'gjwQbdRD4k;t'
WITH GRANT OPTION;

-- -----------------------------------------------------
-- Table `inventarioReal`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`users` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(100) NULL ,
  `password` VARCHAR(255) NOT NULL ,
  `username_rfdi` VARCHAR(100) NULL ,
  `password_rfdi` VARCHAR(255) NULL ,
  `groups_id` INT NOT NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`groups` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`productos` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `ean` VARCHAR(45) NULL COMMENT '	' ,
  `plu` VARCHAR(45) NULL COMMENT '	' ,
  `plu2` VARCHAR(45) NULL ,
  `plu3` VARCHAR(45) NULL ,
  `marca` VARCHAR(45) NULL ,
  `genero` VARCHAR(45) NULL ,
  `color` VARCHAR(45) NULL ,
  `talla` VARCHAR(45) NULL ,
  `categoria` VARCHAR(45) NULL ,
  `descripcion` TEXT NULL ,
  `cantidad` MEDIUMTEXT NULL ,
  `imagen` TEXT NULL ,
  `createdAt` DATETIME NULL ,
  `precio_costo` DOUBLE NULL ,
  `precio_venta` DOUBLE NULL ,
  `companias_id` INT NOT NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`proveedores`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`proveedores` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`proveedores` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`devoluciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`devoluciones` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`devoluciones` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '	' ,
  `name` VARCHAR(45) NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`zonas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`zonas` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`zonas` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `locales_id` INT NOT NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`companias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`companias` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`companias` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`locales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`locales` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`locales` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `companias_id` INT NOT NULL ,
  `name` VARCHAR(45) NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`ventas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`ventas` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`ventas` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `users_id` INT NOT NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  `productos_zona_id` INT NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`epcs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`epcs` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`epcs` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `state` INT NULL COMMENT '0->Sin asignar.\n1->Asignado.\n2->Usado.\n3->Vendido.\n4->Desaparecido' ,
  `epc` VARCHAR(45) NULL ,
  `companias_id` INT NOT NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `epc_UNIQUE` (`epc` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`productos_zonas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`productos_zonas` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`productos_zonas` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `productos_id` INT NOT NULL ,
  `zonas_id` INT NOT NULL ,
  `fecha_ingreso` DATETIME NULL ,
  `fecha_venta` DATETIME NULL ,
  `fecha_devolucion` DATETIME NULL ,
  `devolucion_observaciones` TEXT NULL ,
  `devoluciones_id` INT NOT NULL ,
  `logs_usuarios` TEXT NULL ,
  `ventas_id` INT NOT NULL ,
  `epcs_id` INT NOT NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`salidas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`salidas` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`salidas` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(45) NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`empleados`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`empleados` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`empleados` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `companias_id` INT NOT NULL ,
  `users_id` INT NOT NULL ,
  `locales_id` INT NOT NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) ,
  UNIQUE INDEX `users_id_UNIQUE` (`users_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`inventarios_consolidados`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`inventarios_consolidados` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`inventarios_consolidados` (
  `id` INT NOT NULL ,
  `created` DATETIME NULL COMMENT '	' ,
  `updated` DATETIME NULL ,
  `empleados_id` INT NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`inventarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`inventarios` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`inventarios` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `fecha` DATETIME NULL ,
  `parcial` TINYINT(1) NULL COMMENT 'Determina si ya se consolido o no\n0-> Consolidado,\n1-> Parcial' ,
  `colaborativo` TINYINT(1) NULL COMMENT 'Determina si es un inventario colaborativo' ,
  `zonas_id` INT NOT NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  `inventarios_consolidados_id` INT NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`users_inventarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`users_inventarios` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`users_inventarios` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `inventarios_id` INT NOT NULL ,
  `empleados_id` INT NOT NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`inventarios_productos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`inventarios_productos` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`inventarios_productos` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `inventarios_id` INT NOT NULL ,
  `productos_epcs_id` INT NOT NULL ,
  `zonas_id` INT NOT NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  `productos_zona_id` INT NOT NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`transferencias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`transferencias` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`transferencias` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `creador_id` INT NOT NULL ,
  `manifiesto` VARCHAR(45) NULL ,
  `local_origen_id` INT NOT NULL ,
  `local_destino_id` INT NOT NULL ,
  `estado` TINYINT(1) NULL DEFAULT 0 COMMENT 'Determina si ya se hizo la transferencia.\n0-> No se ha hecho.\n1-> Ya se hizo' ,
  `fecha` DATETIME NULL ,
  `mensaje` TEXT NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`productos_zona_has_transferencias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`productos_zona_has_transferencias` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`productos_zona_has_transferencias` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `productos_zona_id` INT NOT NULL ,
  `transferencias_id` INT NOT NULL ,
  `estado` TINYINT(1) NULL COMMENT 'Determina si ya se recibió o no\n0-> No se ha recibido.\n1-> Se recibió' ,
  `productos_zona_has_transferenciascol` VARCHAR(45) NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inventarioReal`.`ubicaciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `inventarioReal`.`ubicaciones` ;

CREATE  TABLE IF NOT EXISTS `inventarioReal`.`ubicaciones` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `nombre` VARCHAR(45) NULL ,
  `epcs_id` INT NOT NULL ,
  `zonas_id` INT NOT NULL ,
  `createdAt` DATETIME NULL ,
  `updatedAt` DATETIME NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;

USE `inventarioReal` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`users` (`id`, `username`, `password`, `username_rfdi`, `password_rfdi`, `groups_id`, `createdAt`, `updatedAt`) VALUES (1, 'jamper91', '$2a$10$aeX8/2lzP3.t4rsJA.ozZuz5jDaScKuC4S0QRXMWqf.eOOa9WEcqS', NULL, NULL, 1, NULL, NULL);

COMMIT;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`groups`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (1, 'SuperAdministrador', '2018-08-10', '2018-08-10');
INSERT INTO `inventarioReal`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (2, 'Administrador', '2018-08-10', '2018-08-10');
INSERT INTO `inventarioReal`.`groups` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (3, 'Cajero', '2018-08-10', '2018-08-10');

COMMIT;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`proveedores`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`proveedores` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (0, 'Sin proovedor', '2018-10-24', '2018-10-24');

COMMIT;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`devoluciones`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`devoluciones` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (0, 'Sin devoluciones', '2018-10-24', '2018-10-24');

COMMIT;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`zonas`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`zonas` (`id`, `name`, `locales_id`, `createdAt`, `updatedAt`) VALUES (1, 'Bodega', 1, '2018-10-27', '2018-10-27');

COMMIT;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`companias`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`companias` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (1, 'Inventario Real', '2018-08-10', '2018-08-10');

COMMIT;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`locales`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`locales` (`id`, `companias_id`, `name`, `createdAt`, `updatedAt`) VALUES (1, 1, 'Cll 80', '2018-08-10', '2018-08-10');

COMMIT;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`ventas`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`ventas` (`id`, `users_id`, `createdAt`, `updatedAt`, `productos_zona_id`) VALUES (0, 0, '2018-10-24', '2018-10-24', 0);

COMMIT;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`epcs`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`epcs` (`id`, `state`, `epc`, `companias_id`, `createdAt`, `updatedAt`) VALUES (1, 0, '12345', 1, '2018-08-10', '2018-08-10');
INSERT INTO `inventarioReal`.`epcs` (`id`, `state`, `epc`, `companias_id`, `createdAt`, `updatedAt`) VALUES (2, 0, '12346', 1, '2018-08-10', '2018-08-10');

COMMIT;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`productos_zonas`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`productos_zonas` (`id`, `productos_id`, `zonas_id`, `fecha_ingreso`, `fecha_venta`, `fecha_devolucion`, `devolucion_observaciones`, `devoluciones_id`, `logs_usuarios`, `ventas_id`, `epcs_id`, `createdAt`, `updatedAt`) VALUES (1, 1, 1, '2018-10-27', NULL, NULL, NULL, -1, NULL, -1, 1, '2018-10-27', '2018-10-27');
INSERT INTO `inventarioReal`.`productos_zonas` (`id`, `productos_id`, `zonas_id`, `fecha_ingreso`, `fecha_venta`, `fecha_devolucion`, `devolucion_observaciones`, `devoluciones_id`, `logs_usuarios`, `ventas_id`, `epcs_id`, `createdAt`, `updatedAt`) VALUES (2, 1, 1, '2018-10-27', NULL, NULL, NULL, -1, NULL, -1, 1, '2018-10-27', '2018-10-27');

COMMIT;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`salidas`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (NULL, 'Perdida', NULL, NULL);
INSERT INTO `inventarioReal`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (NULL, 'Extravio', NULL, NULL);
INSERT INTO `inventarioReal`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (NULL, 'Robo', NULL, NULL);
INSERT INTO `inventarioReal`.`salidas` (`id`, `name`, `createdAt`, `updatedAt`) VALUES (NULL, 'Retiro', NULL, NULL);

COMMIT;

-- -----------------------------------------------------
-- Data for table `inventarioReal`.`empleados`
-- -----------------------------------------------------
START TRANSACTION;
USE `inventarioReal`;
INSERT INTO `inventarioReal`.`empleados` (`id`, `companias_id`, `users_id`, `locales_id`, `createdAt`, `updatedAt`) VALUES (1, 1, 1, 1, '2018-08-10', '2018-08-10');

COMMIT;
