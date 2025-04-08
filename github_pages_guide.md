# GitHub Pages Hosting Guide

This guide provides detailed instructions for hosting your TrendBuzz clickbait website for free using GitHub Pages.

## Table of Contents
1. [GitHub Repository Setup](#github-repository-setup)
2. [GitHub Pages Configuration](#github-pages-configuration)
3. [Custom Domain Setup (Optional)](#custom-domain-setup-optional)
4. [GitHub Actions for Automated Updates](#github-actions-for-automated-updates)
5. [Troubleshooting](#troubleshooting)

## GitHub Repository Setup

### Step 1: Create a GitHub Account
If you don't already have a GitHub account:
1. Go to [GitHub](https://github.com/)
2. Click "Sign up"
3. Follow the registration process

### Step 2: Create a New Repository
1. Log in to your GitHub account
2. Click the "+" icon in the top-right corner
3. Select "New repository"
4. Name your repository `trendbuzz` (or any name you prefer)
5. Make sure it's set to "Public" (required for free GitHub Pages)
6. Check "Add a README file"
7. Click "Create repository"

### Step 3: Upload Your Website Files
There are two ways to upload your files:

#### Option 1: Using GitHub Web Interface
1. Navigate to your repository
2. Click "Add file" > "Upload files"
3. Drag and drop all your website files and folders
4. Add a commit message like "Initial website upload"
5. Click "Commit changes"

#### Option 2: Using Git Command Line (Recommended)
1. Install Git on your computer if you haven't already
2. Open a terminal/command prompt
3. Navigate to your website directory:
   ```bash
   cd /path/to/clickbait-website
   ```
4. Initialize Git repository:
   ```bash
   git init
   ```
5. Add your GitHub repository as remote:
   ```bash
   git remote add origin https://github.com/yourusername/trendbuzz.git
   ```
6. Add all files:
   ```bash
   git add .
   ```
7. Commit the files:
   ```bash
   git commit -m "Initial website upload"
   ```
8. Push to GitHub:
   ```bash
   git push -u origin main
   ```

## GitHub Pages Configuration

### Step 1: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait a few minutes for your site to be published

### Step 2: Verify Your Site
1. After enabling GitHub Pages, GitHub will provide a URL like:
   ```
   https://yourusername.github.io/trendbuzz/
   ```
2. Visit this URL to verify your site is working correctly

### Step 3: Update Site Configuration
Make sure all your internal links and references use relative paths:
- Instead of `/css/styles.css`, use `css/styles.css`
- Instead of `/js/main.js`, use `js/main.js`
- Instead of `/images/logo.png`, use `images/logo.png`

## Custom Domain Setup (Optional)

### Step 1: Purchase a Domain
1. Choose a domain registrar (Namecheap, GoDaddy, Google Domains, etc.)
2. Purchase a domain name that relates to your content (e.g., trendbuzz.com)

### Step 2: Configure DNS Settings
1. Go to your domain registrar's DNS settings
2. Add these records:
   - Type: A, Host: @, Value: 185.199.108.153
   - Type: A, Host: @, Value: 185.199.109.153
   - Type: A, Host: @, Value: 185.199.110.153
   - Type: A, Host: @, Value: 185.199.111.153
   - Type: CNAME, Host: www, Value: yourusername.github.io

### Step 3: Configure GitHub Pages for Custom Domain
1. Go to your repository settings
2. Scroll to the "GitHub Pages" section
3. Enter your domain in the "Custom domain" field
4. Click "Save"
5. Check "Enforce HTTPS" (after DNS propagation completes)

## GitHub Actions for Automated Updates

The GitHub Actions workflow you've already created (`.github/workflows/update-content.yml`) will automatically run every hour to update your website content.

### Verify Workflow Setup
1. Go to your repository
2. Click the "Actions" tab
3. You should see your workflow listed
4. Click on it to see details and run history

### Manual Trigger
To manually trigger a content update:
1. Go to your repository
2. Click the "Actions" tab
3. Select your workflow
4. Click "Run workflow"
5. Click the green "Run workflow" button

## Troubleshooting

### Site Not Publishing
If your site isn't publishing:
1. Check that your repository is public
2. Ensure the main branch is selected as the source
3. Verify that you have an index.html file in the root directory
4. Check the Actions tab for any workflow errors

### Custom Domain Not Working
If your custom domain isn't working:
1. Verify DNS settings are correct
2. DNS changes can take up to 48 hours to propagate
3. Ensure the CNAME file exists in your repository
4. Check for any typos in your domain name

### Content Not Updating
If automated content updates aren't working:
1. Check the Actions tab for any workflow errors
2. Verify that your API keys are correct
3. Ensure the workflow file is properly formatted
4. Check that the fetch-content.js script is working correctly

## Maintenance Tips

1. **Regular Backups**: Periodically download a copy of your repository
2. **Monitor GitHub Actions**: Check the Actions tab regularly for any failures
3. **Update Dependencies**: Keep Node.js packages updated for security
4. **Check Analytics**: Monitor your site's performance and adjust strategies accordingly

By following this guide, your TrendBuzz clickbait website will be hosted for free on GitHub Pages with automated content updates running every hour, providing you with a completely free hosting solution for your passive income project.
