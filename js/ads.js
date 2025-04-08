// Ads management JavaScript for TrendBuzz website
// This file handles ad placement, loading, and optimization

// Ad configuration
const adConfig = {
    // Google AdSense configuration
    adsense: {
        // Replace with your actual AdSense publisher ID when implementing
        publisherId: 'ca-pub-XXXXXXXXXXXXXXXX',
        // Ad units for different placements
        adUnits: {
            top: {
                slotId: 'XXXXXXXXXX',
                format: 'auto'
            },
            middle: {
                slotId: 'XXXXXXXXXX',
                format: 'auto'
            },
            bottom: {
                slotId: 'XXXXXXXXXX',
                format: 'auto'
            },
            sidebar: {
                slotId: 'XXXXXXXXXX',
                format: 'auto'
            },
            inContent: {
                slotId: 'XXXXXXXXXX',
                format: 'auto'
            }
        }
    },
    
    // Affiliate marketing configuration
    affiliates: {
        // Amazon Associates
        amazon: {
            trackingId: 'yourtag-20', // Replace with your actual tracking ID
            products: {
                technology: [
                    {
                        title: 'Latest Smartphone',
                        description: 'The newest smartphone with amazing features',
                        imageUrl: 'https://via.placeholder.com/300x200?text=Smartphone',
                        link: 'https://amazon.com/dp/BXXXXXXXXX?tag=yourtag-20'
                    },
                    {
                        title: 'Wireless Earbuds',
                        description: 'Premium wireless earbuds with noise cancellation',
                        imageUrl: 'https://via.placeholder.com/300x200?text=Earbuds',
                        link: 'https://amazon.com/dp/BXXXXXXXXX?tag=yourtag-20'
                    }
                ],
                health: [
                    {
                        title: 'Fitness Tracker',
                        description: 'Track your health metrics with this advanced device',
                        imageUrl: 'https://via.placeholder.com/300x200?text=Fitness+Tracker',
                        link: 'https://amazon.com/dp/BXXXXXXXXX?tag=yourtag-20'
                    },
                    {
                        title: 'Vitamin Supplements',
                        description: 'Premium quality vitamins for daily health',
                        imageUrl: 'https://via.placeholder.com/300x200?text=Vitamins',
                        link: 'https://amazon.com/dp/BXXXXXXXXX?tag=yourtag-20'
                    }
                ],
                // Add more categories as needed
            }
        },
        // Other affiliate networks can be added here
    }
};

// Initialize ads when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAds();
});

// Initialize all ad systems
function initAds() {
    console.log('Initializing ad systems');
    
    // Load Google AdSense
    loadAdSense();
    
    // Initialize affiliate links
    initAffiliateLinks();
    
    // Set up in-content ad insertion
    setupInContentAds();
    
    // Initialize ad rotation for better performance
    initAdRotation();
}

// Load Google AdSense script
function loadAdSense() {
    console.log('Loading Google AdSense');
    
    // In a real implementation, this would load the actual AdSense script
    // For demonstration, we'll use placeholder ads
    
    // Replace ad placeholders with AdSense code
    replaceAdPlaceholders();
    
    // In a real implementation, you would add the AdSense script like this:
    /*
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    adScript.setAttribute('data-ad-client', adConfig.adsense.publisherId);
    document.head.appendChild(adScript);
    */
}

// Replace ad placeholders with AdSense code
function replaceAdPlaceholders() {
    // Get all ad placeholders
    const adPlaceholders = {
        top: document.getElementById('ad-top'),
        middle: document.getElementById('ad-middle'),
        bottom: document.getElementById('ad-bottom')
    };
    
    // Replace each placeholder with AdSense code
    for (const [position, element] of Object.entries(adPlaceholders)) {
        if (element) {
            // In a real implementation, this would be actual AdSense code
            // For demonstration, we'll use a styled placeholder
            
            element.innerHTML = `
                <div class="ad-unit" data-position="${position}">
                    <div class="ad-content">
                        <div class="ad-header">Sponsored Content</div>
                        <div class="ad-body">
                            <img src="https://via.placeholder.com/728x90?text=Advertisement+${position}" alt="Advertisement" class="ad-image">
                        </div>
                        <div class="ad-footer">
                            <a href="#" class="ad-link" onclick="trackAdClick('${position}')">Learn More</a>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize affiliate links
function initAffiliateLinks() {
    console.log('Initializing affiliate links');
    
    // In a real implementation, this would dynamically insert affiliate links
    // based on the content category and context
    
    // For demonstration, we'll add a function to insert affiliate products
    // This would be called when loading category content
    
    // Listen for category changes to update affiliate products
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            insertAffiliateProducts(category);
        });
    });
    
    // Insert affiliate products for the default category (technology)
    insertAffiliateProducts('technology');
}

// Insert affiliate products for a specific category
function insertAffiliateProducts(category) {
    // Check if category has affiliate products
    if (!adConfig.affiliates.amazon.products[category]) {
        return;
    }
    
    // Get products for the category
    const products = adConfig.affiliates.amazon.products[category];
    
    // Create affiliate product section if it doesn't exist
    let affiliateSection = document.querySelector('.affiliate-products');
    
    if (!affiliateSection) {
        // Create new section
        affiliateSection = document.createElement('section');
        affiliateSection.className = 'affiliate-products';
        
        // Add section title
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = 'Recommended Products';
        affiliateSection.appendChild(sectionTitle);
        
        // Create products container
        const productsContainer = document.createElement('div');
        productsContainer.className = 'affiliate-products-container';
        affiliateSection.appendChild(productsContainer);
        
        // Insert after category section
        const categorySection = document.querySelector('.category-section');
        if (categorySection) {
            categorySection.parentNode.insertBefore(affiliateSection, categorySection.nextSibling);
        }
    }
    
    // Get products container
    const productsContainer = affiliateSection.querySelector('.affiliate-products-container');
    
    // Clear existing products
    productsContainer.innerHTML = '';
    
    // Add products
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'affiliate-product';
        
        productElement.innerHTML = `
            <a href="${product.link}" target="_blank" rel="noopener" class="affiliate-product-link" onclick="trackAffiliateClick('${category}', '${product.title}')">
                <div class="affiliate-product-image">
                    <img src="${product.imageUrl}" alt="${product.title}">
                </div>
                <div class="affiliate-product-content">
                    <h3 class="affiliate-product-title">${product.title}</h3>
                    <p class="affiliate-product-description">${product.description}</p>
                    <span class="affiliate-product-cta">Check Price</span>
                </div>
            </a>
        `;
        
        productsContainer.appendChild(productElement);
    });
}

// Set up in-content ad insertion
function setupInContentAds() {
    console.log('Setting up in-content ads');
    
    // In a real implementation, this would insert ads within content
    // For demonstration, we'll add a function to insert ads after a certain number of paragraphs
    
    // This would be called when loading article content
    // For now, we'll just define the function
}

// Insert in-content ad after specified paragraphs
function insertInContentAd(contentElement, paragraphInterval = 3) {
    // Get all paragraphs
    const paragraphs = contentElement.querySelectorAll('p');
    
    // Insert ad after every few paragraphs
    for (let i = paragraphInterval; i < paragraphs.length; i += paragraphInterval + 1) {
        // Create ad element
        const adElement = document.createElement('div');
        adElement.className = 'in-content-ad';
        
        // In a real implementation, this would be actual AdSense code
        // For demonstration, we'll use a styled placeholder
        
        adElement.innerHTML = `
            <div class="ad-unit" data-position="in-content">
                <div class="ad-content">
                    <div class="ad-header">Sponsored Content</div>
                    <div class="ad-body">
                        <img src="https://via.placeholder.com/468x60?text=In-Content+Ad" alt="Advertisement" class="ad-image">
                    </div>
                    <div class="ad-footer">
                        <a href="#" class="ad-link" onclick="trackAdClick('in-content')">Learn More</a>
                    </div>
                </div>
            </div>
        `;
        
        // Insert ad after paragraph
        paragraphs[i].parentNode.insertBefore(adElement, paragraphs[i].nextSibling);
        
        // Increment i to account for the inserted ad
        i++;
    }
}

// Initialize ad rotation for better performance
function initAdRotation() {
    console.log('Initializing ad rotation');
    
    // In a real implementation, this would rotate ads periodically
    // For demonstration, we'll set up a timer to simulate rotation
    
    // Rotate ads every 5 minutes
    setInterval(rotateAds, 5 * 60 * 1000);
}

// Rotate ads to improve performance
function rotateAds() {
    console.log('Rotating ads: ' + new Date().toLocaleString());
    
    // In a real implementation, this would refresh ad units
    // For demonstration, we'll just log the rotation
    
    // Get all ad units
    const adUnits = document.querySelectorAll('.ad-unit');
    
    // Add rotation animation
    adUnits.forEach(unit => {
        unit.classList.add('rotating');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            unit.classList.remove('rotating');
        }, 1000);
    });
}

// Track ad clicks for analytics
function trackAdClick(position) {
    console.log('Ad clicked:', position);
    
    // In a real implementation, this would send analytics data
    // For demonstration, we'll just log the click
    
    // Prevent default link behavior for demonstration
    event.preventDefault();
    
    // Show notification
    showNotification('Ad clicked: ' + position, 'info');
}

// Track affiliate clicks for analytics
function trackAffiliateClick(category, product) {
    console.log('Affiliate product clicked:', category, product);
    
    // In a real implementation, this would send analytics data
    // For demonstration, we'll just log the click
}

// Add CSS for ads
const adStyles = `
.ad-unit {
    border: 1px solid #eee;
    border-radius: 4px;
    overflow: hidden;
    background-color: #fff;
    transition: transform 0.3s ease;
}

.ad-unit:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.ad-header {
    padding: 5px 10px;
    background-color: #f5f5f5;
    font-size: 0.8rem;
    color: #999;
    text-align: center;
}

.ad-body {
    padding: 10px;
    text-align: center;
}

.ad-image {
    max-width: 100%;
    height: auto;
}

.ad-footer {
    padding: 5px 10px;
    text-align: center;
}

.ad-link {
    display: inline-block;
    padding: 5px 15px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 3px;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
}

.ad-link:hover {
    background-color: #ff5252;
    color: white;
}

.ad-unit.rotating {
    animation: adRotate 1s ease;
}

@keyframes adRotate {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}

.affiliate-products {
    padding: 40px 0;
    background-color: var(--light-color);
}

.affiliate-products-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
}

.affiliate-product {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.affiliate-product:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.affiliate-product-link {
    display: block;
    color: var(--text-color);
}

.affiliate-product-image {
    height: 200px;
    overflow: hidden;
}

.affiliate-product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.affiliate-product:hover .affiliate-product-image img {
    transform: scale(1.05);
}

.affiliate-product-content {
    padding: 20px;
}

.affiliate-product-title {
    font-size: 1.3rem;
    margin-bottom: 10px;
    line-height: 1.3;
}

.affiliate-product-description {
    color: #666;
    margin-bottom: 15px;
    font-size: 0.95rem;
}

.affiliate-product-cta {
    display: inline-block;
    padding: 5px 15px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 3px;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
}

.affiliate-product:hover .affiliate-product-cta {
    background-color: #ff5252;
}

.in-content-ad {
    margin: 20px 0;
}

.update-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    padding: 15px;
    z-index: 1000;
    transform: translateY(100px);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.update-notification.show {
    transform: translateY(0);
    opacity: 1;
}

.update-notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.update-notification i {
    color: var(--primary-color);
}

.close-notification {
    background: none;
    border: none;
    cursor: pointer;
    color: #999;
    margin-left: 10px;
}

.close-notification:hover {
    color: var(--primary-color);
}

.notification {
    position: fixed;
    bottom: 20px;
    left: 20px;
    padding: 15px 20px;
    border-radius: 4px;
    color: white;
    z-index: 1000;
    transform: translateY(100px);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.notification.show {
    transform: translateY(0);
    opacity: 1;
}

.notification.info {
    background-color: var(--link-color);
}

.notification.success {
    background-color: var(--success-color);
}

.notification.error {
    background-color: var(--danger-color);
}
`;

// Add ad styles to document
document.addEventListener('DOMContentLoaded', function() {
    const styleElement = document.createElement('style');
    styleElement.textContent = adStyles;
    document.head.appendChild(styleElement);
});
