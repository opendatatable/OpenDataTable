-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 05, 2018 at 03:13 PM
-- Server version: 5.7.22-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `country_city`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_2`
--

CREATE TABLE `customer_2` (
  `ID` int(11) NOT NULL,
  `CUST_NAME` varchar(40) NOT NULL,
  `CUST_CITY` varchar(35) DEFAULT NULL,
  `WORKING_AREA` varchar(35) NOT NULL,
  `CUST_COUNTRY` varchar(20) NOT NULL,
  `GRADE` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_2`
--

INSERT INTO `customer_2` (`ID`, `CUST_NAME`, `CUST_CITY`, `WORKING_AREA`, `CUST_COUNTRY`, `GRADE`) VALUES
(5, 'Albert', 'New York', 'New York', 'USA', '1'),
(6, 'Ravindran', 'Bangalore', 'Bangalore', 'India', '2'),
(7, 'Cook', 'London', 'London', 'UK', '2'),
(8, 'Stuart', 'London', 'London', 'UK', '1'),
(9, 'Bolt', 'New York', 'New York', 'USA', '3'),
(10, 'Jacks', 'Brisban', 'Brisban', 'Australia', '1'),
(11, 'Yearannaidu', 'Chennai', 'Chennai', 'India', '1'),
(12, 'Sasikant', 'Mumbai', 'Mumbai', 'India', '1'),
(13, 'Ramanathan', 'Chennai', 'Chennai', 'India', '1'),
(14, 'Avinash', 'Mumbai', 'Mumbai', 'India', '2'),
(15, 'Winston', 'Brisban', 'Brisban', 'Australia', '1'),
(16, 'Karl', 'London', 'London', 'UK', '0'),
(17, 'Shilton', 'Torento', 'Torento', 'Canada', '1'),
(18, 'Charles', 'Hampshair', 'Hampshair', 'UK', '3'),
(19, 'Srinivas', 'Bangalore ', 'Bangalore', 'India', '2'),
(20, 'Steven', 'San Jose', 'San Jose', 'USA', '1'),
(21, 'Karolina', 'Torento', 'Torento', 'Canada', '1'),
(22, 'Martin', 'Torento', 'Torento', 'Canada', '2'),
(23, 'Ramesh', 'Mumbai', 'Mumbai', 'India', '3'),
(24, 'Rangarappa', 'Bangalore', 'Bangalore', 'India', '2'),
(25, 'Venkatpati', 'Bangalore', 'Bangalore', 'India', '2'),
(26, 'Sundariya', 'Chennai', 'Chennai', 'India', '3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_2`
--
ALTER TABLE `customer_2`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_2`
--
ALTER TABLE `customer_2`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
