-- ----------------------------
-- Procedure structure for SP_Insert_EnvioPostVenta
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_Insert_EnvioPostVenta`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Insert_EnvioPostVenta`(IN `vcodigo_epostventa` TEXT)
BEGIN
	DECLARE vid_epostventa INT;
	INSERT INTO envio_postventa(id_usuario, codigo_epostventa, fechac_epostventa) VALUES(2, vcodigo_epostventa, CURRENT_TIMESTAMP);
	SELECT LAST_INSERT_ID() INTO vid_epostventa;


	INSERT INTO envio_postventa_detalle (
		id_epostventa,
		id_estado,
		descripccion_epdetalle,
		fecha_epdetalle) 
	VALUES(
		vid_epostventa,
		4,
		'',
		CURRENT_TIMESTAMP);
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for SP_getEnvioPostVenta
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_getEnvioPostVenta`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_getEnvioPostVenta`(IN `v_fechai` DATE,IN `v_fechaf` DATE)
BEGIN
	SELECT 
		*
	FROM envio_postventa ep
	INNER JOIN usuario u ON u.id_usuario = ep.id_usuario
	WHERE DATE(ep.fechac_epostventa) BETWEEN v_fechai AND v_fechaf
	ORDER BY ep.fechac_epostventa desc;
END
;;
DELIMITER ;

-- ----------------------------
-- Table structure for envio_postventa
-- ----------------------------
DROP TABLE IF EXISTS `envio_postventa`;
CREATE TABLE `envio_postventa` (
  `id_epostventa` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `codigo_epostventa` text,
  `fechac_epostventa` datetime NOT NULL,
  PRIMARY KEY (`id_epostventa`),
  KEY `fk1_usuario` (`id_usuario`),
  CONSTRAINT `fk1_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for envio_postventa_detalle
-- ----------------------------
DROP TABLE IF EXISTS `envio_postventa_detalle`;
CREATE TABLE `envio_postventa_detalle` (
  `id_epdetalle` int(11) NOT NULL AUTO_INCREMENT,
  `id_epostventa` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL,
  `descripccion_epdetalle` text NOT NULL,
  `fecha_epdetalle` datetime NOT NULL,
  PRIMARY KEY (`id_epdetalle`),
  KEY `fk1` (`id_epostventa`),
  KEY `fk2` (`id_estado`),
  CONSTRAINT `fk1` FOREIGN KEY (`id_epostventa`) REFERENCES `envio_postventa` (`id_epostventa`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk2` FOREIGN KEY (`id_estado`) REFERENCES `estado_envio` (`id_estado`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for estado_envio
-- ----------------------------
INSERT INTO `estado_envio` VALUES ('4', 'Cliente');
INSERT INTO `estado_envio` VALUES ('5', 'Servicio Técnico');

-- ----------------------------
-- Procedure structure for SP_getEnvioPostVentaById
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_getEnvioPostVentaById`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_getEnvioPostVentaById`(IN `vid_epostventa` INT)
BEGIN
	SELECT
		ep.id_epostventa,
		ep.codigo_epostventa,
		ep.fechac_epostventa,
		epd.descripccion_epdetalle,
		epd.fecha_epdetalle,
		e.id_estado,
		e.nombre_estado
	FROM envio_postventa ep
	INNER JOIN envio_postventa_detalle epd ON epd.id_epostventa = ep.id_epostventa
	INNER JOIN estado_envio e ON e.id_estado = epd.id_estado
	WHERE 
		ep.id_epostventa = vid_epostventa;
END
;;
DELIMITER ;