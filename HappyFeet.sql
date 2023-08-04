SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `cart_items` (
  `id` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `cart_items` (`id`, `quantity`, `product_id`) VALUES
(31, 1, 4);



CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `products` (`id`, `name`, `price`, `description`, `image_url`) VALUES
(1, 'Fancy Product', 40, 'This is a fancy product.', ' '),
(2, 'Special Item', 18, 'This is a special item.', ' '),
(3, 'Sale Item', 25, 'This is a sale item.', ' '),
(4, 'Popular Item', 40, 'This is a popular item.', ' '),
(5, 'Sale Item', 25, 'This is another sale item.', ' '),
(6, 'Fancy Product', 200, 'This is a more expensive fancy product.', ' '),
(7, 'Special Item', 15, 'This is another special item.', ' '),
(8, 'Popular Item', 40, 'This is another popular item.', ' ');


CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1re40cjegsfvw58xrkdp6bac6` (`product_id`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;


ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;


ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;


ALTER TABLE `cart_items`
  ADD CONSTRAINT `FK1re40cjegsfvw58xrkdp6bac6` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
