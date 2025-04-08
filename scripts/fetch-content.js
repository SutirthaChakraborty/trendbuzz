// Content Fetching Script for TrendBuzz
// This script fetches content from various sources and updates the website
// It's designed to be run by GitHub Actions on a schedule

const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');
const Parser = require('rss-parser');

// Promisify fs functions
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);

// Initialize RSS parser
const parser = new Parser();

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

// Main function to update all content
async function updateAllContent() {
    console.log('Starting content update: ' + new Date().toLocaleString());
    
    try {
        // Create data directory if it doesn't exist
        const dataDir = path.join(__dirname, 'data');
        await mkdir(dataDir, { recursive: true });
        
        // Fetch and update featured content
        const featuredContent = await fetchFeaturedContent();
        await saveContentToFile(featuredContent, 'featured.json');
        
        // Fetch and update trending content
        const trendingContent = await fetchTrendingContent();
        await saveContentToFile(trendingContent, 'trending.json');
        
        // Fetch and update category content
        for (const category of contentSources.newsAPI.categories) {
            const categoryContent = await fetchCategoryContent(category);
            await saveContentToFile(categoryContent, `category_${category}.json`);
        }
        
        // Update last update timestamp
        const timestamp = new Date().toISOString();
        await saveContentToFile({ lastUpdate: timestamp }, 'last_update.json');
        
        console.log('Content update completed successfully');
    } catch (error) {
        console.error('Error updating content:', error);
        process.exit(1);
    }
}

// Fetch featured content from multiple sources
async function fetchFeaturedContent() {
    console.log('Fetching featured content');
    
    try {
        // In a real implementation, this would use the News API
        // For demonstration without an API key, we'll use RSS feeds
        
        // Fetch from technology feeds (first 2 items from each feed)
        const techFeeds = contentSources.rssFeeds.technology;
        const techItems = await fetchFromRssFeeds(techFeeds, 2);
        
        // Fetch from entertainment feeds (first 2 items from each feed)
        const entertainmentFeeds = contentSources.rssFeeds.entertainment;
        const entertainmentItems = await fetchFromRssFeeds(entertainmentFeeds, 2);
        
        // Fetch from health feeds (first 2 items from each feed)
        const healthFeeds = contentSources.rssFeeds.health;
        const healthItems = await fetchFromRssFeeds(healthFeeds, 2);
        
        // Combine and format items
        const featuredItems = [...techItems, ...entertainmentItems, ...healthItems]
            .sort(() => Math.random() - 0.5) // Shuffle items
            .slice(0, 6) // Take top 6 items
            .map(formatRssItem);
        
        return featuredItems;
    } catch (error) {
        console.error('Error fetching featured content:', error);
        return [];
    }
}

// Fetch trending content from social media and news sources
async function fetchTrendingContent() {
    console.log('Fetching trending content');
    
    try {
        // In a real implementation, this would use trending APIs
        // For demonstration, we'll use Reddit's popular feed
        
        const redditFeed = contentSources.trendingSources.reddit;
        const redditItems = await fetchFromRssFeeds([redditFeed], 10);
        
        // Format and return items
        const trendingItems = redditItems
            .slice(0, 6) // Take top 6 items
            .map(item => formatRssItem(item, 'Trending'));
        
        return trendingItems;
    } catch (error) {
        console.error('Error fetching trending content:', error);
        return [];
    }
}

// Fetch category content from RSS feeds
async function fetchCategoryContent(category) {
    console.log(`Fetching ${category} content`);
    
    try {
        // Get RSS feeds for the category
        const feeds = contentSources.rssFeeds[category];
        
        if (!feeds || feeds.length === 0) {
            console.warn(`No feeds configured for category: ${category}`);
            return [];
        }
        
        // Fetch items from feeds (first 3 items from each feed)
        const items = await fetchFromRssFeeds(feeds, 3);
        
        // Format and return items
        const categoryItems = items
            .slice(0, 9) // Take top 9 items
            .map(item => formatRssItem(item, category));
        
        return categoryItems;
    } catch (error) {
        console.error(`Error fetching ${category} content:`, error);
        return [];
    }
}

// Fetch items from RSS feeds
async function fetchFromRssFeeds(feeds, itemsPerFeed = 3) {
    const allItems = [];
    
    for (const feedUrl of feeds) {
        try {
            // Parse RSS feed
            const feed = await parser.parseURL(feedUrl);
            
            // Get items from feed
            const items = feed.items.slice(0, itemsPerFeed);
            
            // Add source information
            items.forEach(item => {
                item.sourceName = feed.title || 'Unknown Source';
                item.sourceUrl = feed.link || feedUrl;
            });
            
            // Add items to result
            allItems.push(...items);
        } catch (error) {
            console.warn(`Error fetching feed ${feedUrl}:`, error.message);
        }
    }
    
    return allItems;
}

// Format RSS item to standardized content item
function formatRssItem(item, category = null) {
    // Generate excerpt from content
    let excerpt = '';
    if (item.contentSnippet) {
        excerpt = item.contentSnippet.substring(0, 120) + '...';
    } else if (item.content) {
        // Strip HTML tags and get first 120 characters
        excerpt = item.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...';
    }
    
    // Determine category
    const itemCategory = category || item.categories?.[0] || 'General';
    
    // Determine image URL
    let imageUrl = 'https://source.unsplash.com/random/600x400/?news';
    
    // Try to extract image from content
    if (item.content) {
        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch && imgMatch[1]) {
            imageUrl = imgMatch[1];
        }
    }
    
    // Calculate read time (roughly 200 words per minute)
    const contentLength = (item.content || '').replace(/<[^>]*>/g, '').length;
    const readTime = Math.max(1, Math.round(contentLength / 1000));
    
    // Format date
    const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
    const hoursAgo = Math.round((new Date() - pubDate) / (60 * 60 * 1000));
    const dateStr = hoursAgo <= 24 ? `${hoursAgo} hours ago` : pubDate.toLocaleDateString();
    
    // Create clickbait title
    const clickbaitTitle = createClickbaitTitle(item.title, itemCategory);
    
    // Return formatted item
    return {
        title: clickbaitTitle,
        originalTitle: item.title,
        excerpt: excerpt,
        link: item.link,
        image: imageUrl,
        category: itemCategory,
        date: dateStr,
        readTime: readTime,
        source: item.sourceName || 'Unknown Source',
        sourceUrl: item.sourceUrl || '#'
    };
}

// Create clickbait title from original title
function createClickbaitTitle(originalTitle, category) {
    if (!originalTitle) return 'You Won\'t Believe What Happened Next';
    
    // If title is already clickbaity, use it
    if (isClickbaity(originalTitle)) {
        return originalTitle;
    }
    
    // Extract keywords from original title
    const keywords = extractKeywords(originalTitle);
    
    // Clickbait templates by category
    const templates = {
        technology: [
            "This New Tech Innovation Will Change How You {verb}",
            "{number} Hidden Features in {keyword} That Most People Don't Know About",
            "The Dark Secret Behind {keyword} That Companies Don't Want You to Know",
            "This {keyword} Hack Will Save You Hours Every Day"
        ],
        entertainment: [
            "Celebrities Are Shocked by What {keyword} Just Revealed",
            "You Won't Believe What {keyword} Looks Like Now",
            "{number} Secrets About {keyword} That Will Leave You Speechless",
            "The {keyword} Controversy That Has Everyone Talking"
        ],
        health: [
            "Doctors Are Amazed by This Simple {keyword} Trick",
            "{number} {keyword} Mistakes You're Making Every Day",
            "This {keyword} Secret Could Add Years to Your Life",
            "The {keyword} Truth That The Health Industry Is Hiding"
        ],
        sports: [
            "This Athlete's {keyword} Strategy Is Breaking All The Rules",
            "{number} Unbelievable Moments in {keyword} History",
            "The {keyword} Scandal That's Rocking The Sports World",
            "You Won't Believe What Happened During This {keyword} Match"
        ],
        business: [
            "Millionaires Are Using This {keyword} Secret to Build Wealth",
            "{number} {keyword} Strategies That Will Double Your Income",
            "The {keyword} Mistake That's Costing You Thousands",
            "This {keyword} Trend Is Disrupting The Entire Industry"
        ],
        science: [
            "Scientists Shocked by New {keyword} Discovery",
            "{number} Mind-Blowing Facts About {keyword} You Never Learned in School",
            "This {keyword} Theory Is Changing Everything We Thought We Knew",
            "The {keyword} Mystery That Has Scientists Baffled"
        ],
        Trending: [
            "Everyone Is Talking About This {keyword} Trend",
            "{number} Reasons Why {keyword} Is Breaking The Internet",
            "This Viral {keyword} Story Is Shocking Millions",
            "You Won't Believe Why {keyword} Is Trending Right Now"
        ],
        General: [
            "You Won't Believe What Happened With {keyword}",
            "{number} Shocking Facts About {keyword}",
            "The {keyword} Secret That Will Change Everything",
            "This {keyword} Story Has Left Everyone Speechless"
        ]
    };
    
    // Get templates for category or use general templates
    const categoryTemplates = templates[category] || templates.General;
    
    // Select random template
    const template = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
    
    // Replace placeholders in template
    let clickbaitTitle = template
        .replace('{keyword}', keywords[0] || 'This')
        .replace('{number}', Math.floor(Math.random() * 15) + 5) // Random number between 5-20
        .replace('{verb}', getRandomVerb());
    
    return clickbaitTitle;
}

// Check if title is already clickbaity
function isClickbaity(title) {
    const clickbaitPhrases = [
        'you won\'t believe', 'shocking', 'amazing', 'you\'ll never guess',
        'mind-blowing', 'unbelievable', 'secret', 'trick', 'hack',
        'this is why', 'here\'s why', 'the truth about', 'what happened next',
        'will change your life', 'changed everything'
    ];
    
    const lowerTitle = title.toLowerCase();
    
    // Check for clickbait phrases
    for (const phrase of clickbaitPhrases) {
        if (lowerTitle.includes(phrase)) {
            return true;
        }
    }
    
    // Check for numbers at the beginning (e.g., "10 Ways to...")
    if (/^\d+\s+/.test(lowerTitle)) {
        return true;
    }
    
    return false;
}

// Extract keywords from title
function extractKeywords(title) {
    if (!title) return ['This'];
    
    // Remove common words and punctuation
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'as', 'of', 'is', 'are', 'was', 'were'];
    
    const words = title
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(/\s+/) // Split by whitespace
        .filter(word => word.length > 2 && !commonWords.includes(word.toLowerCase())); // Filter out common words and short words
    
    // If no keywords found, return default
    if (words.length === 0) {
        return ['This'];
    }
    
    return words;
}

// Get random verb for templates
function getRandomVerb() {
    const verbs = [
        'Work', 'Live', 'Think', 'Shop', 'Travel', 'Eat', 'Sleep', 'Exercise',
        'Save Money', 'Invest', 'Communicate', 'Learn', 'Study', 'Play', 'Relax'
    ];
    
    return verbs[Math.floor(Math.random() * verbs.length)];
}

// Save content to JSON file
async function saveContentToFile(content, filename) {
    const filePath = path.join(__dirname, 'data', filename);
    
    try {
        await writeFile(filePath, JSON.stringify(content, null, 2), 'utf8');
        console.log(`Saved content to ${filename}`);
    } catch (error) {
        console.error(`Error saving content to ${filename}:`, error);
        throw error;
    }
}

// Run the update process
updateAllContent().catch(error => {
    console.error('Content update failed:', error);
    process.exit(1);
});
