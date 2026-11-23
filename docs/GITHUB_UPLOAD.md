# Upload this project to GitHub

## Browser upload

1. Extract the ZIP to a normal folder.
2. Create or select the intended GitHub repository in your account.
3. Use the repository's file-upload option and add the extracted project files and folders.
4. Keep `index.html` at the repository root, with `books/` beside it. Do not upload only the ZIP or an unnecessary extra wrapper directory.
5. Enter a clear commit message and save the upload.
6. Check that README renders, the screenshot appears, and all twenty `books/*.txt` files exist.

Suggested repository name: `kindle-book-review-system`.

Suggested description: A book reading and rating website built with HTML, CSS, JavaScript, and Supabase, featuring genre filters, wishlists, saved reading progress, and reader-based recommendations.

## Git option

Run these commands from inside the extracted project folder after creating an empty remote repository. Replace the remote URL with your actual repository URL before running it.

```sh
git init
git add .
git commit -m "Add Kindle reading and rating project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kindle-book-review-system.git
git push -u origin main
```

For an existing repository, inspect its current branch/history and remotes first. This package does not require force-pushing or deleting existing content.

## Before publishing

The included Supabase key is the existing browser publishable key, not an administrative credential. Use your own project configuration for an independent installation. Keep database passwords, service-role/admin keys, account exports, and `.env` files out of version control. Read the included SQL and security notes before configuring the backend. Uploading to GitHub alone does not run SQL or configure authentication.
