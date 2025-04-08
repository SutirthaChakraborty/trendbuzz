// Main JavaScript file for TrendBuzz website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initWebsite();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Category tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category from data attribute
            const category = this.getAttribute('data-category');
            
            // Load content for selected category
            loadCategoryContent(category);
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                // Store email in localStorage for demonstration
                saveSubscriber(email);
                
                // Show success message
                showNotification('Thanks for subscribing! Check your email for confirmation.', 'success');
                
                // Reset form
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Initialize category navigation
    const categoryLinks = document.querySelectorAll('[data-category]');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-category');
            
            // Update active tab
            tabButtons.forEach(btn => {
                if (btn.getAttribute('data-category') === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            // Load content for selected category
            loadCategoryContent(category);
            
            // Scroll to category section
            document.querySelector('.category-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Initialize website
function initWebsite() {
    // Load featured content
    loadFeaturedContent();
    
    // Load trending content
    loadTrendingContent();
    
    // Load default category (technology)
    loadCategoryContent('technology');
}

// Load featured content
function loadFeaturedContent() {
    const featuredContainer = document.getElementById('featured-content');
    
    if (!featuredContainer) return;
    
    // Clear placeholder
    featuredContainer.innerHTML = '';
    
    // In a real implementation, this would fetch data from an API
    // For now, we'll use sample data
    const featuredContent = getSampleFeaturedContent();
    
    featuredContent.forEach(item => {
        featuredContainer.appendChild(createContentCard(item));
    });
}

// Load trending content
function loadTrendingContent() {
    const trendingContainer = document.getElementById('trending-content');
    
    if (!trendingContainer) return;
    
    // Clear placeholder
    trendingContainer.innerHTML = '';
    
    // In a real implementation, this would fetch data from an API
    // For now, we'll use sample data
    const trendingContent = getSampleTrendingContent();
    
    trendingContent.forEach(item => {
        trendingContainer.appendChild(createContentCard(item));
    });
}

// Load category content
function loadCategoryContent(category) {
    const categoryContainer = document.getElementById('category-content');
    
    if (!categoryContainer) return;
    
    // Clear placeholder
    categoryContainer.innerHTML = '';
    
    // Show loading state
    categoryContainer.innerHTML = '<div class="content-placeholder">Loading ' + category + ' content...</div>';
    
    // Simulate API call delay
    setTimeout(() => {
        // Clear loading state
        categoryContainer.innerHTML = '';
        
        // In a real implementation, this would fetch data from an API
        // For now, we'll use sample data filtered by category
        const categoryContent = getSampleCategoryContent(category);
        
        if (categoryContent.length === 0) {
            categoryContainer.innerHTML = '<div class="content-placeholder">No content found for ' + category + '</div>';
            return;
        }
        
        categoryContent.forEach(item => {
            categoryContainer.appendChild(createContentCard(item));
        });
    }, 500);
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
        // For now, we'll just show a notification
        showNotification('Article clicked: ' + item.title, 'info');
    });
    
    return card;
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        
        // Remove from DOM after animation
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Save subscriber to localStorage
function saveSubscriber(email) {
    let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    subscribers.push({
        email: email,
        date: new Date().toISOString()
    });
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
}

// Sample data functions
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
