I was tasked with ensuring that creating products, posts, and updating settings are properly saved to the database.

I have reviewed and corrected the following files:
- `public/api/save_product.php`
- `public/api/save_blog_post.php`
- `public/api/update_settings.php`

The main issue was a mismatch between the JSON keys in the request and the column names in the database. I have corrected these mismatches to use the correct column names.

I was in the process of testing the API endpoints to verify the fixes. However, I encountered a database connection error. The error message "No connection could be made because the target machine actively refused it" suggests that a MySQL server is not running on the local machine or the connection credentials in `public/api/db_connect.php` are incorrect.

To proceed, the user needs to:
1.  Ensure a MySQL server is running on their local machine.
2.  Verify that the database credentials in `public/api/db_connect.php` are correct for their local environment.

Once the database connection is established, the next step is to test the API endpoints using `curl` or a similar tool to confirm that the data is being saved correctly.