// Content Integration Script for TrendBuzz
// This script integrates the fetched content into the website
// It loads the JSON data files and updates the HTML content

document.addEventListener('DOMContentLoaded', function() {
    // Initialize content integration
    initContentIntegration();
});

// Initialize content integration
async function initContentIntegration() {
    console.log('Initializing content integration');
    
    try {
        // Load last update time
        const lastUpdate = await loadJsonData('last_update.json');
        updateLastUpdateTime(lastUpdate);
        
        // Load and display featured content
        const featuredContent = await loadJsonData('featured.json');
        displayFeaturedContent(featuredContent);
        
        // Load and display trending content
        const trendingContent = await loadJsonData('trending.json');
        displayTrendingContent(trendingContent);
        
        // Load default category content (technology)
        const defaultCategory = 'technology';
        const categoryContent = await loadJsonData(`category_${defaultCategory}.json`);
        displayCategoryContent(categoryContent);
        
        // Set up category tab event listeners
        setupCategoryTabs();
        
        console.log('Content integration completed');
    } catch (error) {
        console.error('Error initializing content:', error);
        // Fall back to sample data if loading fails
        loadSampleData();
    }
}

// Load JSON data from file
async function loadJsonData(filename) {
    try {
        const response = await fetch(`data/${filename}`);
        if (!response.ok) {
            throw new Error(`Failed to load ${filename}: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.warn(`Error loading ${filename}:`, error);
        throw error;
    }
}

// Update last update time display
function updateLastUpdateTime(lastUpdate) {
    if (!lastUpdate || !lastUpdate.lastUpdate) return;
    
    const lastUpdateElement = document.getElementById('last-update-time');
    if (lastUpdateElement) {
        const updateDate = new Date(lastUpdate.lastUpdate);
        lastUpdateElement.textContent = `Last updated: ${updateDate.toLocaleString()}`;
    }
}

// Display featured content
function displayFeaturedContent(content) {
    const featuredContainer = document.getElementById('featured-content');
    if (!featuredContainer) return;
    
    // Clear container
    featuredContainer.innerHTML = '';
    
    // Check if content is available
    if (!content || content.length === 0) {
        featuredContainer.innerHTML = '<div class="content-placeholder">No featured content available</div>';
        return;
    }
    
    // Add content cards
    content.forEach(item => {
        featuredContainer.appendChild(createContentCard(item));
    });
}

// Display trending content
function displayTrendingContent(content) {
    const trendingContainer = document.getElementById('trending-content');
    if (!trendingContainer) return;
    
    // Clear container
    trendingContainer.innerHTML = '';
    
    // Check if content is available
    if (!content || content.length === 0) {
        trendingContainer.innerHTML = '<div class="content-placeholder">No trending content available</div>';
        return;
    }
    
    // Add content cards
    content.forEach(item => {
        trendingContainer.appendChild(createContentCard(item));
    });
}

// Display category content
function displayCategoryContent(content) {
    const categoryContainer = document.getElementById('category-content');
    if (!categoryContainer) return;
    
    // Clear container
    categoryContainer.innerHTML = '';
    
    // Check if content is available
    if (!content || content.length === 0) {
        categoryContainer.innerHTML = '<div class="content-placeholder">No content available for this category</div>';
        return;
    }
    
    // Add content cards
    content.forEach(item => {
        categoryContainer.appendChild(createContentCard(item));
    });
}

// Set up category tab event listeners
function setupCategoryTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', async function() {
            // Get category
            const category = this.getAttribute('data-category');
            
            // Update active tab
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            try {
                // Show loading state
                const categoryContainer = document.getElementById('category-content');
                if (categoryContainer) {
                    categoryContainer.innerHTML = '<div class="content-placeholder">Loading content...</div>';
                }
                
                // Load category content
                const categoryContent = await loadJsonData(`category_${category}.json`);
                
                // Display category content
                displayCategoryContent(categoryContent);
            } catch (error) {
                console.error(`Error loading ${category} content:`, error);
                
                // Fall back to sample data
                const sampleContent = getSampleCategoryContent(category);
                displayCategoryContent(sampleContent);
            }
        });
    });
}

// Create content card element
function createContentCard(item) {
    const card = document.createElement('div');
    card.className = 'content-card';
    
    const cardHtml = `
        <div class="card-image" style="background-image: url('${item.image}')"></div>
        <div class="card-content">
            <span class="card-category">${item.category}</span>
            <h3 class="card-title">${item.title}</h3>
            <p class="card-excerpt">${item.excerpt}</p>
            <div class="card-meta">
                <span>${item.date}</span>
                <span>${item.readTime} min read</span>
            </div>
        </div>
    `;
    
    card.innerHTML = cardHtml;
    
    // Add click event to the card
    card.addEventListener('click', function() {
        // In a real implementation, this would navigate to the article page
        // For demonstration, we'll open the source link in a new tab
        if (item.link) {
            window.open(item.link, '_blank');
        }
    });
    
    return card;
}

// Load sample data if JSON files are not available
function loadSampleData() {
    console.log('Loading sample data');
    
    // Display sample featured content
    const featuredContent = getSampleFeaturedContent();
    displayFeaturedContent(featuredContent);
    
    // Display sample trending content
    const trendingContent = getSampleTrendingContent();
    displayTrendingContent(trendingContent);
    
    // Display sample category content
    const defaultCategory = 'technology';
    const categoryContent = getSampleCategoryContent(defaultCategory);
    displayCategoryContent(categoryContent);
}

// Sample data functions (same as in main.js)
function getSampleFeaturedContent() {
    return [
        {
            title: "10 Shocking Facts About Space That Scientists Don't Want You to Know",
            excerpt: "The universe is full of mysteries, but these revelations will change how you see the cosmos forever.",
            image: "https://source.unsplash.com/random/600x400/?space",
            category: "Science",
            date: "2 hours ago",
            readTime: 5
        },
        {
            title: "This New Diet Trend Has Celebrities Losing Weight Overnight",
            excerpt: "Hollywood's best-kept secret is finally revealed, and it's simpler than you might think.",
            image: "https://source.unsplash.com/random/600x400/?food",
            category: "Health",
            date: "4 hours ago",
            readTime: 4
        },
        {
            title: "The Hidden Feature in Your Phone That Could Be Spying on You",
            excerpt: "Your smartphone might be collecting more data than you realize. Here's what you need to know.",
            image: "https://source.unsplash.com/random/600x400/?phone",
            category: "Technology",
            date: "6 hours ago",
            readTime: 6
        }
    ];
}

function getSampleTrendingContent() {
    return [
        {
            title: "You Won't Believe What This Child Prodigy Did at Just 5 Years Old",
            excerpt: "A young genius is taking the world by storm with abilities that defy explanation.",
            image: "https://source.unsplash.com/random/600x400/?child",
            category: "Entertainment",
            date: "1 hour ago",
            readTime: 3
        },
        {
            title: "Forgotten Treasure Worth Millions Found in Abandoned House",
            excerpt: "A routine home inspection led to the discovery of a lifetime that has historians excited.",
            image: "https://source.unsplash.com/random/600x400/?treasure",
            category: "News",
            date: "3 hours ago",
            readTime: 4
        },
        {
            title: "The Simple Morning Habit That Could Double Your Productivity",
            excerpt: "Successful people swear by this easy routine that takes just 5 minutes of your day.",
            image: "https://source.unsplash.com/random/600x400/?morning",
            category: "Lifestyle",
            date: "5 hours ago",
            readTime: 7
        }
    ];
}

function getSampleCategoryContent(category) {
    const allContent = {
        technology: [
            {
                title: "This New Gadget Promises to Revolutionize How We Work",
                excerpt: "Tech innovators have created a device that could make traditional offices obsolete.",
                image: "https://source.unsplash.com/random/600x400/?gadget",
                category: "Technology",
                date: "2 hours ago",
                readTime: 5
            },
            {
                title: "Hidden iPhone Feature That 90% of Users Don't Know About",
                excerpt: "Your Apple device has capabilities that even long-time users haven't discovered.",
                image: "https://source.unsplash.com/random/600x400/?iphone",
                category: "Technology",
                date: "5 hours ago",
                readTime: 4
            },
            {
                title: "The Dark Side of AI: What Tech Companies Aren't Telling You",
                excerpt: "As artificial intelligence advances, experts warn of concerning developments.",
                image: "https://source.unsplash.com/random/600x400/?ai",
                category: "Technology",
                date: "8 hours ago",
                readTime: 6
            }
        ],
        entertainment: [
            {
                title: "Celebrity Couple Shocks Fans With Surprise Announcement",
                excerpt: "Hollywood's favorite pair just revealed news that no one saw coming.",
                image: "https://source.unsplash.com/random/600x400/?celebrity",
                category: "Entertainment",
                date: "1 hour ago",
                readTime: 3
            },
            {
                title: "This Canceled Show Is Making a Comeback After Massive Fan Campaign",
                excerpt: "Devoted viewers have achieved the impossible by bringing back their favorite series.",
                image: "https://source.unsplash.com/random/600x400/?tv",
                category: "Entertainment",
                date: "4 hours ago",
                readTime: 4
            },
            {
                title: "Behind-the-Scenes Drama That Almost Ruined a Blockbuster Movie",
                excerpt: "New revelations show how close this hit film came to never being released.",
                image: "https://source.unsplash.com/random/600x400/?movie",
                category: "Entertainment",
                date: "7 hours ago",
                readTime: 5
            }
        ],
        health: [
            {
                title: "The Superfood in Your Kitchen That Could Add Years to Your Life",
                excerpt: "Researchers have found surprising benefits in this common household ingredient.",
                image: "https://source.unsplash.com/random/600x400/?food",
                category: "Health",
                date: "2 hours ago",
                readTime: 4
            },
            {
                title: "Doctor Reveals: The 30-Second Test That Predicts Heart Problems",
                excerpt: "A simple at-home check could give you crucial information about your health.",
                image: "https://source.unsplash.com/random/600x400/?heart",
                category: "Health",
                date: "5 hours ago",
                readTime: 5
            },
            {
                title: "The Exercise Mistake That's Actually Aging You Faster",
                excerpt: "Your workout routine might be doing more harm than good, according to new studies.",
                image: "https://source.unsplash.com/random/600x400/?exercise",
                category: "Health",
                date: "9 hours ago",
                readTime: 6
            }
        ],
        sports: [
            {
                title: "Underdog Team's Miracle Victory Has Fans in Disbelief",
                excerpt: "Nobody gave them a chance, but they pulled off one of the greatest upsets in sports history.",
                image: "https://source.unsplash.com/random/600x400/?sports",
                category: "Sports",
                date: "3 hours ago",
                readTime: 4
            },
            {
                title: "Star Athlete's Secret Training Method Finally Revealed",
                excerpt: "The unconventional technique behind this champion's success is surprisingly simple.",
                image: "https://source.unsplash.com/random/600x400/?training",
                category: "Sports",
                date: "6 hours ago",
                readTime: 5
            },
            {
                title: "The Controversial Decision That Could Change This Sport Forever",
                excerpt: "Officials have announced a rule change that has players and fans divided.",
                image: "https://source.unsplash.com/random/600x400/?referee",
                category: "Sports",
                date: "9 hours ago",
                readTime: 4
            }
        ],
        business: [
            {
                title: "Millionaire Reveals: How I Made My Fortune Starting With Just $100",
                excerpt: "This self-made success story shares the unconventional strategy anyone can use.",
                image: "https://source.unsplash.com/random/600x400/?money",
                category: "Business",
                date: "2 hours ago",
                readTime: 6
            },
            {
                title: "Major Company on the Verge of Collapse After Shocking Revelation",
                excerpt: "Industry giant faces uncertain future as new information comes to light.",
                image: "https://source.unsplash.com/random/600x400/?business",
                category: "Business",
                date: "5 hours ago",
                readTime: 4
            },
            {
                title: "The Side Hustle That's Making Regular People Thousands Each Month",
                excerpt: "This overlooked opportunity requires minimal time and no special skills.",
                image: "https://source.unsplash.com/random/600x400/?hustle",
                category: "Business",
                date: "8 hours ago",
                readTime: 5
            }
        ]
    };
    
    return allContent[category] || [];
}
