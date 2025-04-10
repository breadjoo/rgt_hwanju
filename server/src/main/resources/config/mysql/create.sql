use rgt;

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
                         `id`	int auto_increment primary key	NOT NULL,
                         `title`	varchar(250)	NULL,
                         `author`	varchar(250)	NULL,
                         `description`	text	NULL,
                         `price`	int	NULL,
                         `stock`	int	NULL	DEFAULT 0
);
