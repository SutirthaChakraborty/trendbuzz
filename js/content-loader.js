// Content Loader JavaScript for TrendBuzz website
// This file handles the automated content fetching and updating

// Configuration for content sources
const contentSources = {
    // News API - Replace with your API key when implementing
    newsAPI: {
        baseUrl: 'https://newsapi.org/v2/top-headlines',
        apiKey: 'YOUR_API_KEY_HERE', // Replace with actual API key when implementing
        categories: ['business', 'entertainment', 'health', 'science', 'sports', 'technology']
    },
    
    // RSS Feeds for different categories
    rssFeeds: {
        technology: [
            'https://techcrunch.com/feed/',
            'https://www.wired.com/feed/rss',
            'https://www.theverge.com/rss/index.xml'
        ],
        entertainment: [
            'https://variety.com/feed/',
            'https://deadline.com/feed/',
            'https://www.hollywoodreporter.com/feed/'
        ],
        health: [
            'https://www.health.com/feed/',
            'https://www.medicalnewstoday.com/newsfeeds/rss/medical_news_today.xml',
            'https://www.webmd.com/rss/news-feeds.xml'
        ],
        sports: [
            'https://www.espn.com/espn/rss/news',
            'https://sports.yahoo.com/rss/',
            'https://www.cbssports.com/rss/headlines/'
        ],
        business: [
            'https://www.forbes.com/business/feed/',
            'https://www.cnbc.com/id/10001147/device/rss/rss.html',
            'https://www.businessinsider.com/rss'
        ]
    },
    
    // Trending topics from social media
    trendingSources: {
        twitter: 'https://trends24.in/united-states/rss',
        reddit: 'https://www.reddit.com/r/popular.rss'
    }
};

// Initialize content update system
function initContentUpdater() {
    console.log('Content updater initialized');
    
    // Set up periodic content updates
    // In a real implementation, this would be handled by GitHub Actions
    // For demonstration, we'll set up a timer to simulate updates
    
    // Update content every hour (in milliseconds)
    const updateInterval = 60 * 60 * 1000; // 1 hour
    
    // Initial update
    updateAllContent();
    
    // Set interval for regular updates
    setInterval(updateAllContent, updateInterval);
    
    // Log last update time to localStorage
    localStorage.setItem('lastContentUpdate', new Date().toISOString());
}

// Update all content sections
function updateAllContent() {
    console.log('Updating all content: ' + new Date().toLocaleString());
    
    // In a real implementation, this would fetch from actual APIs
    // For demonstration, we'll use the sample data
    
    // Update featured content
    updateFeaturedContent();
    
    // Update trending content
    updateTrendingContent();
    
    // Update all category content
    contentSources.newsAPI.categories.forEach(category => {
        updateCategoryContent(category);
    });
    
    // Log update time
    localStorage.setItem('lastContentUpdate', new Date().toISOString());
    
    // Show update notification
    if (document.body) {
        showUpdateNotification();
    }
}

// Update featured content
function updateFeaturedContent() {
    console.log('Updating featured content');
    
    // In a real implementation, this would fetch from actual APIs
    // For demonstration, we'll use the sample data
    
    // Simulate API call to get trending articles
    simulateFetchTrendingArticles()
        .then(articles => {
            // Store articles in localStorage
            localStorage.setItem('featuredContent', JSON.stringify(articles));
            
            // Update UI if elements exist
            const featuredContainer = document.getElementById('featured-content');
            if (featuredContainer) {
                // Clear container
                featuredContainer.innerHTML = '';
                
                // Add articles to container
                articles.forEach(article => {
                    featuredContainer.appendChild(createContentCard(article));
                });
            }
        })
        .catch(error => {
            console.error('Error updating featured content:', error);
        });
}

// Update trending content
function updateTrendingContent() {
    console.log('Updating trending content');
    
    // In a real implementation, this would fetch from actual APIs
    // For demonstration, we'll use the sample data
    
    // Simulate API call to get trending articles
    simulateFetchTrendingTopics()
        .then(topics => {
            // Store topics in localStorage
            localStorage.setItem('trendingContent', JSON.stringify(topics));
            
            // Update UI if elements exist
            const trendingContainer = document.getElementById('trending-content');
            if (trendingContainer) {
                // Clear container
                trendingContainer.innerHTML = '';
                
                // Add topics to container
                topics.forEach(topic => {
                    trendingContainer.appendChild(createContentCard(topic));
                });
            }
        })
        .catch(error => {
            console.error('Error updating trending content:', error);
        });
}

// Update category content
function updateCategoryContent(category) {
    console.log('Updating content for category:', category);
    
    // In a real implementation, this would fetch from actual APIs
    // For demonstration, we'll use the sample data
    
    // Simulate API call to get category articles
    simulateFetchCategoryArticles(category)
        .then(articles => {
            // Store articles in localStorage
            localStorage.setItem(`categoryContent_${category}`, JSON.stringify(articles));
            
            // Update UI if category is currently selected
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab && activeTab.getAttribute('data-category') === category) {
                const categoryContainer = document.getElementById('category-content');
                if (categoryContainer) {
                    // Clear container
                    categoryContainer.innerHTML = '';
                    
                    // Add articles to container
                    articles.forEach(article => {
                        categoryContainer.appendChild(createContentCard(article));
                    });
                }
            }
        })
        .catch(error => {
            console.error(`Error updating ${category} content:`, error);
        });
}

// Show content update notification
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="update-notification-content">
            <i class="fas fa-sync-alt"></i>
            <span>Content updated with fresh trending topics!</span>
            <button class="close-notification"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Add close button functionality
    const closeButton = notification.querySelector('.close-notification');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            notification.classList.remove('show');
            
            // Remove from DOM after animation
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            
            // Remove from DOM after animation
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Simulation functions for API calls
// These would be replaced with actual API calls in a real implementation

// Simulate fetching trending articles
function simulateFetchTrendingArticles() {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            // Generate random articles
            const articles = getSampleFeaturedContent();
            resolve(articles);
        }, 500);
    });
}

// Simulate fetching trending topics
function simulateFetchTrendingTopics() {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            // Generate random topics
            const topics = getSampleTrendingContent();
            resolve(topics);
        }, 500);
    });
}

// Simulate fetching category articles
function simulateFetchCategoryArticles(category) {
    return new Promise((resolve) => {
        // Simulate API delay
        setTimeout(() => {
            // Get category content
            const articles = getSampleCategoryContent(category);
            resolve(articles);
        }, 500);
    });
}

// GitHub Actions Automation Script (for reference)
// This would be implemented as a separate workflow file in the GitHub repository
/*
name: Update Website Content

on:
  schedule:
    # Run every hour
    - cron: '0 * * * *'
  workflow_dispatch:
    # Allow manual triggering

jobs:
  update-content:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
        
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
          
      - name: Install dependencies
        run: npm install
        
      - name: Fetch latest content
        run: node scripts/fetch-content.js
        
      - name: Commit and push if content changed
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A
          git diff --quiet && git diff --staged --quiet || (git commit -m "Update content: $(date)" && git push)
*/

// Initialize content updater when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContentUpdater();
});
