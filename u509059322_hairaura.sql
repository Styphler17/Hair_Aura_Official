-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 07, 2025 at 06:51 PM
-- Server version: 11.8.3-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u509059322_hairaura`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Super Admin','Editor','Viewer') DEFAULT 'Editor',
  `avatar` longtext DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `name`, `email`, `password`, `role`, `avatar`, `last_login`, `created_at`) VALUES
('1', 'Super Admin', 'admin@hairaura.com', 'admin123', 'Super Admin', '', '2025-12-07 14:35:46', '2025-12-07 14:35:46');

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `image` text DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `date` datetime NOT NULL,
  `seo_description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `excerpt`, `content`, `image`, `author`, `date`, `seo_description`, `created_at`, `updated_at`) VALUES
('1', 'The Ultimate Guide to Maintaining HD Lace', 'Learn the secrets to keeping your lace melted and undetectable for weeks.', 'HD Lace is known for its delicate nature and high transparency, making it the top choice for a flawless install. However, to keep it looking fresh, you need to avoid heavy oils and excessive glue. Clean the lace gently with alcohol every few days to remove buildup...', 'https://picsum.photos/id/1027/800/600', 'Aura Stylist', '2025-12-07 14:35:47', 'Expert tips on maintaining HD lace wigs for longevity and a natural look.', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('2', 'Virgin vs. Raw Hair: What is the Difference?', 'Confused about hair grades? We break down the differences between processed virgin hair and authentic raw donor hair.', 'When shopping for luxury extensions, the terms Virgin and Raw are often used interchangeably, but they are quite different. Raw hair is completely unprocessed, meaning it comes directly from a donor without chemical alterations. Virgin hair may be steam processed to achieve specific curl patterns...', 'https://picsum.photos/id/64/800/600', 'Hair Aura Team', '2025-12-05 14:35:47', 'Understand the difference between Virgin hair and Raw hair before you buy.', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('3', '5 Summer Styles for the Accra Heat', 'Beat the humidity with these breathable, chic styles perfect for the Ghanaian weather.', 'Accra heat is no joke, and wearing a heavy wig can be uncomfortable. We recommend glueless closures for breathability, or a short bob cut to keep hair off your neck. Our body wave bundles also hold up well in humidity without frizzing excessively...', 'https://picsum.photos/id/338/800/600', 'Aura Stylist', '2025-12-02 14:35:47', 'Best wig styles for hot weather in Ghana.', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('blog_001', 'How to Make Your HD Lace Wig Last 6+ Months: Expert Maintenance Guide', 'Discover professional techniques to extend your HD lace wig lifespan. Learn daily care routines, proper storage methods, and products that keep your investment looking flawless.', '<h2>Why HD Lace Wigs Need Special Care</h2>\r\n<p>HD (High Definition) lace wigs are prized for their ultra-thin, transparent lace that creates an undetectable hairline. However, this delicate material requires specific maintenance to maintain its premium appearance.</p>\r\n\r\n<h2>Daily Maintenance Routine</h2>\r\n<p><strong>Morning Routine:</strong> Gently brush your wig with a wide-tooth comb, starting from the ends and working upward. Avoid pulling at the lace.</p>\r\n<p><strong>Evening Care:</strong> Remove any adhesive buildup with a lace-safe remover. Never use harsh chemicals or alcohol directly on the lace.</p>\r\n\r\n<h2>Weekly Deep Cleaning</h2>\r\n<p>Every 7-10 days, give your HD lace wig a thorough cleanse:</p>\r\n<ol>\r\n<li>Fill a basin with lukewarm water and a sulfate-free shampoo</li>\r\n<li>Submerge the wig and gently swish (never rub or wring)</li>\r\n<li>Rinse with cool water until water runs clear</li>\r\n<li>Apply a deep conditioner, avoiding the lace area</li>\r\n<li>Air dry on a wig stand, away from direct heat</li>\r\n</ol>\r\n\r\n<h2>Storage Best Practices</h2>\r\n<p>Store your HD lace wig on a mannequin head or wig stand to maintain its shape. Cover with a silk or satin cap to prevent dust accumulation. Keep in a cool, dry place away from sunlight.</p>\r\n\r\n<h2>Products to Avoid</h2>\r\n<p>Never use products containing alcohol, heavy oils, or silicones near the lace. These can cause the lace to become brittle and visible. Stick to water-based, lightweight products designed specifically for lace wigs.</p>\r\n\r\n<h2>When to Replace</h2>\r\n<p>With proper care, an HD lace wig should last 6-12 months of regular wear. Signs it\'s time for a replacement include: visible lace, excessive shedding, or inability to maintain style.</p>', 'https://hair-aura.debesties.com/uploads/blog-hd-lace-care.jpg', 'Hair Aura Stylist', '2025-12-08 10:00:00', 'Expert guide on maintaining HD lace wigs for maximum longevity. Learn daily care routines, weekly deep cleaning, and storage tips to keep your wig looking flawless for 6+ months.', '2025-12-07 17:57:49', '2025-12-07 17:57:49'),
('blog_002', 'Virgin Hair vs Raw Hair: Understanding the Difference Before You Buy', 'Confused about hair terminology? We break down the crucial differences between virgin hair and raw hair, helping you make an informed decision for your next purchase.', '<h2>What is Virgin Hair?</h2>\r\n<p>Virgin hair refers to hair that has never been chemically processed or colored. However, it may have undergone steam processing to create specific curl patterns (like body wave or deep curl). Virgin hair is typically collected from a single donor and sorted by texture and color.</p>\r\n\r\n<h2>What is Raw Hair?</h2>\r\n<p>Raw hair is completely unprocessed hair that comes directly from the donor without any chemical or steam treatments. It maintains its natural cuticle alignment and original texture. Raw hair is considered the highest quality and most expensive option.</p>\r\n\r\n<h2>Key Differences</h2>\r\n<table>\r\n<tr><th>Feature</th><th>Virgin Hair</th><th>Raw Hair</th></tr>\r\n<tr><td>Processing</td><td>May be steam processed</td><td>Completely unprocessed</td></tr>\r\n<tr><td>Cuticle Alignment</td><td>Usually aligned</td><td>Always perfectly aligned</td></tr>\r\n<tr><td>Durability</td><td>6-12 months</td><td>12-18+ months</td></tr>\r\n<tr><td>Price</td><td>Moderate</td><td>Premium</td></tr>\r\n<tr><td>Styling Versatility</td><td>High</td><td>Highest</td></tr>\r\n</table>\r\n\r\n<h2>Which Should You Choose?</h2>\r\n<p><strong>Choose Virgin Hair if:</strong> You want quality hair at a more accessible price point, need specific curl patterns, or plan to style frequently.</p>\r\n<p><strong>Choose Raw Hair if:</strong> You prioritize maximum longevity, want the most natural texture, or are willing to invest in premium quality.</p>\r\n\r\n<h2>Maintenance Considerations</h2>\r\n<p>Both virgin and raw hair require proper care, but raw hair tends to hold up better over time due to its unprocessed nature. Raw hair can be dyed, permed, and styled more aggressively without damage.</p>', 'https://hair-aura.debesties.com/uploads/blog-virgin-vs-raw.jpg', 'Hair Aura Team', '2025-12-07 14:00:00', 'Learn the difference between virgin hair and raw hair extensions. Understand processing, durability, pricing, and which option is best for your needs and budget.', '2025-12-07 17:57:49', '2025-12-07 17:57:49'),
('blog_003', '5 Breathable Wig Styles Perfect for Accra\'s Hot Weather', 'Beat the Ghanaian heat with these lightweight, breathable wig styles. From glueless closures to short bobs, discover styles that keep you cool and chic all summer long.', '<h2>Why Heat-Friendly Styles Matter</h2>\r\n<p>Accra\'s tropical climate demands hair solutions that won\'t trap heat or cause discomfort. The right wig style can make all the difference between feeling fresh and feeling overwhelmed.</p>\r\n\r\n<h2>1. Glueless Closure Wigs</h2>\r\n<p>Glueless closures use clips and combs instead of adhesive, allowing air to circulate freely. Our 5x5 transparent closures are perfect for this application. Benefits include:</p>\r\n<ul>\r\n<li>No adhesive buildup in hot weather</li>\r\n<li>Easy removal for scalp breathing</li>\r\n<li>Quick installation and removal</li>\r\n<li>Natural-looking hairline</li>\r\n</ul>\r\n\r\n<h2>2. Short Bob Wigs</h2>\r\n<p>Short bobs keep hair off your neck and shoulders, reducing heat retention. Our Piano Highlight Bob is a stylish option that combines breathability with modern aesthetics.</p>\r\n\r\n<h2>3. Loose Wave Bundles</h2>\r\n<p>Body wave bundles create natural-looking volume without the weight. The S-pattern waves allow air to flow through, making them ideal for hot climates.</p>\r\n\r\n<h2>4. U-Part Wigs</h2>\r\n<p>U-part wigs blend with your natural hair while providing coverage. They\'re lighter than full wigs and offer excellent ventilation around the perimeter.</p>\r\n\r\n<h2>5. Half Wigs</h2>\r\n<p>Half wigs cover only the back portion of your head, leaving your natural hairline exposed. This style is perfect for those who want added length without full coverage.</p>\r\n\r\n<h2>Maintenance Tips for Hot Weather</h2>\r\n<p>In Accra\'s heat, increase your wig cleaning frequency to every 5-7 days. Use lightweight, water-based products and avoid heavy oils that can trap heat. Consider wearing a wig cap made of breathable material.</p>\r\n\r\n<h2>Styling Products for Heat</h2>\r\n<p>Opt for products with heat-protectant properties and UV protection. Lightweight leave-in conditioners and anti-frizz serums work best in humid conditions.</p>', 'https://hair-aura.debesties.com/uploads/blog-summer-styles.jpg', 'Aura Stylist', '2025-12-06 11:00:00', 'Discover 5 breathable wig styles perfect for Accra\'s hot weather. Learn about glueless closures, short bobs, and other heat-friendly options to stay cool and stylish.', '2025-12-07 17:57:49', '2025-12-07 17:57:49'),
('blog_004', 'Step-by-Step: How to Install Your First HD Lace Wig Like a Pro', 'New to wig installation? Follow our detailed guide to achieve a flawless, undetectable install. From prep to final styling, we cover everything you need to know.', '<h2>Pre-Installation Preparation</h2>\r\n<p>Before installing your HD lace wig, proper preparation is crucial for the best results.</p>\r\n\r\n<h3>1. Prep Your Natural Hair</h3>\r\n<p>Braid your natural hair in a flat cornrow pattern, ensuring all hair is secured close to your scalp. For shorter hair, use a wig cap to flatten everything.</p>\r\n\r\n<h3>2. Clean Your Scalp</h3>\r\n<p>Wash your scalp with a clarifying shampoo to remove oils and product buildup. This ensures better adhesive grip and prevents irritation.</p>\r\n\r\n<h3>3. Measure Your Head</h3>\r\n<p>Measure your head circumference to ensure your wig fits properly. Most wigs are adjustable, but knowing your size helps with customization.</p>\r\n\r\n<h2>Installation Process</h2>\r\n\r\n<h3>Step 1: Apply Wig Cap</h3>\r\n<p>Place a breathable wig cap over your braided hair. Ensure it sits flat and covers all your natural hair.</p>\r\n\r\n<h3>Step 2: Position the Wig</h3>\r\n<p>Place the wig on your head, aligning the front lace with your natural hairline. Adjust the straps inside for a secure fit.</p>\r\n\r\n<h3>Step 3: Cut the Lace</h3>\r\n<p>Using sharp scissors, carefully trim the excess lace along your hairline. Leave about 1/4 inch of lace for adhesive application. Cut in small sections to avoid mistakes.</p>\r\n\r\n<h3>Step 4: Apply Adhesive</h3>\r\n<p>Apply a thin layer of lace adhesive along your hairline. Wait 30-60 seconds until it becomes tacky (not wet). Popular options include Got2B Glued or professional lace adhesives.</p>\r\n\r\n<h3>Step 5: Press the Lace</h3>\r\n<p>Gently press the lace onto your hairline, working from the center outward. Use a silk scarf or stocking cap to press for 5-10 minutes for a secure bond.</p>\r\n\r\n<h2>Styling Your Install</h2>\r\n<p>Once installed, you can style your wig as desired. Use heat tools on low settings, and always apply a heat protectant. For a natural look, pluck a few hairs from the hairline and part your wig.</p>\r\n\r\n<h2>Removal Process</h2>\r\n<p>To remove, apply a lace adhesive remover around the perimeter. Gently lift the lace starting from the edges. Never pull forcefully, as this can damage both the wig and your natural hair.</p>\r\n\r\n<h2>Common Mistakes to Avoid</h2>\r\n<ul>\r\n<li>Cutting the lace too close to the hairline</li>\r\n<li>Using too much adhesive (causes buildup)</li>\r\n<li>Not waiting for adhesive to become tacky</li>\r\n<li>Pulling the wig off without remover</li>\r\n</ul>', 'https://hair-aura.debesties.com/uploads/blog-installation-guide.jpg', 'Hair Aura Stylist', '2025-12-05 09:00:00', 'Complete step-by-step guide to installing your first HD lace wig. Learn prep, installation, styling, and removal techniques for a flawless, professional-looking install.', '2025-12-07 17:57:49', '2025-12-07 17:57:49'),
('blog_005', 'The Ultimate Guide to Matching Your Wig Color to Your Skin Tone', 'Find your perfect hair color match with our comprehensive guide. Learn which shades complement different skin undertones for a natural, flattering look.', '<h2>Understanding Skin Undertones</h2>\r\n<p>Before choosing a wig color, identify your skin\'s undertone. There are three main categories:</p>\r\n<ul>\r\n<li><strong>Cool Undertones:</strong> Pink, red, or bluish hints in your skin</li>\r\n<li><strong>Warm Undertones:</strong> Yellow, peachy, or golden hints</li>\r\n<li><strong>Neutral Undertones:</strong> A mix of both cool and warm</li>\r\n</ul>\r\n\r\n<h2>Best Colors for Cool Undertones</h2>\r\n<p>If you have cool undertones, these colors will complement your skin:</p>\r\n<ul>\r\n<li><strong>Natural Black:</strong> Classic and versatile</li>\r\n<li><strong>Jet Black:</strong> Deep, rich black with blue undertones</li>\r\n<li><strong>Dark Brown:</strong> Cool-toned browns (ash brown)</li>\r\n<li><strong>Platinum Blonde:</strong> Cool, ashy blondes (like our 613 Blonde)</li>\r\n</ul>\r\n\r\n<h2>Best Colors for Warm Undertones</h2>\r\n<p>Warm undertones pair beautifully with:</p>\r\n<ul>\r\n<li><strong>Natural Black:</strong> Works for all undertones</li>\r\n<li><strong>Warm Brown:</strong> Golden or caramel browns</li>\r\n<li><strong>Honey Blonde:</strong> Warm, golden blondes</li>\r\n<li><strong>Piano Highlights:</strong> Warm-toned highlights (like our Piano Highlight Bob)</li>\r\n</ul>\r\n\r\n<h2>Neutral Undertones</h2>\r\n<p>If you have neutral undertones, you\'re lucky! Most colors will work for you. You can experiment with both cool and warm tones.</p>\r\n\r\n<h2>Testing Colors</h2>\r\n<p>Before committing to a color, consider:</p>\r\n<ol>\r\n<li>Hold different colored swatches near your face in natural light</li>\r\n<li>Try on wigs in various shades</li>\r\n<li>Consider your wardrobe colors</li>\r\n<li>Think about your lifestyle and maintenance preferences</li>\r\n</ol>\r\n\r\n<h2>Popular Color Options at Hair Aura</h2>\r\n<p>We offer a range of colors to suit every skin tone:</p>\r\n<ul>\r\n<li><strong>Natural Black:</strong> Universal favorite, suits all undertones</li>\r\n<li><strong>Dark Brown:</strong> Natural-looking, low maintenance</li>\r\n<li><strong>613 Blonde:</strong> Pre-bleached, ready to dye any color</li>\r\n<li><strong>Piano Highlight (P4/27):</strong> Warm honey highlights</li>\r\n</ul>\r\n\r\n<h2>Color Maintenance</h2>\r\n<p>Lighter colors require more maintenance to prevent brassiness. Use purple or blue shampoos for blonde tones, and color-safe products for all dyed hair.</p>', 'https://hair-aura.debesties.com/uploads/blog-color-matching.jpg', 'Hair Aura Team', '2025-12-04 15:00:00', 'Complete guide to matching wig colors to your skin tone. Learn about undertones, best colors for cool/warm/neutral skin, and find your perfect hair color match.', '2025-12-07 17:57:49', '2025-12-07 17:57:49'),
('blog_006', 'How to Install Hair Bundles: A Complete Guide for Beginners', 'Master the art of bundle installation with our comprehensive guide. Learn different methods, styling techniques, and maintenance tips for flawless bundle hair.', '<h2>What Are Hair Bundles?</h2>\r\n<p>Hair bundles are wefts of hair that can be sewn, clipped, or glued into your natural hair to add length and volume. They\'re versatile and can be styled in countless ways.</p>\r\n\r\n<h2>Choosing Your Bundles</h2>\r\n<p>At Hair Aura, we offer bundles in various textures and lengths:</p>\r\n<ul>\r\n<li><strong>Body Wave:</strong> S-pattern waves, perfect for everyday wear</li>\r\n<li><strong>Silky Straight:</strong> Bone straight, sleek and professional</li>\r\n<li><strong>Deep Curly:</strong> Tight, bouncy curls for volume</li>\r\n<li><strong>Kinky Straight:</strong> Matches natural 4C texture when blown out</li>\r\n</ul>\r\n\r\n<h2>Installation Methods</h2>\r\n\r\n<h3>Method 1: Sew-In Installation</h3>\r\n<p>This is the most secure method for long-term wear:</p>\r\n<ol>\r\n<li>Braid your natural hair in a circular pattern</li>\r\n<li>Create a foundation braid around your head</li>\r\n<li>Sew bundles onto the braids using a curved needle and thread</li>\r\n<li>Start from the bottom and work upward</li>\r\n<li>Blend the bundles with your natural hair</li>\r\n</ol>\r\n\r\n<h3>Method 2: Clip-In Installation</h3>\r\n<p>Perfect for temporary wear or beginners:</p>\r\n<ol>\r\n<li>Section your hair horizontally</li>\r\n<li>Open the clips on the bundle</li>\r\n<li>Attach to your natural hair close to the scalp</li>\r\n<li>Close the clips securely</li>\r\n<li>Repeat, working from bottom to top</li>\r\n</ol>\r\n\r\n<h3>Method 3: Glue-In Installation</h3>\r\n<p>Quick installation for short-term wear:</p>\r\n<ol>\r\n<li>Apply bonding glue to the weft</li>\r\n<li>Press onto clean, dry hair</li>\r\n<li>Hold for 30 seconds to set</li>\r\n<li>Style as desired</li>\r\n</ol>\r\n\r\n<h2>Styling Your Bundles</h2>\r\n<p>Once installed, you can style your bundles just like natural hair:</p>\r\n<ul>\r\n<li>Curling: Use heat tools on low-medium settings</li>\r\n<li>Straightening: Flat iron on low heat with heat protectant</li>\r\n<li>Washing: Shampoo and condition every 1-2 weeks</li>\r\n<li>Deep Conditioning: Monthly treatments maintain softness</li>\r\n</ul>\r\n\r\n<h2>Maintenance Tips</h2>\r\n<p>To extend your bundles\' lifespan:</p>\r\n<ul>\r\n<li>Wash with sulfate-free shampoo</li>\r\n<li>Use a wide-tooth comb when wet</li>\r\n<li>Store properly when not in use</li>\r\n<li>Avoid excessive heat styling</li>\r\n<li>Sleep with hair in a loose braid or bun</li>\r\n</ul>\r\n\r\n<h2>When to Remove</h2>\r\n<p>Remove your bundles after 6-8 weeks for sew-ins, or whenever you notice excessive tangling or shedding. Give your natural hair a break between installations.</p>', 'https://hair-aura.debesties.com/uploads/blog-bundle-installation.jpg', 'Hair Aura Stylist', '2025-12-03 13:00:00', 'Complete beginner\'s guide to installing hair bundles. Learn sew-in, clip-in, and glue-in methods, plus styling and maintenance tips for flawless bundle hair.', '2025-12-07 17:57:49', '2025-12-07 17:57:49'),
('blog_007', 'Matching Your Natural Hair Texture: A Guide to Perfect Blending', 'Achieve seamless blending by matching your wig or extensions to your natural hair texture. Learn how to identify your texture and choose the right products.', '<h2>Understanding Hair Textures</h2>\r\n<p>Hair textures are classified using the Andre Walker Hair Typing System, ranging from Type 1 (straight) to Type 4 (coily). Most people of African descent have Type 4 hair.</p>\r\n\r\n<h2>Type 4 Hair Textures</h2>\r\n<ul>\r\n<li><strong>4A:</strong> Defined S-shaped coils, springy texture</li>\r\n<li><strong>4B:</strong> Z-shaped pattern, less defined coils</li>\r\n<li><strong>4C:</strong> Tightest curl pattern, minimal definition</li>\r\n</ul>\r\n\r\n<h2>Matching Textures</h2>\r\n\r\n<h3>For 4A Hair</h3>\r\n<p>Best matches: Deep curly wigs, body wave bundles, or kinky straight when styled with curl definition products.</p>\r\n\r\n<h3>For 4B Hair</h3>\r\n<p>Best matches: Kinky straight bundles (matches blown-out texture), body wave, or deep curly for added definition.</p>\r\n\r\n<h3>For 4C Hair</h3>\r\n<p>Best matches: Kinky straight bundles are perfect when your natural hair is blown out. For protective styles, deep curly or body wave work well.</p>\r\n\r\n<h2>Blending Techniques</h2>\r\n<p>To achieve seamless blending:</p>\r\n<ol>\r\n<li><strong>Leave Out:</strong> Leave 1-2 inches of natural hair out to blend with extensions</li>\r\n<li><strong>Color Match:</strong> Ensure color matches your natural hair</li>\r\n<li><strong>Texture Match:</strong> Choose texture closest to your natural pattern</li>\r\n<li><strong>Styling:</strong> Use same products on both natural and extension hair</li>\r\n</ol>\r\n\r\n<h2>Products for Blending</h2>\r\n<p>Use products that work for both your natural hair and extensions:</p>\r\n<ul>\r\n<li>Leave-in conditioners for moisture</li>\r\n<li>Curl defining creams for texture</li>\r\n<li>Edge control for sleek edges</li>\r\n<li>Heat protectants when using styling tools</li>\r\n</ul>\r\n\r\n<h2>Our Texture Options</h2>\r\n<p>At Hair Aura, we offer textures that blend beautifully with natural hair:</p>\r\n<ul>\r\n<li><strong>Kinky Straight:</strong> Perfect for 4B/4C hair when blown out</li>\r\n<li><strong>Body Wave:</strong> Versatile, works with most textures</li>\r\n<li><strong>Deep Curly:</strong> Adds definition to natural curls</li>\r\n<li><strong>Silky Straight:</strong> For sleek, straight styles</li>\r\n</ul>\r\n\r\n<h2>Maintenance for Blended Styles</h2>\r\n<p>When blending natural hair with extensions:</p>\r\n<ul>\r\n<li>Moisturize your natural hair regularly</li>\r\n<li>Protect your edges with satin scarves</li>\r\n<li>Deep condition both natural and extension hair</li>\r\n<li>Trim your natural hair regularly to prevent split ends</li>\r\n</ul>', 'https://hair-aura.debesties.com/uploads/blog-texture-matching.jpg', 'Hair Aura Team', '2025-12-02 10:00:00', 'Guide to matching wig and extension textures to your natural hair. Learn about Type 4 hair textures, blending techniques, and product recommendations for seamless results.', '2025-12-07 17:57:49', '2025-12-07 17:57:49'),
('blog_008', 'Weekly Wig Care Routine: Keep Your Investment Looking Fresh', 'Establish a weekly care routine that keeps your wig looking salon-fresh. Learn the essential steps for washing, conditioning, and styling maintenance.', '<h2>Why Weekly Care Matters</h2>\r\n<p>Regular maintenance prevents buildup, tangling, and premature wear. A consistent weekly routine extends your wig\'s lifespan and keeps it looking its best.</p>\r\n\r\n<h2>Your Weekly Care Schedule</h2>\r\n\r\n<h3>Day 1: Deep Clean</h3>\r\n<p><strong>Morning:</strong> Remove wig and prepare cleaning area</p>\r\n<ol>\r\n<li>Fill basin with lukewarm water</li>\r\n<li>Add sulfate-free shampoo (quarter-sized amount)</li>\r\n<li>Submerge wig and gently swish for 2-3 minutes</li>\r\n<li>Rinse thoroughly with cool water</li>\r\n<li>Apply deep conditioner, avoiding lace</li>\r\n<li>Let sit for 15-20 minutes</li>\r\n<li>Rinse completely</li>\r\n</ol>\r\n\r\n<h3>Day 2-6: Daily Maintenance</h3>\r\n<p><strong>Morning Routine:</strong></p>\r\n<ul>\r\n<li>Gently detangle with wide-tooth comb</li>\r\n<li>Apply light leave-in conditioner if needed</li>\r\n<li>Style as desired</li>\r\n</ul>\r\n<p><strong>Evening Routine:</strong></p>\r\n<ul>\r\n<li>Remove adhesive buildup (if applicable)</li>\r\n<li>Place on wig stand</li>\r\n<li>Cover with satin cap</li>\r\n</ul>\r\n\r\n<h3>Day 7: Light Refresh</h3>\r\n<p>Mid-week refresh to maintain style:</p>\r\n<ul>\r\n<li>Light mist with water and leave-in conditioner</li>\r\n<li>Re-style if needed</li>\r\n<li>Check for any needed spot cleaning</li>\r\n</ul>\r\n\r\n<h2>Essential Products</h2>\r\n<p>Stock your wig care kit with:</p>\r\n<ul>\r\n<li>Sulfate-free shampoo</li>\r\n<li>Deep conditioner</li>\r\n<li>Leave-in conditioner</li>\r\n<li>Wide-tooth comb</li>\r\n<li>Wig stand</li>\r\n<li>Satin cap or scarf</li>\r\n<li>Lace adhesive remover (for lace wigs)</li>\r\n</ul>\r\n\r\n<h2>Common Mistakes to Avoid</h2>\r\n<ul>\r\n<li>Washing too frequently (strips natural oils)</li>\r\n<li>Using regular shampoo (too harsh)</li>\r\n<li>Rubbing or wringing the hair (causes tangling)</li>\r\n<li>Sleeping with wig on (causes matting)</li>\r\n<li>Skipping deep conditioning (leads to dryness)</li>\r\n</ul>\r\n\r\n<h2>Seasonal Adjustments</h2>\r\n<p><strong>Dry Season:</strong> Increase deep conditioning frequency to every 5 days</p>\r\n<p><strong>Rainy/Humid Season:</strong> Wash more frequently (every 5-6 days) to prevent buildup</p>\r\n\r\n<h2>Signs Your Wig Needs Extra Care</h2>\r\n<p>Watch for these warning signs:</p>\r\n<ul>\r\n<li>Excessive tangling</li>\r\n<li>Dull appearance</li>\r\n<li>Rough texture</li>\r\n<li>Visible shedding</li>\r\n<li>Difficulty holding style</li>\r\n</ul>\r\n<p>If you notice these signs, increase your deep conditioning frequency and consider a protein treatment.</p>', 'https://hair-aura.debesties.com/uploads/blog-care-routine.jpg', 'Aura Stylist', '2025-12-01 14:00:00', 'Complete weekly wig care routine guide. Learn daily maintenance, deep cleaning steps, essential products, and seasonal adjustments to keep your wig looking fresh.', '2025-12-07 17:57:49', '2025-12-07 17:57:49'),
('blog_009', 'How to Choose the Perfect Wig: A Complete Shopping Guide', 'Navigate the wig shopping process with confidence. Learn what to look for, questions to ask, and how to find the perfect wig for your needs and budget.', '<h2>Before You Shop: Know Your Needs</h2>\r\n<p>Before purchasing a wig, consider:</p>\r\n<ul>\r\n<li><strong>Lifestyle:</strong> Daily wear, special occasions, or protective styling?</li>\r\n<li><strong>Budget:</strong> How much can you invest?</li>\r\n<li><strong>Maintenance:</strong> How much time can you dedicate to care?</li>\r\n<li><strong>Style Preference:</strong> Length, texture, color preferences?</li>\r\n</ul>\r\n\r\n<h2>Understanding Wig Types</h2>\r\n\r\n<h3>Lace Front Wigs</h3>\r\n<p>Lace extends only at the front hairline. Best for: Natural-looking hairline, versatile styling.</p>\r\n\r\n<h3>Full Lace Wigs</h3>\r\n<p>Lace covers entire cap. Best for: Maximum styling versatility, updo styles.</p>\r\n\r\n<h3>HD Lace Wigs</h3>\r\n<p>Ultra-thin, transparent lace. Best for: Undetectable hairline, professional looks.</p>\r\n\r\n<h3>U-Part Wigs</h3>\r\n<p>Open section for blending with natural hair. Best for: Easy installation, natural blending.</p>\r\n\r\n<h2>Key Features to Check</h2>\r\n\r\n<h3>1. Hair Quality</h3>\r\n<ul>\r\n<li>Virgin hair: Never processed, highest quality</li>\r\n<li>Raw hair: Completely unprocessed, premium option</li>\r\n<li>Check for cuticle alignment (hair should feel smooth in one direction)</li>\r\n</ul>\r\n\r\n<h3>2. Cap Construction</h3>\r\n<ul>\r\n<li>Adjustable straps for secure fit</li>\r\n<li>Breathable cap material</li>\r\n<li>Comfortable ear tabs</li>\r\n</ul>\r\n\r\n<h3>3. Lace Quality</h3>\r\n<ul>\r\n<li>Thin, transparent lace (for HD lace)</li>\r\n<li>Properly ventilated hair</li>\r\n<li>No visible knots</li>\r\n</ul>\r\n\r\n<h2>Questions to Ask</h2>\r\n<p>When shopping, ask:</p>\r\n<ol>\r\n<li>What type of hair is used? (Virgin, raw, processed)</li>\r\n<li>What is the expected lifespan with proper care?</li>\r\n<li>Can the hair be dyed or heat styled?</li>\r\n<li>What is the return/exchange policy?</li>\r\n<li>Do you offer installation guidance?</li>\r\n</ol>\r\n\r\n<h2>Sizing Your Wig</h2>\r\n<p>Measure your head to ensure proper fit:</p>\r\n<ul>\r\n<li><strong>Petite:</strong> 20-21.5 inches</li>\r\n<li><strong>Average:</strong> 21.5-22.5 inches</li>\r\n<li><strong>Large:</strong> 22.5+ inches</li>\r\n</ul>\r\n<p>Most wigs are adjustable, but knowing your size helps.</p>\r\n\r\n<h2>Budget Considerations</h2>\r\n<p>Wig prices vary based on:</p>\r\n<ul>\r\n<li>Hair quality (raw hair costs more than virgin)</li>\r\n<li>Lace type (HD lace is premium)</li>\r\n<li>Length and density</li>\r\n<li>Brand reputation</li>\r\n</ul>\r\n<p>Invest in quality - a well-made wig lasts longer and looks better.</p>\r\n\r\n<h2>At Hair Aura</h2>\r\n<p>We offer:</p>\r\n<ul>\r\n<li>100% Virgin Human Hair</li>\r\n<li>HD Lace options</li>\r\n<li>Multiple textures and colors</li>\r\n<li>Expert guidance and support</li>\r\n<li>Quality guarantee</li>\r\n</ul>\r\n\r\n<h2>Making Your Decision</h2>\r\n<p>Consider this checklist:</p>\r\n<ul>\r\n<li>✓ Fits your budget</li>\r\n<li>✓ Matches your desired style</li>\r\n<li>✓ Appropriate for your lifestyle</li>\r\n<li>✓ Quality matches price</li>\r\n<li>✓ You understand care requirements</li>\r\n</ul>', 'https://hair-aura.debesties.com/uploads/blog-shopping-guide.jpg', 'Hair Aura Team', '2025-11-30 11:00:00', 'Complete guide to choosing the perfect wig. Learn about wig types, key features to check, sizing, budget considerations, and questions to ask before buying.', '2025-12-07 17:57:49', '2025-12-07 17:57:49'),
('blog_010', '2025 Hair Trends: What\'s Hot in Accra This Season', 'Stay ahead of the curve with the latest hair trends in Accra. From natural textures to bold colors, discover what\'s trending and how to achieve these looks.', '<h2>Trend 1: Natural Texture Embrace</h2>\r\n<p>2025 sees a strong movement toward embracing natural textures. More women are choosing wigs and extensions that complement their natural curl pattern rather than fighting it.</p>\r\n<p><strong>How to Achieve:</strong> Our Kinky Straight bundles blend perfectly with natural 4C texture when blown out, creating a seamless, natural look.</p>\r\n\r\n<h2>Trend 2: Short, Chic Bobs</h2>\r\n<p>Short bobs are making a major comeback in Accra. From blunt cuts to textured bobs, this style offers sophistication and ease of maintenance.</p>\r\n<p><strong>How to Achieve:</strong> Our Piano Highlight Bob offers a modern take on the classic bob with warm honey highlights that add dimension.</p>\r\n\r\n<h2>Trend 3: Bold Color Highlights</h2>\r\n<p>While natural colors remain popular, subtle highlights are trending. Piano highlights (warm honey tones) and caramel streaks add interest without being too bold.</p>\r\n<p><strong>How to Achieve:</strong> Our Piano Highlight Bob or 613 Blonde bundles (which can be dyed any color) offer versatility for trendsetters.</p>\r\n\r\n<h2>Trend 4: Glueless Installations</h2>\r\n<p>As awareness of hair health grows, glueless installations are becoming the preferred method. They\'re easier on your natural hair and scalp.</p>\r\n<p><strong>How to Achieve:</strong> Our 5x5 Transparent Closures are perfect for glueless installs, offering a natural hairline without adhesive.</p>\r\n\r\n<h2>Trend 5: Body Wave Dominance</h2>\r\n<p>Body wave texture continues to dominate as the most versatile option. It works for both casual and professional settings.</p>\r\n<p><strong>How to Achieve:</strong> Our Body Wave Bundles (3pcs) offer luxurious S-pattern waves that hold style beautifully.</p>\r\n\r\n<h2>Trend 6: Protective Styling Focus</h2>\r\n<p>More women are prioritizing hair health through protective styling. Wigs and extensions that protect natural hair are in high demand.</p>\r\n<p><strong>How to Achieve:</strong> All our wigs and bundles can be used for protective styling, allowing your natural hair to rest and grow.</p>\r\n\r\n<h2>Trend 7: Customizable Lengths</h2>\r\n<p>Women want versatility - the ability to switch between long and short styles. Clip-in extensions and wigs offer this flexibility.</p>\r\n<p><strong>How to Achieve:</strong> Our bundles can be installed at various lengths, and our wig collection offers multiple length options.</p>\r\n\r\n<h2>Styling Tips for 2025 Trends</h2>\r\n<ul>\r\n<li>Embrace your natural texture with complementary extensions</li>\r\n<li>Experiment with color through highlights rather than full color</li>\r\n<li>Prioritize hair health with glueless methods</li>\r\n<li>Mix textures for unique looks</li>\r\n<li>Accessorize with headbands, scarves, and clips</li>\r\n</ul>\r\n\r\n<h2>What\'s Next?</h2>\r\n<p>Looking ahead, we expect to see:</p>\r\n<ul>\r\n<li>More focus on sustainability and ethical sourcing</li>\r\n<li>Continued emphasis on natural-looking installations</li>\r\n<li>Innovation in lace technology</li>\r\n<li>Custom color matching services</li>\r\n</ul>\r\n\r\n<h2>Stay Trendy with Hair Aura</h2>\r\n<p>Our collection is curated to keep you on-trend while maintaining quality and durability. Whether you\'re embracing natural textures or trying bold new styles, we have options that fit your aesthetic and lifestyle.</p>', 'https://hair-aura.debesties.com/uploads/blog-2025-trends.jpg', 'Hair Aura Team', '2025-11-29 16:00:00', 'Discover the hottest hair trends in Accra for 2025. Learn about natural textures, short bobs, highlights, glueless installs, and how to achieve these trending looks.', '2025-12-07 17:57:49', '2025-12-07 17:57:49');

-- --------------------------------------------------------

--
-- Table structure for table `drafts`
--

CREATE TABLE `drafts` (
  `id` varchar(255) NOT NULL,
  `type` enum('product','blog') NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `category` enum('wigs','bundles','closures') NOT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `colors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`colors`)),
  `seo_keywords` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`, `images`, `category`, `tags`, `colors`, `seo_keywords`, `created_at`, `updated_at`) VALUES
('1', 'Silky Straight 13x4 HD Lace Wig', 3500.00, 'Bone straight, high definition lace that melts into your skin. 100% Virgin Human Hair.', 'https://picsum.photos/id/64/800/800', '[\"https://picsum.photos/id/64/800/800\", \"https://picsum.photos/id/65/800/800\", \"https://picsum.photos/id/66/800/800\"]', 'wigs', '[\"Best Seller\", \"HD Lace\"]', '[\"Natural Black\", \"Jet Black\"]', 'straight wig, bone straight, ghana wigs, hd lace accra', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('2', 'Body Wave Bundles (3pcs)', 2200.00, 'Luxurious S-pattern waves that hold curls for days. Full cuticle aligned.', 'https://picsum.photos/id/338/800/800', '[\"https://picsum.photos/id/338/800/800\", \"https://picsum.photos/id/339/800/800\"]', 'bundles', '[\"Bundle Deal\"]', '[\"Natural Black\", \"Dark Brown\"]', 'body wave, hair bundles, virgin hair ghana', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('3', 'Deep Curly Frontal Wig', 3800.00, 'Tight, bouncy curls for a voluminous look. Minimal shedding and tangling.', 'https://picsum.photos/id/129/800/800', '[\"https://picsum.photos/id/129/800/800\", \"https://picsum.photos/id/130/800/800\"]', 'wigs', '[\"Vacation Ready\"]', '[\"Natural Black\"]', 'curly wig, deep wave, frontal wig', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('4', 'Russian Blonde 613 Bundles', 2800.00, 'Pre-bleached platinum blonde bundles. Ready to dye any color.', 'https://picsum.photos/id/22/800/800', '[\"https://picsum.photos/id/22/800/800\", \"https://picsum.photos/id/23/800/800\"]', 'bundles', '[\"613 Blonde\"]', '[\"613 Blonde\"]', 'blonde hair, 613 bundles, platinum hair accra', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('5', '5x5 Transparent Closure', 1200.00, 'Perfect for glueless installs. Thin lace for a natural hairline.', 'https://picsum.photos/id/1005/800/800', '[\"https://picsum.photos/id/1005/800/800\"]', 'closures', '[\"Beginner Friendly\"]', '[\"Natural Black\", \"Dark Brown\", \"613 Blonde\"]', 'closure, 5x5 closure, transparent lace', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('6', 'Kinky Straight Clip-ins', 1500.00, 'Matches natural blown-out 4C hair texture perfectly. Seamless blend.', 'https://picsum.photos/id/331/800/800', '[\"https://picsum.photos/id/331/800/800\"]', 'bundles', '[\"Natural Texture\"]', '[\"Natural Black\"]', 'kinky straight, clip ins, natural hair extensions', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('7', 'Raw Burmese Curly Wig', 4500.00, 'Authentic raw hair with a natural luster and coarse curly texture.', 'https://picsum.photos/id/342/800/800', '[\"https://picsum.photos/id/342/800/800\"]', 'wigs', '[\"Raw Hair\"]', '[\"Natural Black\"]', 'burmese hair, curly wig, raw hair ghana', '2025-12-07 14:35:47', '2025-12-07 14:35:47'),
('8', 'Piano Highlight Bob', 2000.00, 'Chic blunt cut bob with honey blonde highlights.', 'https://picsum.photos/id/433/800/800', '[\"https://picsum.photos/id/433/800/800\"]', 'wigs', '[\"Short Style\"]', '[\"Piano Highlight (P4/27)\"]', 'bob wig, highlighted hair, piano color', '2025-12-07 14:35:47', '2025-12-07 14:35:47');

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `phone_number` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `currency_symbol` varchar(10) DEFAULT 'GH₵',
  `color_text` varchar(7) DEFAULT '#0a0a0a',
  `color_background` varchar(7) DEFAULT '#ffffff',
  `color_accent` varchar(7) DEFAULT '#D4AF37',
  `logo` longtext DEFAULT NULL,
  `favicon` longtext DEFAULT NULL,
  `default_social_image` longtext DEFAULT NULL,
  `hero_image` text DEFAULT NULL,
  `hero_headline` varchar(255) DEFAULT NULL,
  `hero_subheadline` text DEFAULT NULL,
  `hero_cta_text` varchar(50) DEFAULT NULL,
  `about_title` varchar(255) DEFAULT 'Our Story',
  `about_content` text DEFAULT NULL,
  `contact_title` varchar(255) DEFAULT 'Get in Touch',
  `contact_content` text DEFAULT NULL,
  `maintenance_mode` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `phone_number`, `address`, `currency_symbol`, `color_text`, `color_background`, `color_accent`, `logo`, `favicon`, `default_social_image`, `hero_image`, `hero_headline`, `hero_subheadline`, `hero_cta_text`, `about_title`, `about_content`, `contact_title`, `contact_content`, `maintenance_mode`) VALUES
(1, '233508007873', 'Odumase GA West Accra, Ghana', 'GH₵', '#0a0a0a', '#ffffff', '#D4AF37', 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 500 150\'%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'serif\' font-size=\'60\' fill=\'%230a0a0a\'%3EHAIR AURA%3C/text%3E%3C/svg%3E', 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>', 'https://picsum.photos/id/325/1920/1080', 'https://picsum.photos/id/325/1920/1080', 'Unleash Your Inner Aura', 'Experience the pinnacle of luxury with our ethically sourced, cuticle-aligned hair extensions. Served exclusively in Accra.', 'Shop Now', 'Our Story', 'Hair Aura was born from a desire to bring uncompromising quality to the hair extension market. We noticed a gap between high-end promises and actual product longevity. Our mission became clear: source only the finest raw virgin hair, ensuring that every bundle, wig, and closure meets our rigorous standards of excellence.\n\nWe believe that hair is an accessory that should empower you. Whether you are looking for a professional sleek look or vacation curls, our collection is curated to enhance your natural beauty without the hassle of tangling or shedding.', 'Get in Touch', 'We operate exclusively online and via WhatsApp to ensure a personalized luxury experience for our clients in Ghana. Connect with us directly for consultations and orders.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `social_links`
--

CREATE TABLE `social_links` (
  `id` int(11) NOT NULL,
  `settings_id` int(11) NOT NULL,
  `platform` enum('TikTok','Instagram','Facebook','Twitter','YouTube','Snapchat') NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `social_links`
--

INSERT INTO `social_links` (`id`, `settings_id`, `platform`, `url`) VALUES
(1, 1, 'TikTok', 'https://www.tiktok.com/@hair_aura_official'),
(2, 1, 'Instagram', 'https://instagram.com/hair_aura_official');

-- --------------------------------------------------------

--
-- Table structure for table `uploaded_files`
--

CREATE TABLE `uploaded_files` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `original_filename` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_url` varchar(500) NOT NULL,
  `file_type` varchar(50) NOT NULL,
  `file_size` bigint(20) NOT NULL,
  `uploaded_by` varchar(255) DEFAULT NULL,
  `used_in` varchar(50) DEFAULT NULL,
  `reference_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

--
-- Dumping data for table `uploaded_files`
--

INSERT INTO `uploaded_files` (`id`, `filename`, `original_filename`, `file_path`, `file_url`, `file_type`, `file_size`, `uploaded_by`, `used_in`, `reference_id`, `created_at`) VALUES
(1, 'aura_6935b42fd9bf08.07614377.jpg', 'hair-aura-logo.jpg', '../uploads/aura_6935b42fd9bf08.07614377.jpg', 'https://hair-aura.debesties.com/uploads/aura_6935b42fd9bf08.07614377.jpg', 'image/jpeg', 12872, NULL, NULL, NULL, '2025-12-07 17:06:55'),
(2, 'aura_6935b435501fb9.08098868.jpg', 'hair-aura-logo.jpg', '../uploads/aura_6935b435501fb9.08098868.jpg', 'https://hair-aura.debesties.com/uploads/aura_6935b435501fb9.08098868.jpg', 'image/jpeg', 12872, NULL, NULL, NULL, '2025-12-07 17:07:01'),
(3, 'aura_6935bbde729a58.32438098.jpg', 'gemini-2.5-flash-image_A_diverse_group_of_african_black_american_business_professionals_networking_in_a-0.jpg', '../uploads/aura_6935bbde729a58.32438098.jpg', 'https://hair-aura.debesties.com/uploads/aura_6935bbde729a58.32438098.jpg', 'image/jpeg', 177869, NULL, NULL, NULL, '2025-12-07 17:39:42'),
(4, 'aura_6935bdf31bd837.01873847.jpg', 'hair-aura-logo.jpg', '../uploads/aura_6935bdf31bd837.01873847.jpg', 'https://hair-aura.debesties.com/uploads/aura_6935bdf31bd837.01873847.jpg', 'image/jpeg', 12872, NULL, NULL, NULL, '2025-12-07 17:48:35'),
(5, 'aura_6935c3c9b3f987.27131706.webp', 'a5d8c3327130c32a8897c3fb9b92ccfc.webp', '../uploads/aura_6935c3c9b3f987.27131706.webp', 'https://hair-aura.debesties.com/uploads/aura_6935c3c9b3f987.27131706.webp', 'image/webp', 131658, NULL, NULL, NULL, '2025-12-07 18:13:29'),
(6, 'aura_6935c5294bdf33.70074924.jpeg', 'Whisk_73c598b248cae1085d74e0cab1559691dr.jpeg', '../uploads/aura_6935c5294bdf33.70074924.jpeg', 'https://hair-aura.debesties.com/uploads/aura_6935c5294bdf33.70074924.jpeg', 'image/jpeg', 133906, NULL, NULL, NULL, '2025-12-07 18:19:21'),
(7, 'aura_6935c5f9ba3020.19833435.jpeg', 'Whisk_73c598b248cae1085d74e0cab1559691dr.jpeg', '../uploads/aura_6935c5f9ba3020.19833435.jpeg', 'https://hair-aura.debesties.com/uploads/aura_6935c5f9ba3020.19833435.jpeg', 'image/jpeg', 133906, NULL, NULL, NULL, '2025-12-07 18:22:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_blog_date` (`date`);

--
-- Indexes for table `drafts`
--
ALTER TABLE `drafts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product_category` (`category`),
  ADD KEY `idx_product_price` (`price`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_links`
--
ALTER TABLE `social_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `settings_id` (`settings_id`);

--
-- Indexes for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_file_url` (`file_url`),
  ADD KEY `idx_used_in` (`used_in`,`reference_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `social_links`
--
ALTER TABLE `social_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `uploaded_files`
--
ALTER TABLE `uploaded_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `social_links`
--
ALTER TABLE `social_links`
  ADD CONSTRAINT `social_links_ibfk_1` FOREIGN KEY (`settings_id`) REFERENCES `site_settings` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
