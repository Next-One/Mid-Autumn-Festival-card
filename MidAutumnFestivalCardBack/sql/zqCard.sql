/*
Navicat MySQL Data Transfer

Source Server         : wx
Source Server Version : 50723
Source Host           : 212.64.102.63:3306
Source Database       : wx

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2018-09-25 09:31:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bug
-- ----------------------------
DROP TABLE IF EXISTS `bug`;
CREATE TABLE `bug` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `info` varchar(255) NOT NULL,
  `openid` varchar(255) NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `openid` varchar(255) NOT NULL,
  `session_key` varchar(255) DEFAULT '',
  `register_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `login_count` int(6) unsigned NOT NULL DEFAULT '1',
  `last_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `receive` int(6) unsigned NOT NULL DEFAULT '0',
  `send` int(6) unsigned NOT NULL DEFAULT '0',
  `nickName` varchar(255) NOT NULL DEFAULT '游客',
  `avatarUrl` varchar(255) NOT NULL DEFAULT '/img/theme/cardmin5.png',
  `gender` int(3) unsigned DEFAULT '0',
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_receive
-- ----------------------------
DROP TABLE IF EXISTS `user_receive`;
CREATE TABLE `user_receive` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `themeid` varchar(255) NOT NULL,
  `friendName` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sendid` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_openid` (`openid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3831 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_theme
-- ----------------------------
DROP TABLE IF EXISTS `user_theme`;
CREATE TABLE `user_theme` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `themeid` varchar(255) NOT NULL,
  `friendName` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shareCount` int(6) unsigned NOT NULL DEFAULT '1',
  `modifyTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_openid` (`openid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2582 DEFAULT CHARSET=utf8;
