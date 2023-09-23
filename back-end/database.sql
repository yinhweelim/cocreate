-- -------------------------------------------------------------
-- TablePlus 5.4.0(504)
--
-- https://tableplus.com/
--
-- Database: amaqljzi
-- Generation Time: 2023-09-15 01:07:31.7710
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."auth" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "hash" varchar NOT NULL,
    "email" varchar(100) NOT NULL,
    "is_deleted" bool DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS country_seq;

-- Table Definition
CREATE TABLE "public"."country" (
    "id" int4 NOT NULL DEFAULT nextval('country_seq'::regclass),
    "iso" bpchar(2) NOT NULL,
    "name" varchar(80) NOT NULL,
    "nicename" varchar(80) NOT NULL,
    "iso3" bpchar(3) DEFAULT NULL::bpchar,
    "numcode" int2,
    "phonecode" int4 NOT NULL,
    PRIMARY KEY ("name")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."creator_portfolio_items" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "image_url" varchar NOT NULL,
    "caption" varchar,
    "creator_id" uuid NOT NULL,
    "is_deleted" bool NOT NULL DEFAULT false,
    "title" varchar
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."creator_products" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "image_url" varchar NOT NULL,
    "title" varchar(100) NOT NULL,
    "description" varchar NOT NULL,
    "currency" text NOT NULL,
    "starting_price" int4 NOT NULL,
    "creator_id" uuid NOT NULL,
    "is_deleted" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."creator_project_stages" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "index" int4 NOT NULL,
    "name" varchar(50) NOT NULL,
    "description" varchar(100),
    "time_estimate_unit" text,
    "time_estimate_start" int4,
    "time_estimate_end" int4,
    "creator_id" uuid NOT NULL,
    "is_deleted" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."creator_social_links" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "type" text NOT NULL,
    "url" varchar NOT NULL,
    "is_deleted" bool NOT NULL DEFAULT false,
    "creator_id" uuid NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."creator_testimonials" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "creator_id" uuid NOT NULL,
    "project_id" uuid NOT NULL,
    "patron_id" uuid NOT NULL,
    "patron_tagline" varchar(50),
    "testimonial" varchar NOT NULL,
    "image_url" varchar,
    "is_deleted" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."creators" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "display_name" varchar(100),
    "tagline" varchar(100),
    "country_of_operation" varchar(80),
    "about" varchar,
    "logo_image_url" varchar,
    "slots_per_month" int4,
    "display_slots_per_month" bool,
    "display_project_count" bool,
    "allow_consultation_booking" bool,
    "consultation_notice_days" int4,
    "lead_time_in_weeks" int4,
    "project_description_guideline" varchar,
    "payment_instructions" varchar,
    "is_deleted" bool NOT NULL DEFAULT false,
    "custom_url" varchar,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."currencies" (
    "value" text NOT NULL,
    PRIMARY KEY ("value")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."delivery_methods" (
    "value" varchar NOT NULL,
    PRIMARY KEY ("value")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."project_brief_statuses" (
    "value" text NOT NULL,
    PRIMARY KEY ("value")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."project_briefs" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "creator_id" uuid NOT NULL,
    "patron_id" uuid NOT NULL,
    "product_id" uuid NOT NULL,
    "details" varchar(255),
    "budget_currency" text,
    "budget_amount" int4,
    "deadline" date,
    "brief_expiry_date" timestamp NOT NULL DEFAULT (now() + '2 days'::interval day),
    "consultation_slot" timestamp,
    "delivery_method" varchar,
    "status" text NOT NULL DEFAULT 'PENDING_RESPONSE'::text,
    "is_deleted" bool NOT NULL DEFAULT false,
    "image_url" varchar,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."project_proposals" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "project_id" uuid NOT NULL,
    "reference_image_url" varchar,
    "description" varchar,
    "is_accepted" bool,
    "currency" text NOT NULL,
    "project_fee" int4,
    "delivery_fee" int4,
    "additional_fee" int4,
    "total_price" int4 NOT NULL,
    "estimated_delivery_date" date,
    "is_deleted" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."project_stages" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "index" int4 NOT NULL,
    "name" varchar(50) NOT NULL,
    "description" varchar(100),
    "time_estimate_unit" text,
    "time_estimate_start" int4,
    "time_estimate_end" int4,
    "project_id" uuid NOT NULL,
    "is_deleted" bool NOT NULL DEFAULT false,
    "completed_time" timestamp,
    "is_completed" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."projects" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "patron_id" uuid NOT NULL,
    "creator_id" uuid NOT NULL,
    "brief_id" uuid,
    "agreed_proposal_id" uuid,
    "agreed_date" timestamp,
    "current_stage_id" uuid,
    "is_deleted" bool NOT NULL DEFAULT false,
    "name" varchar,
    "is_completed" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."social_link_types" (
    "value" text NOT NULL,
    PRIMARY KEY ("value")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."testdata" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "value" text NOT NULL,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "is_deleted" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."time_units" (
    "value" text NOT NULL,
    PRIMARY KEY ("value")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_roles" (
    "value" text NOT NULL,
    "comment" text,
    PRIMARY KEY ("value")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "created_at" timestamp NOT NULL DEFAULT now(),
    "auth_id" uuid NOT NULL,
    "role" text NOT NULL,
    "country_of_residence" varchar(80),
    "billing_address" varchar(100),
    "creator_id" uuid,
    "given_name" varchar(100),
    "last_name" varchar(100),
    "avatar_image_url" varchar,
    "is_deleted" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."auth" ("id", "hash", "email", "is_deleted") VALUES
('020776ac-60f8-49d9-a484-fff6fcb0d2db', '$2b$12$XwQ9IoHPqkRKqt.2jYvSOeSipBcITWataYM0FiXf1tpu1dlY4Fsf.', 'newuser2@test.com', 'f'),
('0d7b6c0a-d8e5-405c-bf0d-41d0800c3337', '$2b$12$wYTUyQxVL0o58UQzWeJWtOGHrEpiZWwzN0OjYWBaH.9CdFDlise7G', 'testsignup1@test.com', 'f'),
('180e20ec-d326-4c6a-8c59-f1f953f79d8f', '$2b$12$uqqkpYedxDxcRCVxniD88uR8VJ/q2cwC0bg0Tz8mYvIymqkuxlj9u', 'arron2@test.com', 'f'),
('227c3e5f-efd5-4b56-89fc-9b4f64d1dc41', '$2b$12$0O93eAjhE/GfMymrR2cRN.AQUIycYXgVE3mnOPk9I.fxhJGAxxR2S', 'test@test.com', 'f'),
('2674128e-5847-442e-88e4-1f8ac8444458', '$2b$12$hUzopJx7by4ZJwGqzkzS9OpvWPMJztPdeo7K3a2LnTUTuU/ahR8lC', 'testuser2@test.com', 'f'),
('407c458e-d946-45a8-ab66-f11b9435348f', '$2b$12$D9cRdUyavHYZg8ybgMwWfe2xxXd2I9cKqDAQf./HPTSfPID2EBNhy', 'hwee2@test.com', 'f'),
('4537f0a4-76dc-4442-989c-f31e150231ad', '$2b$12$DHIEVNSZ8jxVDDtul9jzIuqmDAPbKDzsjUvGVsrrSEfFseZJUcZom', 'arron1@test.com', 'f'),
('5395e9d1-e251-457b-a998-29be646abdd2', '$2b$12$./823QG8KDPgb3zHqfbDQuTJVw37hSJ03hFuEfGSnvVYdBvPRN5HO', 'newuser3@test.com', 'f'),
('6874477f-e79e-4992-b971-f491f2ed5955', '$2b$12$TqVjR8BgTtK2SRZ1LcmVJO7US7VW8/.IrTlb15LYgA63B3m9xTjDS', 'hwee3@test.com', 'f'),
('845243a8-7a00-4cd6-b0a9-f859fbb72cd2', '$2b$12$aodc7AmsC4HrQIUaLSuI1Of1Gt9HdBRUm3hk253G6fww8VYdTatj2', 'hwee1@test.com', 'f'),
('91875e70-782d-4fec-a96c-cbff2d45dde0', '$2b$12$iFO3zjJFMup43hEC.aTTFe36aGdONc0Gl5cisziAwi17A5PvpsHMO', 'arron@test.com', 'f'),
('a1ec7c80-edb4-4e18-9e82-7ecedebc3318', '$2b$12$H7xslWcdRU5dw7bKb4xntuYJ.g46iOQSy4WAh/lsQtK3v5Ca/Z4ri', 'hwee6@test.com', 'f'),
('af030a24-dcec-4bea-a56a-52b816a5e014', '$2b$12$MfF7YTXkflWDwAw6XphHkeqJsCWrHFTpYoULrsX6MeOWvIDJARjG6', 'arron3@test.com', 'f'),
('b152e1ea-1017-43e2-b7d0-cb33b9b7d0cd', '$2b$12$MPgoaSXVKErQf8qVwh0fNuhwGAJamev/lhsLw.DwZmgjWUFecLSKK', 'testuser3@gmail.com', 'f'),
('b1a5969f-c7b4-47d9-8c01-de445dc41959', '$2b$12$SJ.KJkXsOT5.DgiWsFH1w.USxKUOOADGQQNBUfa6j6Yl2Ai4Tnar2', 'arronisanengineer@test.com', 'f'),
('b50c0a2a-fea5-40b8-839f-a01eb4c58089', '$2b$12$iAAY1xwfjSK1mnKI.bjTPeIhFPKDhMItcMly/Y/ehUGMEUbh1berO', 'hwee@test.com', 'f'),
('c9b43c48-2a0e-4ee2-8171-0d7281fb0a40', '$2b$12$.OWWLMWqhVfkxSGvZTW04e5qaTP1L9xiKi5jDukw5NA4az7oD8OOu', 'newuser1@test.com', 'f'),
('dc37ee24-4195-4185-8e13-3dc363ceef89', '$2b$12$ImKJ54o.NwCq40Z1rhKK0eoDzhiJnI42QrGOWPIDnRmWXfLMkzKm.', 'hwee4@test.com', 'f'),
('edd623ca-444c-4eaf-87ff-6deafe208c5f', '$2b$12$O9YHhj12CLmLF9TJMre0Zeb8SfGfCmGE7sijWtlgAKIZPkOdbIjRG', 'hwee5@test.com', 'f');

INSERT INTO "public"."country" ("id", "iso", "name", "nicename", "iso3", "numcode", "phonecode") VALUES
(1, 'AF', 'AFGHANISTAN', 'Afghanistan', 'AFG', 4, 93),
(242, 'AX', 'ALAND ISLANDS', 'Aland Islands', 'ALA', 248, 358),
(2, 'AL', 'ALBANIA', 'Albania', 'ALB', 8, 355),
(3, 'DZ', 'ALGERIA', 'Algeria', 'DZA', 12, 213),
(4, 'AS', 'AMERICAN SAMOA', 'American Samoa', 'ASM', 16, 1684),
(5, 'AD', 'ANDORRA', 'Andorra', 'AND', 20, 376),
(6, 'AO', 'ANGOLA', 'Angola', 'AGO', 24, 244),
(7, 'AI', 'ANGUILLA', 'Anguilla', 'AIA', 660, 1264),
(8, 'AQ', 'ANTARCTICA', 'Antarctica', 'ATA', 10, 0),
(9, 'AG', 'ANTIGUA AND BARBUDA', 'Antigua and Barbuda', 'ATG', 28, 1268),
(10, 'AR', 'ARGENTINA', 'Argentina', 'ARG', 32, 54),
(11, 'AM', 'ARMENIA', 'Armenia', 'ARM', 51, 374),
(12, 'AW', 'ARUBA', 'Aruba', 'ABW', 533, 297),
(13, 'AU', 'AUSTRALIA', 'Australia', 'AUS', 36, 61),
(14, 'AT', 'AUSTRIA', 'Austria', 'AUT', 40, 43),
(15, 'AZ', 'AZERBAIJAN', 'Azerbaijan', 'AZE', 31, 994),
(16, 'BS', 'BAHAMAS', 'Bahamas', 'BHS', 44, 1242),
(17, 'BH', 'BAHRAIN', 'Bahrain', 'BHR', 48, 973),
(18, 'BD', 'BANGLADESH', 'Bangladesh', 'BGD', 50, 880),
(19, 'BB', 'BARBADOS', 'Barbados', 'BRB', 52, 1246),
(20, 'BY', 'BELARUS', 'Belarus', 'BLR', 112, 375),
(21, 'BE', 'BELGIUM', 'Belgium', 'BEL', 56, 32),
(22, 'BZ', 'BELIZE', 'Belize', 'BLZ', 84, 501),
(23, 'BJ', 'BENIN', 'Benin', 'BEN', 204, 229),
(24, 'BM', 'BERMUDA', 'Bermuda', 'BMU', 60, 1441),
(25, 'BT', 'BHUTAN', 'Bhutan', 'BTN', 64, 975),
(26, 'BO', 'BOLIVIA', 'Bolivia', 'BOL', 68, 591),
(243, 'BQ', 'BONAIRE, SINT EUSTATIUS AND SABA', 'Bonaire, Sint Eustatius and Saba', 'BES', 535, 599),
(27, 'BA', 'BOSNIA AND HERZEGOVINA', 'Bosnia and Herzegovina', 'BIH', 70, 387),
(28, 'BW', 'BOTSWANA', 'Botswana', 'BWA', 72, 267),
(29, 'BV', 'BOUVET ISLAND', 'Bouvet Island', 'BVT', 74, 0),
(30, 'BR', 'BRAZIL', 'Brazil', 'BRA', 76, 55),
(31, 'IO', 'BRITISH INDIAN OCEAN TERRITORY', 'British Indian Ocean Territory', 'IOT', 86, 246),
(32, 'BN', 'BRUNEI DARUSSALAM', 'Brunei Darussalam', 'BRN', 96, 673),
(33, 'BG', 'BULGARIA', 'Bulgaria', 'BGR', 100, 359),
(34, 'BF', 'BURKINA FASO', 'Burkina Faso', 'BFA', 854, 226),
(35, 'BI', 'BURUNDI', 'Burundi', 'BDI', 108, 257),
(36, 'KH', 'CAMBODIA', 'Cambodia', 'KHM', 116, 855),
(37, 'CM', 'CAMEROON', 'Cameroon', 'CMR', 120, 237),
(38, 'CA', 'CANADA', 'Canada', 'CAN', 124, 1),
(39, 'CV', 'CAPE VERDE', 'Cape Verde', 'CPV', 132, 238),
(40, 'KY', 'CAYMAN ISLANDS', 'Cayman Islands', 'CYM', 136, 1345),
(41, 'CF', 'CENTRAL AFRICAN REPUBLIC', 'Central African Republic', 'CAF', 140, 236),
(42, 'TD', 'CHAD', 'Chad', 'TCD', 148, 235),
(43, 'CL', 'CHILE', 'Chile', 'CHL', 152, 56),
(44, 'CN', 'CHINA', 'China', 'CHN', 156, 86),
(45, 'CX', 'CHRISTMAS ISLAND', 'Christmas Island', 'CXR', 162, 61),
(46, 'CC', 'COCOS (KEELING) ISLANDS', 'Cocos (Keeling) Islands', NULL, NULL, 672),
(47, 'CO', 'COLOMBIA', 'Colombia', 'COL', 170, 57),
(48, 'KM', 'COMOROS', 'Comoros', 'COM', 174, 269),
(49, 'CG', 'CONGO', 'Congo', 'COG', 178, 242),
(50, 'CD', 'CONGO, THE DEMOCRATIC REPUBLIC OF THE', 'Congo, the Democratic Republic of the', 'COD', 180, 243),
(51, 'CK', 'COOK ISLANDS', 'Cook Islands', 'COK', 184, 682),
(52, 'CR', 'COSTA RICA', 'Costa Rica', 'CRI', 188, 506),
(53, 'CI', 'COTE D''IVOIRE', 'Cote D''Ivoire', 'CIV', 384, 225),
(54, 'HR', 'CROATIA', 'Croatia', 'HRV', 191, 385),
(55, 'CU', 'CUBA', 'Cuba', 'CUB', 192, 53),
(244, 'CW', 'CURACAO', 'Curacao', 'CUW', 531, 599),
(56, 'CY', 'CYPRUS', 'Cyprus', 'CYP', 196, 357),
(57, 'CZ', 'CZECHIA', 'Czech Republic', 'CZE', 203, 420),
(58, 'DK', 'DENMARK', 'Denmark', 'DNK', 208, 45),
(59, 'DJ', 'DJIBOUTI', 'Djibouti', 'DJI', 262, 253),
(60, 'DM', 'DOMINICA', 'Dominica', 'DMA', 212, 1767),
(61, 'DO', 'DOMINICAN REPUBLIC', 'Dominican Republic', 'DOM', 214, 1),
(62, 'EC', 'ECUADOR', 'Ecuador', 'ECU', 218, 593),
(63, 'EG', 'EGYPT', 'Egypt', 'EGY', 818, 20),
(64, 'SV', 'EL SALVADOR', 'El Salvador', 'SLV', 222, 503),
(65, 'GQ', 'EQUATORIAL GUINEA', 'Equatorial Guinea', 'GNQ', 226, 240),
(66, 'ER', 'ERITREA', 'Eritrea', 'ERI', 232, 291),
(67, 'EE', 'ESTONIA', 'Estonia', 'EST', 233, 372),
(68, 'ET', 'ETHIOPIA', 'Ethiopia', 'ETH', 231, 251),
(69, 'FK', 'FALKLAND ISLANDS (MALVINAS)', 'Falkland Islands (Malvinas)', 'FLK', 238, 500),
(70, 'FO', 'FAROE ISLANDS', 'Faroe Islands', 'FRO', 234, 298),
(71, 'FJ', 'FIJI', 'Fiji', 'FJI', 242, 679),
(72, 'FI', 'FINLAND', 'Finland', 'FIN', 246, 358),
(73, 'FR', 'FRANCE', 'France', 'FRA', 250, 33),
(74, 'GF', 'FRENCH GUIANA', 'French Guiana', 'GUF', 254, 594),
(75, 'PF', 'FRENCH POLYNESIA', 'French Polynesia', 'PYF', 258, 689),
(76, 'TF', 'FRENCH SOUTHERN TERRITORIES', 'French Southern Territories', 'ATF', 260, 0),
(77, 'GA', 'GABON', 'Gabon', 'GAB', 266, 241),
(78, 'GM', 'GAMBIA', 'Gambia', 'GMB', 270, 220),
(79, 'GE', 'GEORGIA', 'Georgia', 'GEO', 268, 995),
(80, 'DE', 'GERMANY', 'Germany', 'DEU', 276, 49),
(81, 'GH', 'GHANA', 'Ghana', 'GHA', 288, 233),
(82, 'GI', 'GIBRALTAR', 'Gibraltar', 'GIB', 292, 350),
(83, 'GR', 'GREECE', 'Greece', 'GRC', 300, 30),
(84, 'GL', 'GREENLAND', 'Greenland', 'GRL', 304, 299),
(85, 'GD', 'GRENADA', 'Grenada', 'GRD', 308, 1473),
(86, 'GP', 'GUADELOUPE', 'Guadeloupe', 'GLP', 312, 590),
(87, 'GU', 'GUAM', 'Guam', 'GUM', 316, 1671),
(88, 'GT', 'GUATEMALA', 'Guatemala', 'GTM', 320, 502),
(245, 'GG', 'GUERNSEY', 'Guernsey', 'GGY', 831, 44),
(89, 'GN', 'GUINEA', 'Guinea', 'GIN', 324, 224),
(90, 'GW', 'GUINEA-BISSAU', 'Guinea-Bissau', 'GNB', 624, 245),
(91, 'GY', 'GUYANA', 'Guyana', 'GUY', 328, 592),
(92, 'HT', 'HAITI', 'Haiti', 'HTI', 332, 509),
(93, 'HM', 'HEARD ISLAND AND MCDONALD ISLANDS', 'Heard Island and Mcdonald Islands', 'HMD', 334, 0),
(94, 'VA', 'HOLY SEE (VATICAN CITY STATE)', 'Holy See (Vatican City State)', 'VAT', 336, 39),
(95, 'HN', 'HONDURAS', 'Honduras', 'HND', 340, 504),
(96, 'HK', 'HONG KONG', 'Hong Kong', 'HKG', 344, 852),
(97, 'HU', 'HUNGARY', 'Hungary', 'HUN', 348, 36),
(98, 'IS', 'ICELAND', 'Iceland', 'ISL', 352, 354),
(99, 'IN', 'INDIA', 'India', 'IND', 356, 91),
(100, 'ID', 'INDONESIA', 'Indonesia', 'IDN', 360, 62),
(101, 'IR', 'IRAN, ISLAMIC REPUBLIC OF', 'Iran, Islamic Republic of', 'IRN', 364, 98),
(102, 'IQ', 'IRAQ', 'Iraq', 'IRQ', 368, 964),
(103, 'IE', 'IRELAND', 'Ireland', 'IRL', 372, 353),
(246, 'IM', 'ISLE OF MAN', 'Isle of Man', 'IMN', 833, 44),
(104, 'IL', 'ISRAEL', 'Israel', 'ISR', 376, 972),
(105, 'IT', 'ITALY', 'Italy', 'ITA', 380, 39),
(106, 'JM', 'JAMAICA', 'Jamaica', 'JAM', 388, 1876),
(107, 'JP', 'JAPAN', 'Japan', 'JPN', 392, 81),
(247, 'JE', 'JERSEY', 'Jersey', 'JEY', 832, 44),
(108, 'JO', 'JORDAN', 'Jordan', 'JOR', 400, 962),
(109, 'KZ', 'KAZAKHSTAN', 'Kazakhstan', 'KAZ', 398, 7),
(110, 'KE', 'KENYA', 'Kenya', 'KEN', 404, 254),
(111, 'KI', 'KIRIBATI', 'Kiribati', 'KIR', 296, 686),
(112, 'KP', 'KOREA, DEMOCRATIC PEOPLE''S REPUBLIC OF', 'Korea, Democratic People''s Republic of', 'PRK', 408, 850),
(113, 'KR', 'KOREA, REPUBLIC OF', 'Korea, Republic of', 'KOR', 410, 82),
(241, 'XK', 'KOSOVO', 'Kosovo', 'XKX', 0, 383),
(114, 'KW', 'KUWAIT', 'Kuwait', 'KWT', 414, 965),
(115, 'KG', 'KYRGYZSTAN', 'Kyrgyzstan', 'KGZ', 417, 996),
(116, 'LA', 'LAO PEOPLE''S DEMOCRATIC REPUBLIC', 'Lao People''s Democratic Republic', 'LAO', 418, 856),
(117, 'LV', 'LATVIA', 'Latvia', 'LVA', 428, 371),
(118, 'LB', 'LEBANON', 'Lebanon', 'LBN', 422, 961),
(119, 'LS', 'LESOTHO', 'Lesotho', 'LSO', 426, 266),
(120, 'LR', 'LIBERIA', 'Liberia', 'LBR', 430, 231),
(121, 'LY', 'LIBYAN ARAB JAMAHIRIYA', 'Libyan Arab Jamahiriya', 'LBY', 434, 218),
(122, 'LI', 'LIECHTENSTEIN', 'Liechtenstein', 'LIE', 438, 423),
(123, 'LT', 'LITHUANIA', 'Lithuania', 'LTU', 440, 370),
(124, 'LU', 'LUXEMBOURG', 'Luxembourg', 'LUX', 442, 352),
(125, 'MO', 'MACAO', 'Macao', 'MAC', 446, 853),
(127, 'MG', 'MADAGASCAR', 'Madagascar', 'MDG', 450, 261),
(128, 'MW', 'MALAWI', 'Malawi', 'MWI', 454, 265),
(129, 'MY', 'MALAYSIA', 'Malaysia', 'MYS', 458, 60),
(130, 'MV', 'MALDIVES', 'Maldives', 'MDV', 462, 960),
(131, 'ML', 'MALI', 'Mali', 'MLI', 466, 223),
(132, 'MT', 'MALTA', 'Malta', 'MLT', 470, 356),
(133, 'MH', 'MARSHALL ISLANDS', 'Marshall Islands', 'MHL', 584, 692),
(134, 'MQ', 'MARTINIQUE', 'Martinique', 'MTQ', 474, 596),
(135, 'MR', 'MAURITANIA', 'Mauritania', 'MRT', 478, 222),
(136, 'MU', 'MAURITIUS', 'Mauritius', 'MUS', 480, 230),
(137, 'YT', 'MAYOTTE', 'Mayotte', 'MYT', 175, 269),
(138, 'MX', 'MEXICO', 'Mexico', 'MEX', 484, 52),
(139, 'FM', 'MICRONESIA, FEDERATED STATES OF', 'Micronesia, Federated States of', 'FSM', 583, 691),
(140, 'MD', 'MOLDOVA, REPUBLIC OF', 'Moldova, Republic of', 'MDA', 498, 373),
(141, 'MC', 'MONACO', 'Monaco', 'MCO', 492, 377),
(142, 'MN', 'MONGOLIA', 'Mongolia', 'MNG', 496, 976),
(240, 'ME', 'MONTENEGRO', 'Montenegro', 'MNE', 499, 382),
(143, 'MS', 'MONTSERRAT', 'Montserrat', 'MSR', 500, 1664),
(144, 'MA', 'MOROCCO', 'Morocco', 'MAR', 504, 212),
(145, 'MZ', 'MOZAMBIQUE', 'Mozambique', 'MOZ', 508, 258),
(146, 'MM', 'MYANMAR', 'Myanmar', 'MMR', 104, 95),
(147, 'NA', 'NAMIBIA', 'Namibia', 'NAM', 516, 264),
(148, 'NR', 'NAURU', 'Nauru', 'NRU', 520, 674),
(149, 'NP', 'NEPAL', 'Nepal', 'NPL', 524, 977),
(150, 'NL', 'NETHERLANDS', 'Netherlands', 'NLD', 528, 31),
(151, 'AN', 'NETHERLANDS ANTILLES', 'Netherlands Antilles', 'ANT', 530, 599),
(152, 'NC', 'NEW CALEDONIA', 'New Caledonia', 'NCL', 540, 687),
(153, 'NZ', 'NEW ZEALAND', 'New Zealand', 'NZL', 554, 64),
(154, 'NI', 'NICARAGUA', 'Nicaragua', 'NIC', 558, 505),
(155, 'NE', 'NIGER', 'Niger', 'NER', 562, 227),
(156, 'NG', 'NIGERIA', 'Nigeria', 'NGA', 566, 234),
(157, 'NU', 'NIUE', 'Niue', 'NIU', 570, 683),
(158, 'NF', 'NORFOLK ISLAND', 'Norfolk Island', 'NFK', 574, 672),
(159, 'MP', 'NORTHERN MARIANA ISLANDS', 'Northern Mariana Islands', 'MNP', 580, 1670),
(126, 'MK', 'NORTH MACEDONIA', 'North Macedonia', 'MKD', 807, 389),
(160, 'NO', 'NORWAY', 'Norway', 'NOR', 578, 47),
(161, 'OM', 'OMAN', 'Oman', 'OMN', 512, 968),
(162, 'PK', 'PAKISTAN', 'Pakistan', 'PAK', 586, 92),
(163, 'PW', 'PALAU', 'Palau', 'PLW', 585, 680),
(164, 'PS', 'PALESTINIAN TERRITORY, OCCUPIED', 'Palestinian Territory, Occupied', NULL, NULL, 970),
(165, 'PA', 'PANAMA', 'Panama', 'PAN', 591, 507),
(166, 'PG', 'PAPUA NEW GUINEA', 'Papua New Guinea', 'PNG', 598, 675),
(167, 'PY', 'PARAGUAY', 'Paraguay', 'PRY', 600, 595),
(168, 'PE', 'PERU', 'Peru', 'PER', 604, 51),
(169, 'PH', 'PHILIPPINES', 'Philippines', 'PHL', 608, 63),
(170, 'PN', 'PITCAIRN', 'Pitcairn', 'PCN', 612, 0),
(171, 'PL', 'POLAND', 'Poland', 'POL', 616, 48),
(172, 'PT', 'PORTUGAL', 'Portugal', 'PRT', 620, 351),
(173, 'PR', 'PUERTO RICO', 'Puerto Rico', 'PRI', 630, 1787),
(174, 'QA', 'QATAR', 'Qatar', 'QAT', 634, 974),
(175, 'RE', 'REUNION', 'Reunion', 'REU', 638, 262),
(176, 'RO', 'ROMANIA', 'Romania', 'ROU', 642, 40),
(177, 'RU', 'RUSSIAN FEDERATION', 'Russian Federation', 'RUS', 643, 7),
(178, 'RW', 'RWANDA', 'Rwanda', 'RWA', 646, 250),
(248, 'BL', 'SAINT BARTHELEMY', 'Saint Barthelemy', 'BLM', 652, 590),
(179, 'SH', 'SAINT HELENA', 'Saint Helena', 'SHN', 654, 290),
(180, 'KN', 'SAINT KITTS AND NEVIS', 'Saint Kitts and Nevis', 'KNA', 659, 1869),
(181, 'LC', 'SAINT LUCIA', 'Saint Lucia', 'LCA', 662, 1758),
(249, 'MF', 'SAINT MARTIN', 'Saint Martin', 'MAF', 663, 590),
(182, 'PM', 'SAINT PIERRE AND MIQUELON', 'Saint Pierre and Miquelon', 'SPM', 666, 508),
(183, 'VC', 'SAINT VINCENT AND THE GRENADINES', 'Saint Vincent and the Grenadines', 'VCT', 670, 1784),
(184, 'WS', 'SAMOA', 'Samoa', 'WSM', 882, 684),
(185, 'SM', 'SAN MARINO', 'San Marino', 'SMR', 674, 378),
(186, 'ST', 'SAO TOME AND PRINCIPE', 'Sao Tome and Principe', 'STP', 678, 239),
(187, 'SA', 'SAUDI ARABIA', 'Saudi Arabia', 'SAU', 682, 966),
(188, 'SN', 'SENEGAL', 'Senegal', 'SEN', 686, 221),
(189, 'RS', 'SERBIA', 'Serbia', 'SRB', 688, 381),
(190, 'SC', 'SEYCHELLES', 'Seychelles', 'SYC', 690, 248),
(191, 'SL', 'SIERRA LEONE', 'Sierra Leone', 'SLE', 694, 232),
(192, 'SG', 'SINGAPORE', 'Singapore', 'SGP', 702, 65),
(250, 'SX', 'SINT MAARTEN', 'Sint Maarten', 'SXM', 534, 1),
(193, 'SK', 'SLOVAKIA', 'Slovakia', 'SVK', 703, 421),
(194, 'SI', 'SLOVENIA', 'Slovenia', 'SVN', 705, 386),
(195, 'SB', 'SOLOMON ISLANDS', 'Solomon Islands', 'SLB', 90, 677),
(196, 'SO', 'SOMALIA', 'Somalia', 'SOM', 706, 252),
(197, 'ZA', 'SOUTH AFRICA', 'South Africa', 'ZAF', 710, 27),
(198, 'GS', 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', 'South Georgia and the South Sandwich Islands', 'SGS', 239, 0),
(251, 'SS', 'SOUTH SUDAN', 'South Sudan', 'SSD', 728, 211),
(199, 'ES', 'SPAIN', 'Spain', 'ESP', 724, 34),
(200, 'LK', 'SRI LANKA', 'Sri Lanka', 'LKA', 144, 94),
(201, 'SD', 'SUDAN', 'Sudan', 'SDN', 736, 249),
(202, 'SR', 'SURINAME', 'Suriname', 'SUR', 740, 597),
(203, 'SJ', 'SVALBARD AND JAN MAYEN', 'Svalbard and Jan Mayen', 'SJM', 744, 47),
(204, 'SZ', 'SWAZILAND', 'Swaziland', 'SWZ', 748, 268),
(205, 'SE', 'SWEDEN', 'Sweden', 'SWE', 752, 46),
(206, 'CH', 'SWITZERLAND', 'Switzerland', 'CHE', 756, 41),
(207, 'SY', 'SYRIAN ARAB REPUBLIC', 'Syrian Arab Republic', 'SYR', 760, 963),
(208, 'TW', 'TAIWAN, PROVINCE OF CHINA', 'Taiwan, Province of China', 'TWN', 158, 886),
(209, 'TJ', 'TAJIKISTAN', 'Tajikistan', 'TJK', 762, 992),
(210, 'TZ', 'TANZANIA, UNITED REPUBLIC OF', 'Tanzania, United Republic of', 'TZA', 834, 255),
(211, 'TH', 'THAILAND', 'Thailand', 'THA', 764, 66),
(212, 'TL', 'TIMOR-LESTE', 'Timor-Leste', 'TLS', 626, 670),
(213, 'TG', 'TOGO', 'Togo', 'TGO', 768, 228),
(214, 'TK', 'TOKELAU', 'Tokelau', 'TKL', 772, 690),
(215, 'TO', 'TONGA', 'Tonga', 'TON', 776, 676),
(216, 'TT', 'TRINIDAD AND TOBAGO', 'Trinidad and Tobago', 'TTO', 780, 1868),
(217, 'TN', 'TUNISIA', 'Tunisia', 'TUN', 788, 216),
(218, 'TR', 'TÜRKIYE', 'Türkiye, The Republic of', 'TUR', 792, 90),
(219, 'TM', 'TURKMENISTAN', 'Turkmenistan', 'TKM', 795, 993),
(220, 'TC', 'TURKS AND CAICOS ISLANDS', 'Turks and Caicos Islands', 'TCA', 796, 1649),
(221, 'TV', 'TUVALU', 'Tuvalu', 'TUV', 798, 688),
(222, 'UG', 'UGANDA', 'Uganda', 'UGA', 800, 256),
(223, 'UA', 'UKRAINE', 'Ukraine', 'UKR', 804, 380),
(224, 'AE', 'UNITED ARAB EMIRATES', 'United Arab Emirates', 'ARE', 784, 971),
(225, 'GB', 'UNITED KINGDOM', 'United Kingdom', 'GBR', 826, 44),
(226, 'US', 'UNITED STATES', 'United States', 'USA', 840, 1),
(227, 'UM', 'UNITED STATES MINOR OUTLYING ISLANDS', 'United States Minor Outlying Islands', 'UMI', 581, 1),
(228, 'UY', 'URUGUAY', 'Uruguay', 'URY', 858, 598),
(229, 'UZ', 'UZBEKISTAN', 'Uzbekistan', 'UZB', 860, 998),
(230, 'VU', 'VANUATU', 'Vanuatu', 'VUT', 548, 678),
(231, 'VE', 'VENEZUELA', 'Venezuela', 'VEN', 862, 58),
(232, 'VN', 'VIET NAM', 'Viet Nam', 'VNM', 704, 84),
(233, 'VG', 'VIRGIN ISLANDS, BRITISH', 'Virgin Islands, British', 'VGB', 92, 1284),
(234, 'VI', 'VIRGIN ISLANDS, U.S.', 'Virgin Islands, U.s.', 'VIR', 850, 1340),
(235, 'WF', 'WALLIS AND FUTUNA', 'Wallis and Futuna', 'WLF', 876, 681),
(236, 'EH', 'WESTERN SAHARA', 'Western Sahara', 'ESH', 732, 212),
(237, 'YE', 'YEMEN', 'Yemen', 'YEM', 887, 967),
(238, 'ZM', 'ZAMBIA', 'Zambia', 'ZMB', 894, 260),
(239, 'ZW', 'ZIMBABWE', 'Zimbabwe', 'ZWE', 716, 263);

INSERT INTO "public"."creator_portfolio_items" ("id", "image_url", "caption", "creator_id", "is_deleted", "title") VALUES
('729ee9e6-ce9d-46c6-995f-805122b357c5', 'xxx', 'image1', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f', NULL),
('a33188e6-26f2-4e7b-8137-0931279cad55', 'yyy', 'image2', '24078a3e-f397-41af-ac75-a86ea2569bdc', 't', NULL),
('6b3ac5d3-f55e-442b-8227-b1c419b84968', 'https://cdn.shopify.com/s/files/1/0278/1826/2580/files/IMG_7553_240x240.jpg?v=1635935588', 'Nice and shiny', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'Bespoke wedding ring'),
('ef1c5fdc-f70c-4e6c-b104-4188faa8155e', 'https://cdn.shopify.com/s/files/1/0278/1826/2580/files/IMG_7555_240x240.jpg?v=1635935626', 'Nice and shiny', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'Bespoke wedding ring'),
('d3555dcf-3cb6-485f-a4fe-8ba17268c1a3', 'https://cdn.shopify.com/s/files/1/0278/1826/2580/files/IMG_7556_240x240.jpg?v=1635935746', 'Rare jade earrings', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'Bespoke earrings'),
('10a51f1b-1337-4d70-b1c6-33df84907048', 'https://cdn.shopify.com/s/files/1/0278/1826/2580/files/IMG_7553_240x240.jpg?v=1635935588', 'Nice and shiny', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'Bespoke wedding ring'),
('986383f0-c84b-4963-b218-eddb9e88f46a', 'https://cdn.shopify.com/s/files/1/0278/1826/2580/files/IMG_7555_240x240.jpg?v=1635935626', 'Nice and shiny', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'Bespoke wedding ring'),
('e894b8ac-c275-4722-ab97-006e18e56153', 'https://cdn.shopify.com/s/files/1/0278/1826/2580/files/IMG_7556_240x240.jpg?v=1635935746', 'Rare jade earrings', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'Bespoke earrings'),
('4223371f-35f1-4f35-bc72-cffe229a1476', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-portfolio-d4ae0772-7bfa-406b-868a-66efd134f5c6.jpeg', 'asd', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'asd'),
('6dea7c1d-929c-4aee-b40e-96695f59db7d', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-portfolio-299af239-66d6-40ff-8172-ce459bf471f1.jpeg', 'asdasd', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'Nice project'),
('e6392ac7-c05f-4ad3-a1b5-2469928d279a', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-portfolio-84d4ea58-7bb9-4c98-98d2-105a99105230.jpeg', '18k gold with baroque pearl', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'Bespoke wedding necklace'),
('d907e233-533d-483d-ad7c-b12450f27ad3', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-portfolio-4d74a04a-4906-4518-9d23-6cd5da14dfb1.jpeg', 'Baroque pearls ', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'Pearl necklace'),
('7601e839-9b56-4742-addb-41d47b8f3d06', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-portfolio-d8b6bc13-9195-460f-b2e4-b45d04dbbd8d.jpeg', '18k gold with baroque pearl', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f', 'Bespoke wedding necklace'),
('628b6e04-cbeb-4acc-a23e-74cf3e78aa5e', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-portfolio-f8fa48e8-997d-429a-9650-5edcd82a1ca6.jpeg', '18k gold with baroque pearls', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'Bespoke earrings'),
('510d6548-6f97-4a5e-b9e8-9ff9f81913a1', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-portfolio-754e3b24-d04c-4071-9237-657a9dbeda52.jpeg', '18k gold with baroque pearls', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f', 'Bespoke earrings'),
('4b7ca6a3-0611-406a-88e7-c5070d5efc6a', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-portfolio-91ab3910-0a3d-43ad-85bc-7a375ae6a0ce.jpeg', 'asd', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't', 'asd'),
('11567e8a-413d-4f5c-bf47-6693daa552b4', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-portfolio-070bf268-aeb5-40f9-af14-72f24da603c7.jpeg', 'Wedding set', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f', 'Wedding'),
('f38dd08e-72ba-48ee-b72b-25d0a0f913bc', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/ed54f572-f0e7-4a67-b2bd-5836e925dc5a-portfolio-76ec05e9-2076-45ad-930f-f0d13a44aca6.jpeg', '', 'ed54f572-f0e7-4a67-b2bd-5836e925dc5a', 'f', ''),
('7660df15-834d-4e02-b2b3-8f2eef451514', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/ed54f572-f0e7-4a67-b2bd-5836e925dc5a-portfolio-afe43fb5-e8e3-4970-a4ff-ff96d6436c2c.jpeg', '', 'ed54f572-f0e7-4a67-b2bd-5836e925dc5a', 'f', '');

INSERT INTO "public"."creator_products" ("id", "created_at", "image_url", "title", "description", "currency", "starting_price", "creator_id", "is_deleted") VALUES
('02a56f9f-4c90-4e5f-939c-4f0f7678c2ea', '2023-09-05 15:05:58.480265', 'xxx', 'Option C', 'Nicest option', 'SGD', 300, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f'),
('18786c4f-ecbc-41f6-84f5-e098d6c762a1', '2023-09-05 15:41:19.836722', 'xxx', 'Option A', 'Nice option', 'SGD', 300, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f'),
('18e85c95-bdd4-4e82-8772-550019a5d095', '2023-09-11 12:07:05.171492', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-d97c00ae-d3e9-4aa7-86c0-e5857bf38dba.jpeg', 'Bespoke earrings', '18k gold with gem or baroque pearl design of your choice ', 'SGD', 500, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f'),
('1cbfc5d9-efdc-4703-a926-84abaf69f1bc', '2023-09-05 15:05:42.954203', 'xxx', 'Option A', 'Nice option', 'USD', 1000, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f'),
('22ae3771-22c2-414b-a884-0dae0f4e0b45', '2023-09-11 12:05:58.82502', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-ea021df4-87fe-4442-a795-6759a791eb76.jpeg', 'Bespoke necklace', '18k gold chain with gem or pearl of your choice', 'SGD', 500, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('3c36f609-2bd3-4fee-a530-ef437cc0cea7', '2023-09-05 15:05:52.326496', 'xxx', 'Option B', 'Nicer option', 'SGD', 200, '24078a3e-f397-41af-ac75-a86ea2569bdc', 't'),
('3ceeccf1-9f7e-46c3-8941-a7955c93a22e', '2023-09-14 16:47:28.261533', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/ed54f572-f0e7-4a67-b2bd-5836e925dc5a-product-7871075a-bbc4-4b86-8998-17790d8465da.jpeg', 'Cat portrait', 'nice portrait', 'SGD', 987, 'ed54f572-f0e7-4a67-b2bd-5836e925dc5a', 'f'),
('515b70ba-75ac-40de-b42b-6abea5e5fa7f', '2023-09-11 12:06:32.221602', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-4b86ba73-f745-448d-b252-eb3714f5754e.jpeg', 'Bespoke necklace', '18k gold chain with gem of your choice', 'SGD', 500, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('5410f236-2079-4600-b5c0-3ad1b6522fe3', '2023-09-14 16:24:33.946981', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-eb43aa4d-da12-4c8e-b8a9-e2b3bc0c2649.jpeg', 'Bespoke wedding ring', 'Gemstones of your choice ', 'SGD', 1000, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f'),
('55866f36-3d3c-49e6-94b9-ff99cedcde47', '2023-09-11 05:07:44.985792', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-4979f81e-fd91-4022-ba9e-c76e2e549f8b.jpeg', 'Bespoke earrings', '18k gold or silver, with baroque pearls', 'SGD', 500, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('609e86a3-07b1-4ddd-96a3-09ad42b6f26c', '2023-09-11 03:07:43.573078', 'xxx', 'Option A', 'Nice option', 'SGD', 100, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f'),
('679da406-ac28-4891-b1e2-ba2ff99da28f', '2023-09-11 05:05:17.66681', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-28b37c6f-5fbc-4724-889b-3854929d5cd9.jpeg', 'ad', 'asd', 'SGD', 500, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('733ae299-ccdc-4aba-a734-8305fc0306d1', '2023-09-11 05:08:45.800396', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-6d6caeaa-99bb-4e0f-89cc-89a31f56f895.jpeg', 'Bespoke necklace', '18k gold with gemstone of your choice', 'SGD', 500, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('79f9dd70-2055-422c-b90e-d2a5a9ea9258', '2023-09-14 16:23:21.991962', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-93ac5898-4932-49a1-ac17-204e0aa2f604.jpeg', 'Custom', 'Send me your ideas and we''ll create something!', 'SGD', 10000, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('87300d3c-b618-4f04-8720-1e6fb757461a', '2023-09-05 15:17:20.416439', 'xxx', 'Option A', 'Nice option', 'SGD', 300, '24078a3e-f397-41af-ac75-a86ea2569bdc', 't'),
('8c37763a-ae30-4623-a739-012ef7594282', '2023-09-11 05:13:20.011522', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-dc0d7ea2-57c0-497b-93f7-1f7765e6644b.jpeg', 'ase', 'asd', 'SGD', 500, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('9c049403-be7c-4dad-a0e3-81e4f403d093', '2023-09-11 11:28:29.138199', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-99dff6eb-96b8-420d-aa90-81750cc0677c.jpeg', 'Bespoke necklace', '18k gold with gemstone or pearl of your choice', 'SGD', 483, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('b50e4c46-570c-4afb-9666-88d8b475ec35', '2023-09-14 16:24:34.227797', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-90c1daa7-f87e-4300-954b-949a4a811a7f.jpeg', 'Bespoke wedding ring', 'Gemstones of your choice ', 'SGD', 1000, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('ba8410ce-0863-4c82-b28e-51e5098c78cc', '2023-09-14 03:58:20.086785', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-product-84f74f89-6149-438b-9484-8d8657eb412f.jpeg', 'asd', 'asd', 'SGD', 1, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('be88fb77-fcab-4b9f-827c-dbb9e85d349e', '2023-09-06 15:04:46.945351', 'xxx', 'Option A', 'Nice option', 'SGD', 100, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f'),
('d5ded3cd-3a9e-479e-90fd-1ed32740b271', '2023-09-05 15:41:37.017945', 'xxx', 'Option A', 'Nice option', 'SGD', 300, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f');

INSERT INTO "public"."creator_project_stages" ("id", "created_at", "index", "name", "description", "time_estimate_unit", "time_estimate_start", "time_estimate_end", "creator_id", "is_deleted") VALUES
('04735c0d-8976-415f-973e-ef3926949caa', '2023-09-06 06:54:18.252902', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, '24078a3e-f397-41af-ac75-a86ea2569bdc', 't'),
('097161f8-c540-4e33-8a4b-05028363ef8d', '2023-09-12 06:34:08.941541', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '0c7aa3a4-eaf8-4266-9ea7-21255e165f5b', 'f'),
('0a421e65-cd68-42cb-8ddf-44aa8fcd032e', '2023-09-12 06:34:08.941541', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '0c7aa3a4-eaf8-4266-9ea7-21255e165f5b', 'f'),
('0b943b48-2306-4f50-a8ff-b2110a96e314', '2023-09-12 06:51:25.318364', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'ed54f572-f0e7-4a67-b2bd-5836e925dc5a', 'f'),
('0c93276e-8d8f-423c-aab3-0ac6dba6d22f', '2023-09-12 02:44:18.462486', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f'),
('0f86c318-d515-4c43-992b-d14af29aceb7', '2023-09-12 02:44:18.462486', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f'),
('146e0491-d2d7-47a9-9b31-d8374dc49f92', '2023-09-12 02:43:43.728031', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('180d6371-f6a2-40af-92a7-d9e9394a1daa', '2023-09-12 02:33:58.110987', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'c12f5f1c-e56a-4011-942f-fb0bfe8ac837', 'f'),
('1a391a1e-70c1-4108-9a63-e82c0d852026', '2023-09-12 02:33:58.110987', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'c12f5f1c-e56a-4011-942f-fb0bfe8ac837', 'f'),
('29ccc063-1cd5-48de-be79-558684883a1a', '2023-09-12 02:30:37.028864', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f'),
('305551f1-0581-4bf6-b9b6-637ec2b323e6', '2023-09-12 06:34:56.310394', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'f3407131-8da1-464c-b6ef-0b8345c4d6b4', 'f'),
('30ffe09e-2085-4f38-8934-10e212aebed3', '2023-09-06 06:54:18.39936', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, '24078a3e-f397-41af-ac75-a86ea2569bdc', 't'),
('3b78796b-340b-45a2-8245-8b671e24d2e2', '2023-09-12 06:51:25.318364', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'ed54f572-f0e7-4a67-b2bd-5836e925dc5a', 'f'),
('40584e44-188c-4962-88c9-913fadd0a2b6', '2023-09-12 02:30:37.028864', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f'),
('43b897a5-5f67-41b5-b060-e60d2db0cd69', '2023-09-12 02:43:43.728031', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('45d73545-1cf1-421c-855f-3d9a533bc7c5', '2023-09-14 16:28:12.80253', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'ec315031-bb2c-4aea-8c44-cf090d21e194', 'f'),
('46b2c17e-d469-4652-b32e-92a8d017a00c', '2023-09-14 16:28:12.80253', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'ec315031-bb2c-4aea-8c44-cf090d21e194', 'f'),
('4ae5bfc6-5633-40f7-855b-96df4dde97ac', '2023-09-12 06:34:56.310394', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'f3407131-8da1-464c-b6ef-0b8345c4d6b4', 'f'),
('5184f786-2d97-41b0-b914-1d655f952e04', '2023-09-12 06:51:25.318364', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'ed54f572-f0e7-4a67-b2bd-5836e925dc5a', 'f'),
('52967ac8-2ec5-40f0-ba87-7696b81bfc50', '2023-09-06 06:54:18.20487', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, '24078a3e-f397-41af-ac75-a86ea2569bdc', 't'),
('545e57b1-9edf-418c-8939-87813ce3d8f8', '2023-09-06 06:54:18.350382', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, '24078a3e-f397-41af-ac75-a86ea2569bdc', 't'),
('58c5aa94-f17c-493d-9d33-37da507d9e6a', '2023-09-12 06:51:25.318364', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'ed54f572-f0e7-4a67-b2bd-5836e925dc5a', 'f'),
('5ad1109c-879c-4446-83fb-9dc1a005fe36', '2023-09-12 02:30:37.028864', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f'),
('5ad6fdf7-e659-41ba-ad1f-003ec3ab1f8d', '2023-09-12 06:34:56.310394', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'f3407131-8da1-464c-b6ef-0b8345c4d6b4', 'f'),
('5bf3b2c6-e6a6-4aa0-a8dc-56354a1084d4', '2023-09-12 02:33:58.110987', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'c12f5f1c-e56a-4011-942f-fb0bfe8ac837', 'f'),
('5d5f759b-5830-4016-be0b-e66813b2beec', '2023-09-12 02:30:37.028864', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f'),
('6476d0dc-8c8f-439e-851b-cdb214c59b42', '2023-09-12 02:33:58.110987', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'c12f5f1c-e56a-4011-942f-fb0bfe8ac837', 'f'),
('728abba3-b115-4720-9e23-3221eb1a8c82', '2023-09-12 06:34:08.941541', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '0c7aa3a4-eaf8-4266-9ea7-21255e165f5b', 'f'),
('7407c425-32cb-4d10-b268-1703b8523029', '2023-09-12 02:43:43.728031', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('755b81fe-12d3-4ca8-bd0b-46ee0bd34ac9', '2023-09-12 02:44:18.462486', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f'),
('75be0735-54fa-4791-8c3a-4ce07a2bb6e4', '2023-09-14 16:28:12.80253', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'ec315031-bb2c-4aea-8c44-cf090d21e194', 'f'),
('7b21dcfb-8d3c-4fba-bc3e-30bdbb8d52d6', '2023-09-12 06:34:08.941541', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '0c7aa3a4-eaf8-4266-9ea7-21255e165f5b', 'f'),
('7e509479-8ac2-4e14-9861-dbf780baf093', '2023-09-12 02:30:37.028864', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f'),
('88fa5abc-b1fc-4e72-ab9b-a8323b163f68', '2023-09-12 06:34:56.310394', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'f3407131-8da1-464c-b6ef-0b8345c4d6b4', 'f'),
('892215fa-9eb3-4e9d-8c8a-4f09975c9bcb', '2023-09-12 02:43:43.728031', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('91953a0b-eba1-4151-914c-db7c9b256cdc', '2023-09-12 02:43:43.728031', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('960acf10-de2c-4ca4-b807-469a554ad9da', '2023-09-12 02:44:18.462486', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f'),
('99740f8e-94d3-416b-9a87-ebf87a13e1ed', '2023-09-06 06:54:18.302913', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, '24078a3e-f397-41af-ac75-a86ea2569bdc', 't'),
('9c2cb278-bf3e-4fd4-a8b9-e1a4eeaa6703', '2023-09-12 02:43:43.728031', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 't'),
('a8de99c3-4a30-4d2d-94fc-98e02f97079b', '2023-09-14 16:28:12.80253', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'ec315031-bb2c-4aea-8c44-cf090d21e194', 'f'),
('aecf9111-706d-4cd8-9129-f260a0ea3fbc', '2023-09-12 02:33:58.110987', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'c12f5f1c-e56a-4011-942f-fb0bfe8ac837', 'f'),
('b95b4d7a-4b82-440d-87d5-28f42c2d9d63', '2023-09-12 06:34:56.310394', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'f3407131-8da1-464c-b6ef-0b8345c4d6b4', 'f'),
('ca57799e-76bc-4efa-adaf-bfbd8e153ae3', '2023-09-12 02:44:18.462486', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f'),
('d16f8761-7244-4a8f-8ec2-99a3b971bf56', '2023-09-14 16:28:12.80253', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'ec315031-bb2c-4aea-8c44-cf090d21e194', 'f'),
('e1b4526f-7684-4dee-89c4-7d0316117c22', '2023-09-12 06:34:08.941541', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '0c7aa3a4-eaf8-4266-9ea7-21255e165f5b', 'f'),
('e3f56729-9e79-4ef1-942a-7102c91aaced', '2023-09-12 06:34:56.310394', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'f3407131-8da1-464c-b6ef-0b8345c4d6b4', 'f'),
('e5306c99-c27a-4b73-82e7-25f716683e3d', '2023-09-12 06:34:08.941541', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '0c7aa3a4-eaf8-4266-9ea7-21255e165f5b', 'f'),
('e8c406fe-9c65-4223-a24e-3b5d81d11581', '2023-09-12 02:44:18.462486', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f'),
('ea1a10ce-a606-4bfc-a441-7f75281bb8aa', '2023-09-14 16:28:12.80253', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'ec315031-bb2c-4aea-8c44-cf090d21e194', 'f'),
('ee9b32ac-43f4-4d5e-bce9-781de9a652ca', '2023-09-12 02:33:58.110987', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'c12f5f1c-e56a-4011-942f-fb0bfe8ac837', 'f'),
('ef35f15f-d893-46f0-a57b-08a8b3c00a9a', '2023-09-12 06:51:25.318364', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'ed54f572-f0e7-4a67-b2bd-5836e925dc5a', 'f'),
('fe0cc29f-85a3-4670-9a50-7b9bbde5ef4b', '2023-09-12 06:51:25.318364', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'ed54f572-f0e7-4a67-b2bd-5836e925dc5a', 'f'),
('fe88c9fe-628f-43fa-a4ec-f2282017733e', '2023-09-12 02:30:37.028864', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'f');

INSERT INTO "public"."creator_social_links" ("id", "created_at", "type", "url", "is_deleted", "creator_id") VALUES
('007ad57c-17a7-45e7-b9b9-4011c51aac4a', '2023-09-06 04:08:26.970355', 'FACEBOOK', 'xxx', 'f', '24078a3e-f397-41af-ac75-a86ea2569bdc'),
('38ddd66e-0a41-4b0b-8752-d06825d89992', '2023-09-06 03:57:41.301703', 'FACEBOOK', 'xxx', 'f', '24078a3e-f397-41af-ac75-a86ea2569bdc'),
('7ffe149d-c486-4fdd-b5bb-950395da9524', '2023-09-06 03:57:22.830909', 'INSTAGRAM', 'updatedurl', 'f', '24078a3e-f397-41af-ac75-a86ea2569bdc'),
('9b04b48a-f2f6-440b-95c0-c2adf3f39cb8', '2023-09-06 15:49:37.616595', 'FACEBOOK', '1', 'f', '24078a3e-f397-41af-ac75-a86ea2569bdc'),
('9e3debe3-f01a-4b5d-9222-a88a494072cc', '2023-09-06 04:08:34.926159', 'FACEBOOK', 'xxx', 't', '24078a3e-f397-41af-ac75-a86ea2569bdc'),
('b1043e67-f0df-4fce-b312-20504115dfa1', '2023-09-06 15:49:49.165426', 'FACEBOOK', '123', 'f', '24078a3e-f397-41af-ac75-a86ea2569bdc'),
('fed55c2c-9965-45ca-b80d-fe8b8ba8814d', '2023-09-06 03:57:41.301703', 'FACEBOOK', 'xxx', 'f', '24078a3e-f397-41af-ac75-a86ea2569bdc'),
('ff0eba53-38bd-4579-8de9-2b7e69c1dfe5', '2023-09-06 04:07:32.835516', 'FACEBOOK', 'xxx', 'f', '24078a3e-f397-41af-ac75-a86ea2569bdc');

INSERT INTO "public"."creator_testimonials" ("id", "created_at", "creator_id", "project_id", "patron_id", "patron_tagline", "testimonial", "image_url", "is_deleted") VALUES
('964e66bd-a2ad-4681-884c-b59b00a92c56', '2023-09-14 15:59:12.732711', '81b909e7-8b84-41c7-9e17-0b02c07d2425', '9d1ac166-f4e7-4219-924d-5204bb9f2058', '27d3b493-f912-4072-829e-962becea22be', 'Anna, Satisfied customer', '“It was a great experience customizing bespoke jewelry with The Jeweller. For my wedding jewelry I wanted something unique and timeless. The Jeweller definitely delivered!”', 'https://images.unsplash.com/photo-1610214354095-684029c14300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80', 'f'),
('c30d4e4f-999f-4365-8b76-d93e028a0e1a', '2023-09-06 15:44:29.9494', '24078a3e-f397-41af-ac75-a86ea2569bdc', '9d1ac166-f4e7-4219-924d-5204bb9f2058', '27d3b493-f912-4072-829e-962becea22be', 'Satisfied customer', 'Love it!', 'xxx', 'f');

INSERT INTO "public"."creators" ("id", "created_at", "display_name", "tagline", "country_of_operation", "about", "logo_image_url", "slots_per_month", "display_slots_per_month", "display_project_count", "allow_consultation_booking", "consultation_notice_days", "lead_time_in_weeks", "project_description_guideline", "payment_instructions", "is_deleted", "custom_url") VALUES
('01151acc-cb60-4ff1-863b-a3568f0dc069', '2023-09-05 08:47:56.258339', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
('0c7aa3a4-eaf8-4266-9ea7-21255e165f5b', '2023-09-12 06:34:08.941541', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
('194a12f1-6204-45fc-b056-e39e607e2ad2', '2023-09-05 08:49:22.488298', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
('24078a3e-f397-41af-ac75-a86ea2569bdc', '2023-09-05 08:56:54.003325', 'Hello world', 'I am a creator', 'SINGAPORE', 'I am a creator', 'xxx', 2, 't', 't', 't', 7, 4, 'Add these details: color, size', 'Pay me or else...', 'f', NULL),
('3f2133cc-e579-44fa-89c7-11b4d66bf986', '2023-09-09 15:18:26.304814', NULL, NULL, NULL, NULL, 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/3f2133cc-e579-44fa-89c7-11b4d66bf986-creatorlogo-fac4f2d4-3025-4896-b2c0-8b8c5b0984f8.jpeg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
('81b909e7-8b84-41c7-9e17-0b02c07d2425', '2023-09-09 15:22:51.79555', 'The Jeweller', 'Modern bespoke jewellery', 'SINGAPORE', 'Fine jeweller based in Singapore who sources, designs and crafts each piece by hand using quality materials. I love working on custom pieces for weddings, special events or everyday wear. I create pieces that I hope will be enjoyed for years to come.', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/81b909e7-8b84-41c7-9e17-0b02c07d2425-creatorlogo-c9c39150-f953-4ae3-be77-3c9b3da5dcd1.jpeg', 5, NULL, NULL, NULL, NULL, 3, 'Include in your message the following details: your design ideas (style, colour, size etc.) and your preferred materials (925 silver, vermeil, 14k/18k/22k gold etc.). ', 'I take 50% deposit to confirm the brief. 
Paynow me at 9XXX XXXX.', 'f', 'thejeweller'),
('8710cb6c-f5de-4caf-8995-3be8af9b9812', '2023-09-08 10:30:21.201209', 'Cat whisperer', 'Lover of cats and cat people ', 'SINGAPORE', 'I love painting cat portraits! Specialise in watercolour and oil paints ', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/8710cb6c-f5de-4caf-8995-3be8af9b9812-creatorlogo-4aaf26e1-45f3-4d1d-921b-ae2978a1d9b3.jpeg', 2, 't', 't', 't', 7, 4, 'Add these details: color, size', 'Pay me or else...', 'f', NULL),
('8eb70ea1-a941-430a-b7aa-e402a57f7045', '2023-09-05 08:48:48.367494', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
('c12f5f1c-e56a-4011-942f-fb0bfe8ac837', '2023-09-12 02:33:58.110987', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
('ea3c16e7-9f88-47ab-acbf-0272cbd1e1b7', '2023-09-08 10:28:52.970967', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
('eadb2f1a-9f2c-4057-829f-ec241eea477d', '2023-09-08 10:29:59.524751', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
('ec315031-bb2c-4aea-8c44-cf090d21e194', '2023-09-14 16:28:12.80253', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
('ed54f572-f0e7-4a67-b2bd-5836e925dc5a', '2023-09-12 06:51:25.318364', 'Cat whisperer', 'Cat whisperer', 'SINGAPORE', 'I like cats and people who like cats', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/ed54f572-f0e7-4a67-b2bd-5836e925dc5a-creatorlogo-c31798ad-2b9f-4534-9c24-fd840def4b6d.jpeg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL),
('f3407131-8da1-464c-b6ef-0b8345c4d6b4', '2023-09-12 06:34:56.310394', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL);

INSERT INTO "public"."currencies" ("value") VALUES
('SGD'),
('USD');

INSERT INTO "public"."delivery_methods" ("value") VALUES
('DELIVERY'),
('MEETUP');

INSERT INTO "public"."project_brief_statuses" ("value") VALUES
('ACCEPTED'),
('CANCELLED'),
('DECLINED'),
('EXPIRED'),
('PENDING_RESPONSE');

INSERT INTO "public"."project_briefs" ("id", "created_at", "creator_id", "patron_id", "product_id", "details", "budget_currency", "budget_amount", "deadline", "brief_expiry_date", "consultation_slot", "delivery_method", "status", "is_deleted", "image_url") VALUES
('1f0275f0-7f4c-47a9-8e3f-0616a413117d', '2023-09-06 08:07:12.369188', '24078a3e-f397-41af-ac75-a86ea2569bdc', '27d3b493-f912-4072-829e-962becea22be', 'd5ded3cd-3a9e-479e-90fd-1ed32740b271', 'Please make nice nice', 'SGD', 1000, '2023-10-30', '2023-09-08 08:07:12.369188', '2023-10-01 08:00:00', 'MEETUP', 'PENDING_RESPONSE', 'f', NULL),
('2992b2b7-d789-48e6-aac6-3e4df9a9bb8e', '2023-09-12 06:56:50.497254', '24078a3e-f397-41af-ac75-a86ea2569bdc', '27d3b493-f912-4072-829e-962becea22be', 'd5ded3cd-3a9e-479e-90fd-1ed32740b271', 'Please make nice nice', 'SGD', 1000, '2023-10-30', '2023-09-14 06:56:50.497254', '2023-10-01 08:00:00', 'MEETUP', 'PENDING_RESPONSE', 'f', NULL),
('2e2352c1-ffc5-469b-a1d0-4fec3d03c411', '2023-09-14 16:30:55.286405', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f0757edf-3e76-4510-a0fb-6dfbaba1427a', '18e85c95-bdd4-4e82-8772-550019a5d095', 'Something to impress my wife ', NULL, 46, NULL, '2023-09-16 16:30:55.286405', NULL, 'MEETUP', 'PENDING_RESPONSE', 'f', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/f0757edf-3e76-4510-a0fb-6dfbaba1427a-brief-8247ea89-d869-4321-9299-73d0926853d2.jpeg'),
('351977d7-909a-4169-be87-f45e0a133d20', '2023-09-12 08:33:37.337634', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f0757edf-3e76-4510-a0fb-6dfbaba1427a', '515b70ba-75ac-40de-b42b-6abea5e5fa7f', 'Bespoke earrings', 'SGD', 10000, '2023-10-30', '2023-09-14 08:33:37.337634', '2023-10-01 08:00:00', 'DELIVERY', 'ACCEPTED', 'f', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/brief-7a109bd1-9484-4383-a0fb-851529b0caf2.jpeg'),
('44b69261-d4ba-4686-be6a-4cb39e8bfc86', '2023-09-12 08:27:35.591526', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f0757edf-3e76-4510-a0fb-6dfbaba1427a', '515b70ba-75ac-40de-b42b-6abea5e5fa7f', 'as', 'SGD', 100, '2023-10-30', '2023-09-14 08:27:35.591526', '2023-10-01 08:00:00', 'DELIVERY', 'ACCEPTED', 'f', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/f0757edf-3e76-4510-a0fb-6dfbaba1427a-brief-a09f5c97-d100-4a14-8957-88c6505d69c3.jpeg'),
('82faa967-b03d-4112-a81f-2c9d3ebf4e3c', '2023-09-14 16:29:48.432567', '81b909e7-8b84-41c7-9e17-0b02c07d2425', '6c25947c-653f-464d-9208-339350fa05fc', '5410f236-2079-4600-b5c0-3ad1b6522fe3', 'I want a massive diamond', NULL, 20, NULL, '2023-09-16 16:29:48.432567', NULL, 'DELIVERY', 'PENDING_RESPONSE', 'f', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/6c25947c-653f-464d-9208-339350fa05fc-brief-768cece3-fc10-4dfc-9268-eb5dc8587948.jpeg'),
('9543b543-056d-4334-bed5-88ee366b0639', '2023-09-12 08:22:50.258739', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'f0757edf-3e76-4510-a0fb-6dfbaba1427a', '18e85c95-bdd4-4e82-8772-550019a5d095', 'I want a ring that looks like this ', 'SGD', 100, '2023-10-30', '2023-09-14 08:22:50.258739', '2023-10-01 08:00:00', 'DELIVERY', 'ACCEPTED', 'f', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/brief-a12120ed-0f3b-48ba-b10e-753732ae005e.jpeg'),
('a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', '2023-09-06 06:34:28.905896', '24078a3e-f397-41af-ac75-a86ea2569bdc', '27d3b493-f912-4072-829e-962becea22be', 'd5ded3cd-3a9e-479e-90fd-1ed32740b271', 'Please make nice nice', 'SGD', 1000, '2023-11-30', '2023-09-08 06:34:28.905896', '2023-11-01 00:00:00', 'MEETUP', 'PENDING_RESPONSE', 'f', NULL),
('b93d5ef6-3e03-412e-9533-789620ae34e5', '2023-09-14 16:55:38.637492', 'ed54f572-f0e7-4a67-b2bd-5836e925dc5a', 'ea54575c-1d73-4c4a-8c8c-870e41bf5797', '3ceeccf1-9f7e-46c3-8941-a7955c93a22e', 'Portrait of my baby looking angry', NULL, 100, NULL, '2023-09-16 16:55:38.637492', NULL, 'DELIVERY', 'PENDING_RESPONSE', 'f', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/ea54575c-1d73-4c4a-8c8c-870e41bf5797-brief-bfff60af-15ff-4a06-9628-14ea3f900d4b.jpeg');

INSERT INTO "public"."project_proposals" ("id", "created_at", "project_id", "reference_image_url", "description", "is_accepted", "currency", "project_fee", "delivery_fee", "additional_fee", "total_price", "estimated_delivery_date", "is_deleted") VALUES
('3c2152fd-1d5b-44e0-ad41-8ed6381a98d0', '2023-09-06 08:19:24.71977', '9d1ac166-f4e7-4219-924d-5204bb9f2058', 'xxx', 'xxx', NULL, 'SGD', 1000, 50, 0, 1050, '2023-11-30', 'f');

INSERT INTO "public"."project_stages" ("id", "created_at", "index", "name", "description", "time_estimate_unit", "time_estimate_start", "time_estimate_end", "project_id", "is_deleted", "completed_time", "is_completed") VALUES
('0076f28c-d731-4d28-80d7-1f954ed2724e', '2023-09-13 08:21:21.750937', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, 'a5684cb5-59b6-47a9-ac1f-3117c81d577c', 'f', NULL, 'f'),
('01d89def-6dfb-4cd4-b336-8c5d4e47bf4d', '2023-09-14 11:52:33.73477', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', NULL, 'f'),
('05af8472-c558-42dd-b32a-c8d25b46b9ad', '2023-09-13 11:42:08.195732', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', 'f', NULL, 'f'),
('05e22405-ffd5-4962-8094-66bbc4b161db', '2023-09-13 08:26:46.047957', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, '00b0611b-d352-4ef5-b095-659777c08018', 'f', NULL, 'f'),
('088d0f07-60d4-4dd9-a2e9-8f101451c45a', '2023-09-13 11:52:39.91794', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 't', NULL, 'f'),
('0c99f949-4c40-4cdb-842d-97ecf93fe960', '2023-09-14 13:38:42.671998', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:38:42.627', 't'),
('0d6990a4-0e0c-4760-be4b-75ee1c32332e', '2023-09-13 08:21:21.750937', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, 'a5684cb5-59b6-47a9-ac1f-3117c81d577c', 'f', NULL, 'f'),
('0f65e212-8c7a-4129-bf19-250c6fc137af', '2023-09-14 16:32:48.029774', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', NULL, 'f'),
('0fb91f54-e3e7-46e7-9aae-40b285766e75', '2023-09-13 11:55:03.524211', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', NULL, 'f'),
('1199ad1c-ce30-4008-ab47-b4b52dc7fc63', '2023-09-14 13:37:08.283029', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:37:08.252', 't'),
('12e9004a-24e7-4701-b257-c359a97ccb87', '2023-09-14 12:11:45.54209', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', NULL, 'f'),
('12ebdf32-ea9f-4bed-a1d3-fd7427eff859', '2023-09-14 12:03:53.507579', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-14 12:03:53.425', 't'),
('13ebc1a8-1f89-45ba-afa8-6271a8337eea', '2023-09-14 12:11:45.54209', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', NULL, 'f'),
('141332e1-d1a7-41df-8cd8-0f77be45e548', '2023-09-14 13:35:19.166104', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:35:19.124', 't'),
('14b275ec-c6bf-4d96-bb72-c30be091c5b3', '2023-09-14 13:35:19.166104', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:35:19.124', 't'),
('15590466-edc0-4d28-8ab9-651f1998b25f', '2023-09-13 11:52:39.91794', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 't', NULL, 'f'),
('171fc779-b12c-440a-9172-f540fde2e838', '2023-09-14 11:49:07.622234', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('17c3cc70-ff2a-467c-a2fd-e3fe7ee12e9a', '2023-09-14 10:52:54.668775', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, '9d1ac166-f4e7-4219-924d-5204bb9f2058', 'f', '2023-09-01 00:00:00', 't'),
('19da0ddf-0e0a-4a2c-ba15-db19729c2563', '2023-09-14 11:52:00.555603', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-14 11:52:00.499', 't'),
('1a2e49f9-9daa-4724-b983-e1c1ce4845d5', '2023-09-13 11:47:37.823945', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'af648810-1d18-4af3-bd93-710b1919ac3d', 'f', NULL, 'f'),
('1bd1c23a-c284-457e-8802-8fb44882b978', '2023-09-13 08:53:28.690938', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', NULL, 'f'),
('1e42c2dc-61b1-4342-8cde-59ad236ecb0c', '2023-09-14 10:52:54.668775', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, '9d1ac166-f4e7-4219-924d-5204bb9f2058', 'f', NULL, 'f'),
('1f680c92-7136-4863-914f-60c70aa6fd45', '2023-09-13 08:19:43.55846', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '9cc5a110-87c6-43d2-b3b5-b25c553cf60e', 'f', NULL, 'f'),
('20a39c04-344f-49dd-8958-42306f70d0cd', '2023-09-13 08:21:21.750937', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'a5684cb5-59b6-47a9-ac1f-3117c81d577c', 'f', NULL, 'f'),
('21515680-8b17-4f8c-a04f-677b935d3cb2', '2023-09-13 11:47:37.823945', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, 'af648810-1d18-4af3-bd93-710b1919ac3d', 'f', NULL, 'f'),
('220cc016-b035-4410-93c6-154c9cee2f3d', '2023-09-14 13:35:47.83988', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:35:47.812', 't'),
('2218a974-cfed-4d3c-984f-3d1409654b29', '2023-09-13 08:21:21.750937', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'a5684cb5-59b6-47a9-ac1f-3117c81d577c', 'f', NULL, 'f'),
('23127aff-8ea2-465e-95d9-e935f687ab7b', '2023-09-14 13:35:19.166104', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:35:19.124', 't'),
('238b5323-36b0-4146-92c1-e19af6be4518', '2023-09-13 08:26:46.047957', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '00b0611b-d352-4ef5-b095-659777c08018', 'f', NULL, 'f'),
('24633425-2d10-496b-a9bf-4bc33ae6870e', '2023-09-14 13:47:20.046663', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 'f', '2023-09-14 13:47:20.021', 't'),
('24f11d3c-2f02-4d7d-a7b8-ea2d6b2a740d', '2023-09-14 12:11:45.54209', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 12:11:45.435', 't'),
('25bbe834-2e73-4311-ac1f-0e026fbf9e66', '2023-09-14 13:38:42.671998', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:38:42.627', 't'),
('25e40ae8-1281-473e-bbda-0fc07ab42e0e', '2023-09-13 08:26:46.047957', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, '00b0611b-d352-4ef5-b095-659777c08018', 'f', NULL, 'f'),
('28ce3edb-0949-4dbd-862c-c8c616ca66e8', '2023-09-14 16:17:21.071794', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '6d0bfb08-7a4d-4d97-a765-5eb5e88468c1', 'f', NULL, 'f'),
('29032f4d-e3d7-4f0c-a6cc-58852e05e94b', '2023-09-14 13:34:26.796281', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 'f', '2023-09-14 13:34:26.767', 't'),
('2ad4fcde-8e2f-49aa-9ffc-db77d4edecca', '2023-09-13 11:47:37.823945', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'af648810-1d18-4af3-bd93-710b1919ac3d', 'f', NULL, 'f'),
('2c61f8ee-da8f-45af-8db5-c7349534a726', '2023-09-14 13:36:53.00694', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 'f', '2023-09-14 13:36:52.984', 't'),
('2ca358e6-e19d-41ff-9cd9-34ea95a0e0fb', '2023-09-13 08:54:05.299079', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-12 00:00:00', 't'),
('2d343cc3-8a32-4384-824e-932f9ca675e1', '2023-09-14 13:37:08.283029', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:37:08.252', 't'),
('2dd4696e-581d-41ac-a7dc-0d2654e82380', '2023-09-14 16:08:01.680004', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 'f', '2023-09-14 16:08:01.563', 't'),
('2eed5e12-e68e-4d9b-b58b-f9f73873e532', '2023-09-13 08:19:43.55846', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, '9cc5a110-87c6-43d2-b3b5-b25c553cf60e', 'f', NULL, 'f'),
('2f91b1dd-e782-4797-b986-a86ad1cc363a', '2023-09-13 11:33:35.894617', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, '77b73f74-dc93-4610-86a8-8eb408ae1c9b', 'f', NULL, 'f'),
('31a0dab9-0a92-4364-8d35-caa24ab962d6', '2023-09-13 08:54:05.299079', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('31a62378-ecb5-46c7-9a17-063211707f42', '2023-09-13 11:42:08.195732', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', 'f', NULL, 'f'),
('323e5d8a-fd51-4fd5-b988-bf6b961f5792', '2023-09-13 08:19:43.55846', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '9cc5a110-87c6-43d2-b3b5-b25c553cf60e', 'f', NULL, 'f'),
('3257863c-b6d7-4e5b-99fc-6b82b1a9ddaf', '2023-09-14 16:32:48.029774', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', NULL, 'f'),
('32a7a3a2-f414-4eeb-ba05-f150afc0f954', '2023-09-13 08:53:28.690938', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', NULL, 'f'),
('3372b8ec-ff63-4d45-8f46-39be4c4ddc16', '2023-09-13 08:19:43.55846', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, '9cc5a110-87c6-43d2-b3b5-b25c553cf60e', 'f', NULL, 'f'),
('33ac0409-34db-49d2-a9ed-b72071d398ef', '2023-09-14 11:49:07.622234', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-11 16:00:00', 't'),
('368bc001-a8de-4b81-90b2-f7d6b9f846df', '2023-09-13 08:26:03.147715', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, 'c1488613-bf6a-4a3c-994d-8f0bce5fd335', 'f', NULL, 'f'),
('3722acf7-bdd3-4e1f-b3cd-6bb0f3ed2221', '2023-09-13 08:19:43.55846', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, '9cc5a110-87c6-43d2-b3b5-b25c553cf60e', 'f', NULL, 'f'),
('37b2ad25-e759-4820-a6ce-3e9487bafc36', '2023-09-14 11:49:07.622234', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('37b7d07c-3646-40c3-8507-e2c66ef78d93', '2023-09-13 08:19:43.55846', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, '9cc5a110-87c6-43d2-b3b5-b25c553cf60e', 'f', NULL, 'f'),
('38315aca-ae27-4963-b96b-c5f738148504', '2023-09-13 08:26:46.047957', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '00b0611b-d352-4ef5-b095-659777c08018', 'f', NULL, 'f'),
('39bb8715-51ea-4343-95fd-2af6c55f2d80', '2023-09-14 10:52:54.668775', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, '9d1ac166-f4e7-4219-924d-5204bb9f2058', 'f', NULL, 'f'),
('39d931c4-db6e-41f3-8b59-ff34709f8936', '2023-09-13 08:17:53.314485', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '0c412bb1-d42a-4162-8fac-e9a64cb19e3f', 'f', NULL, 'f'),
('3a4a550c-347d-4ef6-b56f-210c2a067396', '2023-09-14 13:38:42.671998', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:38:42.627', 't'),
('3b5f4693-f4f6-4e37-bd0e-f918e59857b6', '2023-09-14 17:02:52.217562', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 'f', NULL, 'f'),
('3c358764-91c4-4903-bdb8-da85bd2547c4', '2023-09-13 11:33:35.894617', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '77b73f74-dc93-4610-86a8-8eb408ae1c9b', 'f', NULL, 'f'),
('3d83a641-94ed-4f33-9566-cda0c84c81d8', '2023-09-14 13:35:19.166104', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:35:19.125', 't'),
('3ebb883b-5d32-486c-bfb2-dee5766a6cd8', '2023-09-13 11:55:03.524211', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', NULL, 'f'),
('3fa3f818-91cc-41ba-aa00-fac8193d37e2', '2023-09-14 11:46:49.929553', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-11 16:00:00', 't'),
('41a8bc5d-42bb-4dd0-888e-d408af1a0083', '2023-09-14 13:36:53.00694', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 'f', '2023-09-14 13:36:52.984', 't'),
('4283cb45-7a2a-46f8-ad32-e35e2fd71512', '2023-09-13 11:52:39.91794', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 't', NULL, 'f'),
('42ec8c28-1793-4022-a850-e1263b668fc6', '2023-09-13 08:21:21.750937', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'a5684cb5-59b6-47a9-ac1f-3117c81d577c', 'f', NULL, 'f'),
('43540006-df00-4f8c-9a98-6a3f29a6261b', '2023-09-14 13:47:20.046663', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 'f', '2023-09-14 13:47:20.021', 't'),
('43ae65b4-889e-4ae0-81d9-53a150e0a1d6', '2023-09-14 11:49:07.622234', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-14 11:49:07.392', 't'),
('443efa74-7ee3-4459-8438-6e9cc561af4f', '2023-09-14 13:34:26.796281', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 'f', '2023-09-14 13:34:26.767', 't'),
('44a3d3db-84d5-4aac-9397-96b03674e89e', '2023-09-14 16:32:48.029774', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', NULL, 'f'),
('46b2d2cb-08e4-489b-841e-d4d339e1286e', '2023-09-13 11:42:08.195732', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, 'f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', 'f', NULL, 'f'),
('47325600-263f-404e-8618-4ff11dd5106f', '2023-09-14 12:03:53.507579', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-13 19:51:32.204', 't'),
('49baa2ce-7e60-4adf-a207-e7ba35bc9e35', '2023-09-14 12:11:45.54209', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', NULL, 'f'),
('4a16bffa-0525-41de-abba-002f27a67373', '2023-09-13 11:44:05.803019', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, '40113a10-c425-495f-8486-9e322897797b', 'f', NULL, 'f'),
('4aed6385-d3ef-4f04-9d36-c8716a8c4a6a', '2023-09-13 08:26:46.047957', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, '00b0611b-d352-4ef5-b095-659777c08018', 'f', NULL, 'f'),
('4bbb39d5-15f2-4184-8016-8fcb269a7a1b', '2023-09-13 11:44:05.803019', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '40113a10-c425-495f-8486-9e322897797b', 'f', NULL, 'f'),
('4c3e3977-b7a4-4f8d-9147-62a1db65fbb3', '2023-09-13 08:26:46.047957', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '00b0611b-d352-4ef5-b095-659777c08018', 'f', NULL, 'f'),
('4c4c6bf6-75f8-41ac-8605-91abe0df2183', '2023-09-13 08:21:21.750937', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, 'a5684cb5-59b6-47a9-ac1f-3117c81d577c', 'f', NULL, 'f'),
('4c6571d9-bb8e-4abf-8949-d29b55be3346', '2023-09-14 12:03:53.507579', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-10 16:00:00', 't'),
('4cb49312-d6f8-4617-be36-291e71cea893', '2023-09-14 12:03:53.507579', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-13 11:49:07.392', 't'),
('4d74d75f-c144-426d-a29e-81a88da9d740', '2023-09-13 08:54:05.299079', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-13 00:00:00', 't'),
('4e16e85d-7ca0-4d42-a6aa-a3881dfe06c5', '2023-09-13 11:52:39.91794', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 't', NULL, 'f'),
('5061f134-4546-45ea-8d76-fa811e5e2655', '2023-09-13 11:33:35.894617', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, '77b73f74-dc93-4610-86a8-8eb408ae1c9b', 'f', NULL, 'f'),
('51b6d3b1-91a0-4c04-94e3-07b34ed9264e', '2023-09-14 16:17:21.071794', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '6d0bfb08-7a4d-4d97-a765-5eb5e88468c1', 'f', NULL, 'f'),
('52358168-e04d-4728-969c-ea51d2b0e44c', '2023-09-14 11:46:49.929553', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('52961e96-9dd0-4017-b324-0fe63f8ef217', '2023-09-13 11:33:35.894617', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '77b73f74-dc93-4610-86a8-8eb408ae1c9b', 'f', NULL, 'f'),
('541cf856-9561-470c-ad9d-808dd34716a0', '2023-09-13 11:33:35.894617', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '77b73f74-dc93-4610-86a8-8eb408ae1c9b', 'f', NULL, 'f'),
('54ec2ed7-1091-48b4-b056-409b0c5c9fb6', '2023-09-14 16:17:21.071794', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '6d0bfb08-7a4d-4d97-a765-5eb5e88468c1', 'f', NULL, 'f'),
('5696c534-f003-40b0-9dc1-24fe3f65fe10', '2023-09-14 16:08:01.680004', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 'f', '2023-09-14 16:08:01.563', 't'),
('58825005-2d8a-499a-a2c0-7cef00aa6df2', '2023-09-13 08:21:21.750937', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'a5684cb5-59b6-47a9-ac1f-3117c81d577c', 'f', NULL, 'f'),
('5903662a-a17e-4ffa-bf9b-ad940cf3a896', '2023-09-14 13:46:57.41171', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:46:57.39', 't'),
('593787d7-ab9e-4b49-8814-fb56758c9059', '2023-09-14 11:46:49.929553', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('59a4daee-5693-4dc4-9076-bb1605a3f2c1', '2023-09-14 13:35:47.83988', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:35:47.812', 't'),
('5aa21a32-7840-4d0f-84ea-30e0c7e1cda7', '2023-09-14 13:37:08.283029', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:37:08.252', 't'),
('5e4d81bc-06f5-40ac-b68e-16874ecc542d', '2023-09-14 13:36:53.00694', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 'f', '2023-09-14 13:36:52.984', 't'),
('5f181fc0-a93e-433c-83f5-0f3218db9967', '2023-09-13 11:33:35.894617', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '77b73f74-dc93-4610-86a8-8eb408ae1c9b', 'f', NULL, 'f'),
('5f464a14-c299-4bc3-b638-3b63d2642253', '2023-09-13 08:17:53.314485', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, '0c412bb1-d42a-4162-8fac-e9a64cb19e3f', 'f', NULL, 'f'),
('5f97113e-12a1-43ec-a76e-7664a503ca3a', '2023-09-13 11:33:35.894617', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, '77b73f74-dc93-4610-86a8-8eb408ae1c9b', 'f', NULL, 'f'),
('604ab207-723a-469c-a7f6-28c0e0713f95', '2023-09-13 11:42:08.195732', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, 'f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', 'f', NULL, 'f'),
('607b414a-b71b-4459-becd-019ca9ae9d1e', '2023-09-14 16:08:01.680004', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 'f', '2023-09-14 16:08:01.563', 't'),
('61c6ad97-f9ad-45f5-be65-598258829eed', '2023-09-14 13:37:08.283029', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:37:08.252', 't'),
('629a5f02-c46e-47f1-981a-035465d7d379', '2023-09-14 13:37:08.283029', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:37:08.252', 't'),
('62c38cdb-e9b2-49a4-a084-d6ca705a237b', '2023-09-13 08:19:43.55846', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, '9cc5a110-87c6-43d2-b3b5-b25c553cf60e', 'f', NULL, 'f'),
('64474e8c-74f6-4827-939c-4d22754f4c82', '2023-09-14 13:46:57.41171', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:46:57.39', 't'),
('646ca8a6-7419-499d-aa8a-df6cd5fecea6', '2023-09-13 11:55:03.524211', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', NULL, 'f'),
('648cd542-b60c-4446-a2c2-df40f160cb23', '2023-09-14 11:51:32.265585', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-14 03:49:07.392', 't'),
('64f7241d-7fdc-4080-8efb-152d34403ac7', '2023-09-14 11:52:33.73477', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', NULL, 'f'),
('653491e5-61f8-4ce6-bd21-9cb08ff5c33c', '2023-09-14 16:44:07.262518', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', NULL, 'f'),
('65ea43f6-56bc-47c3-b3d5-50f9b1df3b7e', '2023-09-14 13:34:26.796281', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 'f', '2023-09-14 13:34:26.767', 't'),
('6781dcad-564a-4331-ac38-f22511763820', '2023-09-13 11:42:08.195732', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', 'f', NULL, 'f'),
('687e5e15-e450-408e-9306-54840134fa1b', '2023-09-14 16:08:01.680004', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 'f', '2023-09-14 16:08:01.563', 't'),
('68c298ef-6d22-4099-a1ca-efc60a47416d', '2023-09-13 08:26:03.147715', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, 'c1488613-bf6a-4a3c-994d-8f0bce5fd335', 'f', NULL, 'f'),
('6fd111c7-e672-455c-b46c-1087b8750d7b', '2023-09-13 11:47:37.823945', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, 'af648810-1d18-4af3-bd93-710b1919ac3d', 'f', NULL, 'f'),
('6ff5d87e-c4fd-4a49-a570-c5e54c889195', '2023-09-14 16:17:21.071794', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '6d0bfb08-7a4d-4d97-a765-5eb5e88468c1', 'f', NULL, 'f'),
('6ffce887-a8de-4518-9000-dd062772194a', '2023-09-13 08:53:28.690938', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', NULL, 'f'),
('70133461-9298-4065-be58-6e789b4f0a27', '2023-09-13 08:53:28.690938', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', NULL, 'f'),
('719588e7-218d-4c49-b95c-373c341d8ee9', '2023-09-13 08:21:21.750937', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, 'a5684cb5-59b6-47a9-ac1f-3117c81d577c', 'f', NULL, 'f'),
('71db069f-8676-4b86-b0d5-9191917fc117', '2023-09-14 11:51:32.265585', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-14 11:51:32.204', 't'),
('72f19728-6b75-4e49-8f48-5a2fe8448a4c', '2023-09-13 08:19:43.55846', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '9cc5a110-87c6-43d2-b3b5-b25c553cf60e', 'f', NULL, 'f'),
('73d6b18a-e9cf-4e11-a9b3-24de90efb510', '2023-09-14 11:51:32.265585', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('769d355f-fa45-4790-9748-389c301a9487', '2023-09-13 08:26:03.147715', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'c1488613-bf6a-4a3c-994d-8f0bce5fd335', 'f', NULL, 'f'),
('7701c439-f0c8-4fb4-a3a0-70b39ef9ff60', '2023-09-13 08:17:53.314485', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, '0c412bb1-d42a-4162-8fac-e9a64cb19e3f', 'f', NULL, 'f'),
('77c0f6d9-cd67-4631-838a-1833ac595168', '2023-09-13 08:19:43.55846', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '9cc5a110-87c6-43d2-b3b5-b25c553cf60e', 'f', NULL, 'f'),
('7dcb8a8e-ac5d-4458-9366-78bac0d0f3ac', '2023-09-14 13:38:42.671998', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:38:42.627', 't'),
('7de56948-d65a-4e26-bbcd-ecaa4fa52cce', '2023-09-14 11:51:32.265585', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('7e118994-bd2a-4fe6-b2b1-6323d902c22c', '2023-09-14 13:47:20.046663', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 'f', '2023-09-14 13:47:20.021', 't'),
('820b849d-9cd8-4b71-8b97-3b63375ce29a', '2023-09-14 11:51:32.265585', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-11 08:00:00', 't'),
('82d99c20-ca9b-4052-a176-b0531ca477a2', '2023-09-14 11:46:49.929553', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('84413278-8de7-4820-948e-318f882869b6', '2023-09-13 08:19:43.55846', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '9cc5a110-87c6-43d2-b3b5-b25c553cf60e', 'f', NULL, 'f'),
('8696cad2-b702-472e-a4d5-47fe29c48c3d', '2023-09-14 13:34:26.796281', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 'f', '2023-09-14 13:34:26.767', 't'),
('88c45a14-0ff7-413c-bbaa-adec68e6003e', '2023-09-14 10:52:54.668775', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, '9d1ac166-f4e7-4219-924d-5204bb9f2058', 'f', '2023-09-02 00:00:00', 't'),
('89084e59-071a-431a-bc14-d2a3fac33216', '2023-09-14 16:44:07.262518', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', NULL, 'f'),
('89b5b602-afa8-476a-af18-877361fb9d53', '2023-09-14 13:35:47.83988', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:35:47.812', 't'),
('8a0d6796-aa57-461b-a3fc-ab7420d4bef1', '2023-09-14 11:51:32.265585', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-12 08:00:00', 't'),
('8ad626aa-46d9-4bed-9087-baf79128a0df', '2023-09-13 08:17:53.314485', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '0c412bb1-d42a-4162-8fac-e9a64cb19e3f', 'f', NULL, 'f'),
('8c7166fd-e324-4376-b422-e1089529646d', '2023-09-13 11:42:08.195732', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, 'f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', 'f', NULL, 'f'),
('8d326781-e62f-4913-aef0-3275d99003dc', '2023-09-14 16:32:48.029774', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', NULL, 'f'),
('8d790aad-abd5-46c6-9a86-db2978c76f38', '2023-09-13 11:42:08.195732', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', 'f', NULL, 'f'),
('8dc7d327-d96e-4df3-b033-bb578ba3b674', '2023-09-13 11:33:35.894617', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, '77b73f74-dc93-4610-86a8-8eb408ae1c9b', 'f', NULL, 'f'),
('8dd84888-3922-4e6c-8b0e-2dcf4a446e4d', '2023-09-13 08:21:21.750937', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'a5684cb5-59b6-47a9-ac1f-3117c81d577c', 'f', NULL, 'f'),
('8e5a1884-727d-4f99-80ae-de871704364c', '2023-09-14 13:35:19.166104', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:35:19.125', 't'),
('8e967de8-84fd-41f8-b9d3-39d6d2882413', '2023-09-13 08:54:05.299079', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('9020224f-0287-4665-9d87-d23fc9da02dd', '2023-09-14 16:08:01.680004', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 'f', '2023-09-14 16:08:01.563', 't'),
('907bbcd3-c0da-4d02-9faa-53c521d8ddb7', '2023-09-14 13:38:42.671998', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:38:42.627', 't'),
('90a010c5-7d43-47e2-9a72-b3cdb5833ebf', '2023-09-14 13:47:20.046663', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 'f', '2023-09-14 13:47:20.021', 't'),
('91e3043b-e639-467d-928a-732e87b7c987', '2023-09-14 13:34:26.796281', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 'f', '2023-09-14 13:34:26.767', 't'),
('91e70bdb-df2c-4977-9d26-7feb75b0842b', '2023-09-13 08:19:43.55846', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '9cc5a110-87c6-43d2-b3b5-b25c553cf60e', 'f', NULL, 'f'),
('939249d4-a5a1-4f49-ab04-1416d831d148', '2023-09-14 10:52:54.668775', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, '9d1ac166-f4e7-4219-924d-5204bb9f2058', 'f', '2023-09-04 00:00:00', 't'),
('9549ab08-ef2a-4adf-b1dd-32c47d837381', '2023-09-14 11:52:33.73477', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', NULL, 'f'),
('95b19877-62b9-42b9-b1f7-78ef02164be3', '2023-09-13 11:42:08.195732', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', 'f', NULL, 'f'),
('95bcbce0-214a-4275-bec2-0d360574dc60', '2023-09-14 17:02:52.217562', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 'f', NULL, 'f'),
('965c8dde-cbb4-49c6-9822-25164d7cb6db', '2023-09-14 16:32:48.029774', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', NULL, 'f'),
('96796a65-5706-4d49-b2ad-f587e2f80b93', '2023-09-13 11:44:05.803019', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '40113a10-c425-495f-8486-9e322897797b', 'f', NULL, 'f'),
('96d00aee-6167-4ebf-bc99-dcd8d3acb433', '2023-09-14 16:32:48.029774', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', NULL, 'f'),
('97bb296b-450f-4e5d-8d7c-aa17fc22a782', '2023-09-14 11:46:49.929553', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-12 16:00:00', 't'),
('9869bc9c-0596-430b-a01d-17edc2674181', '2023-09-13 11:44:05.803019', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, '40113a10-c425-495f-8486-9e322897797b', 'f', NULL, 'f'),
('99113818-fab9-41a1-9fc1-5aa309eda699', '2023-09-14 16:17:21.071794', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '6d0bfb08-7a4d-4d97-a765-5eb5e88468c1', 'f', NULL, 'f'),
('995bd015-fe06-4dc5-bc45-49cc87736635', '2023-09-14 12:03:53.507579', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-14 03:52:00.499', 't'),
('99b68b0d-fefc-4a65-a0db-a9b89a6b5b3a', '2023-09-13 08:21:21.750937', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, 'a5684cb5-59b6-47a9-ac1f-3117c81d577c', 'f', NULL, 'f'),
('99f6bb60-4372-479b-ae31-a57ffd499be4', '2023-09-14 13:35:47.83988', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:35:47.812', 't'),
('9adcc19e-9b31-4873-9101-63bbf47f1fac', '2023-09-06 07:38:42.013426', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, '9d1ac166-f4e7-4219-924d-5204bb9f2058', 't', NULL, 'f'),
('9aff00df-d2e0-4042-b45b-37bcb09d20c3', '2023-09-14 11:52:00.555603', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-13 19:49:07.392', 't'),
('9c360142-8c58-4921-b4a6-068fde62d64e', '2023-09-14 16:17:21.071794', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '6d0bfb08-7a4d-4d97-a765-5eb5e88468c1', 'f', NULL, 'f'),
('9e0638a0-b3a2-4fd8-b003-1a928564a6fd', '2023-09-13 08:54:05.299079', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('a0404b09-d07e-4a5c-95ef-c79c6028eddd', '2023-09-14 13:36:53.00694', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 'f', '2023-09-14 13:36:52.984', 't'),
('a1d9392d-37ed-432b-816d-14dc6e082360', '2023-09-13 08:17:53.314485', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '0c412bb1-d42a-4162-8fac-e9a64cb19e3f', 'f', NULL, 'f'),
('a50c6a91-68d8-4e9d-b6b4-c224f803f0de', '2023-09-14 13:34:26.796281', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '1806828e-1f47-4bc4-8683-757c459baa33', 'f', '2023-09-14 13:34:26.767', 't'),
('a59b9ff4-7b1c-4bc8-bb87-4e3aaaacead9', '2023-09-13 08:21:21.750937', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'a5684cb5-59b6-47a9-ac1f-3117c81d577c', 'f', NULL, 'f'),
('a64bfc9b-02d9-4d46-96a6-e9c845fc8bf3', '2023-09-13 08:54:05.299079', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('a6dd5025-3308-4d2e-a1a8-f47359508e42', '2023-09-13 08:26:46.047957', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '00b0611b-d352-4ef5-b095-659777c08018', 'f', NULL, 'f'),
('a71b65f5-90c1-4ae5-8148-fad5a7d397b7', '2023-09-14 12:11:45.54209', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', NULL, 'f'),
('a855396e-fa28-4cc8-b865-c829aeaf4d3f', '2023-09-13 08:26:46.047957', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '00b0611b-d352-4ef5-b095-659777c08018', 'f', NULL, 'f'),
('ac2f162e-26ed-4687-9884-199530b54f2d', '2023-09-13 11:47:37.823945', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'af648810-1d18-4af3-bd93-710b1919ac3d', 'f', NULL, 'f'),
('adb69ef8-3933-4fee-b147-c3b2095f5b6b', '2023-09-13 11:44:05.803019', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, '40113a10-c425-495f-8486-9e322897797b', 'f', NULL, 'f'),
('ae3ba697-3101-4616-9b88-2caeaf944b9f', '2023-09-14 13:46:57.41171', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:46:57.39', 't'),
('ae8a0a04-4cef-405c-bdb7-59ad342c7a31', '2023-09-13 11:47:37.823945', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, 'af648810-1d18-4af3-bd93-710b1919ac3d', 'f', NULL, 'f'),
('aef53194-9a96-41d3-9b02-1af0f446cd81', '2023-09-14 13:35:47.83988', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:35:47.812', 't'),
('b15acbfc-07de-4b16-8e86-6a5a3cf64d19', '2023-09-14 13:38:42.671998', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:38:42.627', 't'),
('b53880a5-beb6-4d2f-8967-fb232d4c786d', '2023-09-13 11:42:08.195732', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, 'f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', 'f', NULL, 'f'),
('b6850608-c7a0-40ac-806b-ec665c17d51b', '2023-09-14 17:02:52.217562', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 'f', '2023-09-14 08:44:06.872', 't'),
('b689f699-cdc1-4a72-acb4-64b29d8960b9', '2023-09-14 11:52:00.555603', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-11 00:00:00', 't'),
('b68fe0c2-7e56-48bb-b849-9d3d7ca081e3', '2023-09-13 11:55:03.524211', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', NULL, 'f'),
('b8323596-63ba-42f0-8e85-9a86334e1422', '2023-09-13 11:44:05.803019', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '40113a10-c425-495f-8486-9e322897797b', 'f', NULL, 'f'),
('b86f9653-055c-409f-8d3b-cca80eb6cb74', '2023-09-13 11:55:03.524211', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', NULL, 'f'),
('b8a0e3ae-5eec-4212-b6ce-e6956509edfb', '2023-09-13 11:44:05.803019', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, '40113a10-c425-495f-8486-9e322897797b', 'f', NULL, 'f'),
('b9354369-f62b-4674-a076-0bd96fbfaebf', '2023-09-14 13:37:08.283029', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:37:08.252', 't'),
('ba67f15a-5cb8-4363-84fd-f0e434394d48', '2023-09-14 13:46:57.41171', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:46:57.39', 't'),
('bbe55f76-906b-45b1-ad0f-7096779cff2a', '2023-09-14 13:46:57.41171', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:46:57.39', 't'),
('bd1efc56-5e20-44e2-8e09-21d64d9c005b', '2023-09-06 07:38:42.013426', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, '9d1ac166-f4e7-4219-924d-5204bb9f2058', 't', NULL, 'f'),
('bd57757e-4473-40ba-b31d-408a1e4ff415', '2023-09-13 08:17:53.314485', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '0c412bb1-d42a-4162-8fac-e9a64cb19e3f', 'f', NULL, 'f'),
('bff03471-9aa1-4db3-af4e-dd28fb4d5e3a', '2023-09-13 08:26:03.147715', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, 'c1488613-bf6a-4a3c-994d-8f0bce5fd335', 'f', NULL, 'f'),
('bffa18b8-9fdb-4a75-9f47-e0c36005503d', '2023-09-13 11:44:05.803019', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '40113a10-c425-495f-8486-9e322897797b', 'f', NULL, 'f'),
('c1faf9c7-065c-4750-84ee-7dac7503fa6f', '2023-09-13 08:26:03.147715', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, 'c1488613-bf6a-4a3c-994d-8f0bce5fd335', 'f', NULL, 'f'),
('c2cce6e5-434a-4c41-b633-d1f76a90f901', '2023-09-13 11:44:05.803019', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '40113a10-c425-495f-8486-9e322897797b', 'f', NULL, 'f'),
('c38f739e-cde7-447a-90dc-89e7c266b960', '2023-09-13 08:26:03.147715', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'c1488613-bf6a-4a3c-994d-8f0bce5fd335', 'f', NULL, 'f'),
('c3b0e548-50c8-430a-9e81-6298e63496ec', '2023-09-13 08:26:03.147715', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, 'c1488613-bf6a-4a3c-994d-8f0bce5fd335', 'f', NULL, 'f'),
('c44cb159-b438-4212-80ba-8f427bf9a3c0', '2023-09-14 13:35:19.166104', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 13:35:19.124', 't'),
('c4509663-4407-48fc-9c50-74c2dba6d376', '2023-09-13 08:26:46.047957', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, '00b0611b-d352-4ef5-b095-659777c08018', 'f', NULL, 'f'),
('c46c4e14-c194-482d-bf53-8e7e82c099ee', '2023-09-13 08:26:46.047957', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '00b0611b-d352-4ef5-b095-659777c08018', 'f', NULL, 'f'),
('c7ae3fb8-eec7-4639-ba6a-208c26b16899', '2023-09-13 11:42:08.195732', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', 'f', NULL, 'f'),
('c83e1e53-4340-4e74-a6b9-352a082a571d', '2023-09-13 08:26:03.147715', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'c1488613-bf6a-4a3c-994d-8f0bce5fd335', 'f', NULL, 'f'),
('c8d8043f-f327-420e-b7b6-9626d7be00d6', '2023-09-14 13:35:47.83988', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:35:47.812', 't'),
('c98f2b53-13f9-4852-b2af-ab15fd565e49', '2023-09-13 08:26:03.147715', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'c1488613-bf6a-4a3c-994d-8f0bce5fd335', 'f', NULL, 'f'),
('cacabd59-760b-4786-a450-44d8835a8408', '2023-09-13 08:26:03.147715', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'c1488613-bf6a-4a3c-994d-8f0bce5fd335', 'f', NULL, 'f'),
('cdf0d8d4-12f5-43da-a223-332e11ff479d', '2023-09-14 11:52:00.555603', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-12 00:00:00', 't'),
('cf3d5463-9f93-4934-90e5-c28ce3a4a920', '2023-09-14 13:36:53.00694', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 'f', '2023-09-14 13:36:52.984', 't'),
('cf4c24b0-407a-4a2c-84aa-fce66ce49e5b', '2023-09-14 11:46:49.929553', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('d12705f4-6952-447e-b767-0208f51d3d2d', '2023-09-14 12:11:45.54209', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 12:11:45.435', 't'),
('d1dc3b96-577d-4c40-ba1c-3417ee7e456c', '2023-09-13 11:33:35.894617', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '77b73f74-dc93-4610-86a8-8eb408ae1c9b', 'f', NULL, 'f'),
('d230cd82-d21c-4fe5-937a-b32cc46b9977', '2023-09-14 11:52:33.73477', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 11:52:33.663', 't'),
('d4206559-e8b0-41fd-abb4-6e52616cd659', '2023-09-13 11:44:05.803019', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, '40113a10-c425-495f-8486-9e322897797b', 'f', NULL, 'f'),
('d4b7e688-7617-4e23-87c6-d0717230aa89', '2023-09-13 11:47:37.823945', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'af648810-1d18-4af3-bd93-710b1919ac3d', 'f', NULL, 'f'),
('d73a292c-afa4-44e0-a6de-56ebda38ab52', '2023-09-13 11:44:05.803019', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '40113a10-c425-495f-8486-9e322897797b', 'f', NULL, 'f'),
('d78dc51b-7b38-462b-8725-1de98bb407e9', '2023-09-14 11:49:07.622234', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('d90ea88f-2f3c-49eb-b4f8-e7131b04974d', '2023-09-14 16:44:07.262518', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', '2023-09-14 16:44:06.872', 't'),
('d9512147-2864-4155-9feb-7fd678cddda9', '2023-09-13 08:17:53.314485', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '0c412bb1-d42a-4162-8fac-e9a64cb19e3f', 'f', NULL, 'f'),
('dae9cf95-4879-4552-b512-feeac1d078a3', '2023-09-13 11:52:39.91794', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 't', NULL, 'f'),
('daefebdb-3f67-455d-8b58-c37d9a33039f', '2023-09-14 17:02:52.217562', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 'f', NULL, 'f'),
('dbfa5be9-7785-41a9-9375-48a9218a5821', '2023-09-14 11:52:33.73477', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', NULL, 'f'),
('dd24d920-0bae-4fc5-a229-48574a7d5846', '2023-09-14 17:02:52.217562', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 'f', '2023-09-14 08:44:06.872', 't'),
('dd36558c-5b44-4f5a-88b1-b3e2174e6f53', '2023-09-14 11:52:33.73477', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', '2023-09-14 11:52:33.663', 't'),
('de7083b8-1679-45b3-a316-63eb48719ea8', '2023-09-06 07:38:42.013426', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, '9d1ac166-f4e7-4219-924d-5204bb9f2058', 't', NULL, 'f'),
('dfa561ec-a587-451f-8d84-5f272bcb7e87', '2023-09-14 13:46:57.41171', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', '2023-09-14 13:46:57.39', 't'),
('e1928e6e-3808-40f4-a060-eac5a6a9bf4e', '2023-09-13 08:17:53.314485', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, '0c412bb1-d42a-4162-8fac-e9a64cb19e3f', 'f', NULL, 'f'),
('e3aeba30-815d-439d-ac25-ea6e2103769b', '2023-09-13 08:17:53.314485', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '0c412bb1-d42a-4162-8fac-e9a64cb19e3f', 'f', NULL, 'f'),
('e447b05f-51f6-4bfa-bef0-e56d590e9d1b', '2023-09-06 07:38:42.013426', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, '9d1ac166-f4e7-4219-924d-5204bb9f2058', 't', NULL, 'f'),
('e4deaea9-fc0f-4e63-861a-2f17b5be5d48', '2023-09-14 16:44:07.262518', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', NULL, 'f'),
('e566d451-8486-4961-b6cf-85bafa64bdb0', '2023-09-13 08:26:46.047957', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, '00b0611b-d352-4ef5-b095-659777c08018', 'f', NULL, 'f'),
('e5a229d2-720f-4da0-9af1-128275c3c9b5', '2023-09-13 08:53:28.690938', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', NULL, 'f'),
('e7795ebc-0eb7-416a-bc70-77e8ccc14e08', '2023-09-13 11:47:37.823945', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, 'af648810-1d18-4af3-bd93-710b1919ac3d', 'f', NULL, 'f'),
('e84a21f8-58d2-43e4-b69e-8fd788a0e0c4', '2023-09-13 11:33:35.894617', 5, 'Work starts', 'Description of Stage 5', 'WEEKS', 2, 4, '77b73f74-dc93-4610-86a8-8eb408ae1c9b', 'f', NULL, 'f'),
('ea7b567f-6efc-47b4-a29d-7f5974c24b42', '2023-09-13 08:17:53.314485', 2, 'Consult', 'Description of Stage 2', 'DAYS', 6, 10, '0c412bb1-d42a-4162-8fac-e9a64cb19e3f', 'f', NULL, 'f'),
('ed64ed58-a86b-49e2-8742-3c4c66354ff0', '2023-09-14 16:08:01.680004', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 'f', '2023-09-14 16:08:01.563', 't'),
('ed6eeb7c-c3b1-4567-bf94-b0b9c4422498', '2023-09-14 17:02:52.217562', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 'f', '2023-09-14 17:02:52.164', 't'),
('ee61886c-9080-45d5-91ff-fe1a73ba314a', '2023-09-14 16:44:07.262518', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', '2023-09-14 16:44:06.872', 't'),
('ef1fbf2d-713d-4cd0-82a8-b1e6bd9e7d81', '2023-09-13 08:53:28.690938', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 't', NULL, 'f'),
('ef204d00-3df8-4a77-8e18-07e6c9f7d281', '2023-09-13 08:26:03.147715', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'c1488613-bf6a-4a3c-994d-8f0bce5fd335', 'f', NULL, 'f'),
('f0cdaf5e-fe76-403a-894c-1567a67a67b2', '2023-09-13 11:47:37.823945', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'af648810-1d18-4af3-bd93-710b1919ac3d', 'f', NULL, 'f'),
('f1378dc2-1cc4-47e5-9422-e66bfc6d2fab', '2023-09-14 16:44:07.262518', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, 'a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', 't', NULL, 'f'),
('f1d7c81c-6855-4a11-bcb0-4ca6f7a241b3', '2023-09-14 13:47:20.046663', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 'f', '2023-09-14 13:47:20.021', 't'),
('f216404b-ffc7-4c8b-bb17-e41092201ed8', '2023-09-14 13:36:53.00694', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 'f', '2023-09-14 13:36:52.984', 't'),
('f2204b69-b208-4f04-9765-0eb7d9294710', '2023-09-14 11:49:07.622234', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-12 16:00:00', 't'),
('f5e41ef4-3a5a-4e89-948d-6564da51b535', '2023-09-13 11:33:35.894617', 1, 'Brief', 'Submit your request and preferred consultation slot', 'DAYS', 1, NULL, '77b73f74-dc93-4610-86a8-8eb408ae1c9b', 'f', NULL, 'f'),
('f65eede4-15fe-406c-9405-e980ed742b9c', '2023-09-14 12:03:53.507579', 2, 'Consultation', 'Consultation over chat or call to explore options and confirm requirements', 'HOURS', 1, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-11 16:00:00', 't'),
('f711a9d1-ed4e-41fe-b482-9c0cd8f46be8', '2023-09-14 13:47:20.046663', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '028244ae-6bc1-48e5-a92f-9a2b91a721be', 'f', '2023-09-14 13:47:20.021', 't'),
('f73d8e79-a07a-4596-898b-86d2d729bf77', '2023-09-14 11:52:00.555603', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, '1806828e-1f47-4bc4-8683-757c459baa33', 't', '2023-09-14 03:51:32.204', 't'),
('f8844ed4-ca45-4943-ac34-1d8bbcf48dae', '2023-09-13 11:55:03.524211', 4, 'Proposal acceptance or revision period', 'Pay a deposit to confirm the brief or request revisions (up to 2 times)', 'DAYS', 2, NULL, 'fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', 't', NULL, 'f'),
('f8b67ca2-95c6-4a5e-bc02-4cc0de19c518', '2023-09-13 11:47:37.823945', 5, 'Work starts', 'After the deposit is paid, I’ll start work on the piece and share periodic updates', 'WEEKS', 2, 4, 'af648810-1d18-4af3-bd93-710b1919ac3d', 'f', NULL, 'f'),
('f95858c3-0e95-486b-a9ef-06d8eb1a4667', '2023-09-14 11:52:00.555603', 6, 'Completion and delivery', 'The completed work will be delivered and the final payment will be processed.', 'WEEKS', 2, 4, '1806828e-1f47-4bc4-8683-757c459baa33', 't', NULL, 'f'),
('fb6f01db-17e1-4de0-b59f-cfb97ba861a3', '2023-09-06 07:38:42.013426', 3, 'Proposal', 'Description of Stage 3', 'DAYS', 1, 5, '9d1ac166-f4e7-4219-924d-5204bb9f2058', 't', NULL, 'f'),
('fc878b47-2495-4057-bba9-390567d4d639', '2023-09-13 11:42:08.195732', 1, 'Brief', 'Description of Stage 1', 'DAYS', 1, 5, 'f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', 'f', NULL, 'f'),
('ff3f6083-9215-40db-bc41-a685f5447169', '2023-09-13 08:17:53.314485', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, '0c412bb1-d42a-4162-8fac-e9a64cb19e3f', 'f', NULL, 'f'),
('ff55f88d-72bf-4ea6-8e6d-9806a0dbccbc', '2023-09-13 11:47:37.823945', 4, 'Work starts', 'Description of Stage 4', 'WEEKS', 2, 4, 'af648810-1d18-4af3-bd93-710b1919ac3d', 'f', NULL, 'f'),
('ffc6b2ac-2cf0-4eeb-9bcb-ed93cf5ac884', '2023-09-13 11:52:39.91794', 3, 'Proposal', 'I''ll send a proposal comprising the draft design, budget and timeline.', 'WEEKS', 1, 2, 'a5be943c-f6bc-417f-bdeb-43ce3afb1096', 't', NULL, 'f');

INSERT INTO "public"."projects" ("id", "created_at", "patron_id", "creator_id", "brief_id", "agreed_proposal_id", "agreed_date", "current_stage_id", "is_deleted", "name", "is_completed") VALUES
('00b0611b-d352-4ef5-b095-659777c08018', '2023-09-13 08:26:46.226415', '27d3b493-f912-4072-829e-962becea22be', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, '2023-10-01 00:00:00', 'c4509663-4407-48fc-9c50-74c2dba6d376', 'f', 'favouritest project', 't'),
('028244ae-6bc1-48e5-a92f-9a2b91a721be', '2023-09-13 08:53:28.871988', 'f0757edf-3e76-4510-a0fb-6dfbaba1427a', '81b909e7-8b84-41c7-9e17-0b02c07d2425', '351977d7-909a-4169-be87-f45e0a133d20', NULL, NULL, 'bbe55f76-906b-45b1-ad0f-7096779cff2a', 'f', 'Arron''s project', 't'),
('0c412bb1-d42a-4162-8fac-e9a64cb19e3f', '2023-09-13 08:17:53.488742', '27d3b493-f912-4072-829e-962becea22be', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, NULL, '68c298ef-6d22-4099-a1ca-efc60a47416d', 'f', 'test', 'f'),
('1806828e-1f47-4bc4-8683-757c459baa33', '2023-09-13 08:54:05.481385', 'f0757edf-3e76-4510-a0fb-6dfbaba1427a', '81b909e7-8b84-41c7-9e17-0b02c07d2425', '44b69261-d4ba-4686-be6a-4cb39e8bfc86', NULL, NULL, 'f95858c3-0e95-486b-a9ef-06d8eb1a4667', 'f', 'Wedding jewelry', 't'),
('40113a10-c425-495f-8486-9e322897797b', '2023-09-13 11:44:05.992573', '27d3b493-f912-4072-829e-962becea22be', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, NULL, '4a16bffa-0525-41de-abba-002f27a67373', 'f', 'favouritest project', 'f'),
('6197ec1f-b027-4cf1-a8a8-f00d741c1ade', '2023-09-13 08:26:17.228788', '27d3b493-f912-4072-829e-962becea22be', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, NULL, NULL, 'f', 'favouritest project', 'f'),
('6d0bfb08-7a4d-4d97-a765-5eb5e88468c1', '2023-09-14 16:17:21.271105', 'f0757edf-3e76-4510-a0fb-6dfbaba1427a', '81b909e7-8b84-41c7-9e17-0b02c07d2425', '9543b543-056d-4334-bed5-88ee366b0639', NULL, NULL, '99113818-fab9-41a1-9fc1-5aa309eda699', 'f', 'Arron''s wedding ring', 'f'),
('77b73f74-dc93-4610-86a8-8eb408ae1c9b', '2023-09-13 11:33:36.092031', '27d3b493-f912-4072-829e-962becea22be', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, NULL, '8dc7d327-d96e-4df3-b033-bb578ba3b674', 'f', 'favouritest project', 'f'),
('9cc5a110-87c6-43d2-b3b5-b25c553cf60e', '2023-09-13 08:19:43.739024', '27d3b493-f912-4072-829e-962becea22be', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, NULL, '68c298ef-6d22-4099-a1ca-efc60a47416d', 'f', 'favourite project', 'f'),
('9d1ac166-f4e7-4219-924d-5204bb9f2058', '2023-09-06 07:38:42.196518', '27d3b493-f912-4072-829e-962becea22be', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, '2023-10-01 00:00:00', '68c298ef-6d22-4099-a1ca-efc60a47416d', 'f', NULL, 'f'),
('a4c53d2f-c58a-4ea8-9ec3-6c14d27edf48', '2023-09-14 16:32:48.218402', 'f0757edf-3e76-4510-a0fb-6dfbaba1427a', '81b909e7-8b84-41c7-9e17-0b02c07d2425', '351977d7-909a-4169-be87-f45e0a133d20', NULL, NULL, '89084e59-071a-431a-bc14-d2a3fac33216', 'f', 'Cool project', 'f'),
('a5684cb5-59b6-47a9-ac1f-3117c81d577c', '2023-09-13 08:21:21.935139', '27d3b493-f912-4072-829e-962becea22be', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, NULL, '68c298ef-6d22-4099-a1ca-efc60a47416d', 'f', 'favourite project', 'f'),
('a5be943c-f6bc-417f-bdeb-43ce3afb1096', '2023-09-13 11:52:40.10867', '27d3b493-f912-4072-829e-962becea22be', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, NULL, '088d0f07-60d4-4dd9-a2e9-8f101451c45a', 'f', 'favouritest project', 't'),
('af648810-1d18-4af3-bd93-710b1919ac3d', '2023-09-13 11:47:38.029892', '27d3b493-f912-4072-829e-962becea22be', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, NULL, '6fd111c7-e672-455c-b46c-1087b8750d7b', 'f', 'favouritest project', 'f'),
('c1488613-bf6a-4a3c-994d-8f0bce5fd335', '2023-09-13 08:26:03.329584', '27d3b493-f912-4072-829e-962becea22be', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, NULL, '68c298ef-6d22-4099-a1ca-efc60a47416d', 'f', 'favouritest project', 'f'),
('f320ab7a-5d62-4cbf-9c5d-13ad3cf17344', '2023-09-13 11:42:08.402014', '27d3b493-f912-4072-829e-962becea22be', '24078a3e-f397-41af-ac75-a86ea2569bdc', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, NULL, 'fc878b47-2495-4057-bba9-390567d4d639', 'f', 'favouritest project', 'f'),
('fde81ba2-26b1-4cb7-8ab3-9a89ae81ab21', '2023-09-13 11:55:03.725474', '27d3b493-f912-4072-829e-962becea22be', '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'a0b8b7ab-9a0d-4021-bd92-1bc1310c0fd1', NULL, NULL, 'b15acbfc-07de-4b16-8e86-6a5a3cf64d19', 'f', 'favouritest project', 't');

INSERT INTO "public"."social_link_types" ("value") VALUES
('FACEBOOK'),
('INSTAGRAM'),
('TIKTOK');

INSERT INTO "public"."testdata" ("id", "value", "created_at", "is_deleted") VALUES
('d4359fc7-a673-46f6-9bcd-64ae22905012', 'orange', '2023-09-05 03:49:34.31511', 'f'),
('f0d02493-2938-4ed8-9856-8146f258d09c', 'apple', '2023-09-05 03:49:34.31511', 'f');

INSERT INTO "public"."time_units" ("value") VALUES
('DAYS'),
('HOURS'),
('WEEKS');

INSERT INTO "public"."user_roles" ("value", "comment") VALUES
('ADMIN', 'users with the privilege to set users’ roles'),
('CREATOR', 'users with the privilege to access creator tools'),
('PATRON', 'users with the privilege to send briefs');

INSERT INTO "public"."users" ("id", "created_at", "auth_id", "role", "country_of_residence", "billing_address", "creator_id", "given_name", "last_name", "avatar_image_url", "is_deleted") VALUES
('02f90160-7c6f-4b0b-874b-4092fc13f0bf', '2023-09-09 15:22:51.79555', 'b50c0a2a-fea5-40b8-839f-a01eb4c58089', 'CREATOR', 'SINGAPORE', NULL, '81b909e7-8b84-41c7-9e17-0b02c07d2425', 'Hwee the Creator', 'Lim', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/02f90160-7c6f-4b0b-874b-4092fc13f0bf-avatar-34c99e2b-74f1-435e-9d8e-601aeee0902c.jpeg', 'f'),
('070fa3d0-6bab-4cbc-965b-5ce479b52016', '2023-09-14 16:28:12.80253', '227c3e5f-efd5-4b56-89fc-9b4f64d1dc41', 'CREATOR', NULL, NULL, 'ec315031-bb2c-4aea-8c44-cf090d21e194', 'GoodBf', 'Yep', NULL, 'f'),
('244c8f1d-16d2-4af5-9042-a4957e493f4e', '2023-09-09 15:18:26.304814', 'b1a5969f-c7b4-47d9-8c01-de445dc41959', 'CREATOR', NULL, NULL, '3f2133cc-e579-44fa-89c7-11b4d66bf986', 'Arron ', 'Li', NULL, 'f'),
('27d3b493-f912-4072-829e-962becea22be', '2023-09-05 08:49:22.58004', '180e20ec-d326-4c6a-8c59-f1f953f79d8f', 'PATRON', NULL, NULL, NULL, 'Arron', 'Li', NULL, 'f'),
('449ea3f8-5886-4012-9e04-ecfb25fa0767', '2023-09-05 08:49:22.534573', '180e20ec-d326-4c6a-8c59-f1f953f79d8f', 'CREATOR', NULL, NULL, '194a12f1-6204-45fc-b056-e39e607e2ad2', 'Arron', 'Li', NULL, 'f'),
('58edfbd0-b3d1-4ff6-81d0-8a8c17251bdc', '2023-09-09 15:18:26.304814', 'b1a5969f-c7b4-47d9-8c01-de445dc41959', 'PATRON', NULL, NULL, NULL, 'Arron ', 'Li', NULL, 'f'),
('5fc89852-7307-4c60-b7ee-bff957658761', '2023-09-12 06:34:56.310394', '5395e9d1-e251-457b-a998-29be646abdd2', 'PATRON', NULL, NULL, NULL, 'Y', 'L', NULL, 'f'),
('6c25947c-653f-464d-9208-339350fa05fc', '2023-09-14 16:28:12.80253', '227c3e5f-efd5-4b56-89fc-9b4f64d1dc41', 'PATRON', NULL, NULL, NULL, 'GoodBf', 'Yep', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/6c25947c-653f-464d-9208-339350fa05fc-avatar-8bc1a319-6dfb-402a-8ee7-d20349583a77.jpeg', 'f'),
('6fdcc927-4731-4dcb-8603-4a7481e9eb48', '2023-09-08 10:28:52.970967', 'c9b43c48-2a0e-4ee2-8171-0d7281fb0a40', 'CREATOR', NULL, NULL, 'ea3c16e7-9f88-47ab-acbf-0272cbd1e1b7', 'NewUser', 'Test', NULL, 'f'),
('8845a402-6b45-49b1-96e0-ab82f5e9afd4', '2023-09-08 10:29:59.524751', '2674128e-5847-442e-88e4-1f8ac8444458', 'CREATOR', NULL, NULL, 'eadb2f1a-9f2c-4057-829f-ec241eea477d', 'TestUser', '2', NULL, 'f'),
('9b947533-7083-45ec-93a7-1e229e71fc3f', '2023-09-12 02:33:58.110987', '0d7b6c0a-d8e5-405c-bf0d-41d0800c3337', 'CREATOR', NULL, NULL, 'c12f5f1c-e56a-4011-942f-fb0bfe8ac837', 'Y', 'L', NULL, 'f'),
('a1a0c297-b10a-4c60-be48-f845db7ebb0d', '2023-09-12 02:33:58.110987', '0d7b6c0a-d8e5-405c-bf0d-41d0800c3337', 'PATRON', NULL, NULL, NULL, 'Y', 'L', NULL, 'f'),
('a4882f54-27b7-41da-8851-c200e8d894dc', '2023-09-12 06:34:08.941541', '020776ac-60f8-49d9-a484-fff6fcb0d2db', 'PATRON', NULL, NULL, NULL, 'Y', 'L', NULL, 'f'),
('b0b430f6-e661-4308-b7f9-81e6e5e8c9f7', '2023-09-05 08:56:54.100148', 'af030a24-dcec-4bea-a56a-52b816a5e014', 'PATRON', 'SINGAPORE', NULL, NULL, 'Arron Creator', 'Li', 'xxx', 'f'),
('b3239478-f28d-433f-8202-8685e5618db7', '2023-09-08 10:29:59.524751', '2674128e-5847-442e-88e4-1f8ac8444458', 'PATRON', NULL, NULL, NULL, 'TestUser', '2', NULL, 'f'),
('b37fc638-accc-4b88-92ba-006bd2bfb24f', '2023-09-12 06:51:25.318364', '91875e70-782d-4fec-a96c-cbff2d45dde0', 'CREATOR', 'UNITED STATES', NULL, 'ed54f572-f0e7-4a67-b2bd-5836e925dc5a', 'Arron', 'Li', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/b37fc638-accc-4b88-92ba-006bd2bfb24f-avatar-b191a6d8-e81e-4450-bb35-e542895d6501.jpeg', 'f'),
('c7e870b8-6d12-46e9-ab17-63a3ceb5fa01', '2023-09-08 10:30:21.201209', 'b152e1ea-1017-43e2-b7d0-cb33b9b7d0cd', 'PATRON', NULL, NULL, NULL, 'testuser', 'test', NULL, 'f'),
('db3a6fc2-1cbf-450c-bf8f-81b0f6a395fb', '2023-09-12 06:34:56.310394', '5395e9d1-e251-457b-a998-29be646abdd2', 'CREATOR', NULL, NULL, 'f3407131-8da1-464c-b6ef-0b8345c4d6b4', 'Y', 'L', NULL, 'f'),
('e5991c22-835e-4669-91a8-b2b4cc9eb92d', '2023-09-05 08:56:54.052598', 'af030a24-dcec-4bea-a56a-52b816a5e014', 'CREATOR', 'SINGAPORE', NULL, '24078a3e-f397-41af-ac75-a86ea2569bdc', 'Arron RichMan', 'Li', 'xxx', 'f'),
('ea54575c-1d73-4c4a-8c8c-870e41bf5797', '2023-09-09 15:22:51.79555', 'b50c0a2a-fea5-40b8-839f-a01eb4c58089', 'PATRON', 'SINGAPORE', NULL, NULL, 'Hwee the Patron', 'Lim', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/ea54575c-1d73-4c4a-8c8c-870e41bf5797-avatar-39aa7f9f-b345-417e-bafb-035c10e8779e.jpeg', 'f'),
('eb9de173-aff8-4e99-ab3e-743db2c416be', '2023-09-08 10:28:52.970967', 'c9b43c48-2a0e-4ee2-8171-0d7281fb0a40', 'PATRON', NULL, NULL, NULL, 'NewUser', 'Test', NULL, 'f'),
('f0757edf-3e76-4510-a0fb-6dfbaba1427a', '2023-09-12 06:51:25.318364', '91875e70-782d-4fec-a96c-cbff2d45dde0', 'PATRON', NULL, NULL, NULL, 'Arron', 'Li', 'https://cocreate-demo-app.s3.ap-southeast-1.amazonaws.com/f0757edf-3e76-4510-a0fb-6dfbaba1427a-avatar-8789d586-a317-4bc2-a625-580aa24d054e.jpeg', 'f'),
('f1897fbe-0a29-4ac9-b070-865b6099ddd7', '2023-09-05 08:48:48.414549', '4537f0a4-76dc-4442-989c-f31e150231ad', 'CREATOR', NULL, NULL, '8eb70ea1-a941-430a-b7aa-e402a57f7045', 'Arron', 'Li', NULL, 'f'),
('f7cfbdff-eeb4-41f0-8b24-1ec1dbb28956', '2023-09-12 06:34:08.941541', '020776ac-60f8-49d9-a484-fff6fcb0d2db', 'CREATOR', NULL, NULL, '0c7aa3a4-eaf8-4266-9ea7-21255e165f5b', 'Y', 'L', NULL, 'f'),
('f909417d-32af-4063-8cda-f12e89fb4b2d', '2023-09-08 10:30:21.201209', 'b152e1ea-1017-43e2-b7d0-cb33b9b7d0cd', 'CREATOR', NULL, NULL, '8710cb6c-f5de-4caf-8995-3be8af9b9812', 'testuser', 'test', NULL, 'f');

ALTER TABLE "public"."creator_portfolio_items" ADD FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id");
ALTER TABLE "public"."creator_products" ADD FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id");
ALTER TABLE "public"."creator_products" ADD FOREIGN KEY ("currency") REFERENCES "public"."currencies"("value");
ALTER TABLE "public"."creator_project_stages" ADD FOREIGN KEY ("time_estimate_unit") REFERENCES "public"."time_units"("value");
ALTER TABLE "public"."creator_social_links" ADD FOREIGN KEY ("type") REFERENCES "public"."social_link_types"("value");
ALTER TABLE "public"."creator_social_links" ADD FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id");
ALTER TABLE "public"."creator_testimonials" ADD FOREIGN KEY ("patron_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."creator_testimonials" ADD FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id");
ALTER TABLE "public"."creator_testimonials" ADD FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id");
ALTER TABLE "public"."creators" ADD FOREIGN KEY ("country_of_operation") REFERENCES "public"."country"("name");
ALTER TABLE "public"."project_briefs" ADD FOREIGN KEY ("product_id") REFERENCES "public"."creator_products"("id");
ALTER TABLE "public"."project_briefs" ADD FOREIGN KEY ("budget_currency") REFERENCES "public"."currencies"("value");
ALTER TABLE "public"."project_briefs" ADD FOREIGN KEY ("patron_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."project_briefs" ADD FOREIGN KEY ("delivery_method") REFERENCES "public"."delivery_methods"("value");
ALTER TABLE "public"."project_briefs" ADD FOREIGN KEY ("status") REFERENCES "public"."project_brief_statuses"("value");
ALTER TABLE "public"."project_briefs" ADD FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id");
ALTER TABLE "public"."project_proposals" ADD FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id");
ALTER TABLE "public"."project_proposals" ADD FOREIGN KEY ("currency") REFERENCES "public"."currencies"("value");
ALTER TABLE "public"."project_stages" ADD FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id");
ALTER TABLE "public"."project_stages" ADD FOREIGN KEY ("time_estimate_unit") REFERENCES "public"."time_units"("value");
ALTER TABLE "public"."projects" ADD FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id");
ALTER TABLE "public"."projects" ADD FOREIGN KEY ("agreed_proposal_id") REFERENCES "public"."project_proposals"("id");
ALTER TABLE "public"."projects" ADD FOREIGN KEY ("brief_id") REFERENCES "public"."project_briefs"("id");
ALTER TABLE "public"."projects" ADD FOREIGN KEY ("current_stage_id") REFERENCES "public"."project_stages"("id");
ALTER TABLE "public"."projects" ADD FOREIGN KEY ("patron_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."users" ADD FOREIGN KEY ("country_of_residence") REFERENCES "public"."country"("name");
ALTER TABLE "public"."users" ADD FOREIGN KEY ("role") REFERENCES "public"."user_roles"("value");
ALTER TABLE "public"."users" ADD FOREIGN KEY ("creator_id") REFERENCES "public"."creators"("id");
ALTER TABLE "public"."users" ADD FOREIGN KEY ("auth_id") REFERENCES "public"."auth"("id");
