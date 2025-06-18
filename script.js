// ArtVision AI - Main JavaScript File

class ArtVisionAI {
    constructor() {
        this.credits = this.loadCredits();
        this.generatedImages = [];
        this.isGenerating = false;
        
        this.initializeElements();
        this.bindEvents();
        this.updateCreditsDisplay();
        this.loadDarkMode();
    }

    // Initialize DOM elements
    initializeElements() {
        this.elements = {
            form: document.getElementById('image-form'),
            prompt: document.getElementById('prompt'),
            style: document.getElementById('style'),
            size: document.getElementById('size'),
            generateBtn: document.getElementById('generate-btn'),
            generateText: document.getElementById('generate-text'),
            loadingSpinner: document.getElementById('loading-spinner'),
            imagesContainer: document.getElementById('images-container'),
            imagesGrid: document.getElementById('images-grid'),
            creditsDisplay: document.getElementById('credits-display'),
            noCreditsMessage: document.getElementById('no-credits-message'),
            buyCreditsBtn: document.getElementById('buy-credits-btn'),
            buyCreditsNoCredits: document.getElementById('buy-credits-no-credits'),
            contactModal: document.getElementById('contact-modal'),
            closeModal: document.getElementById('close-modal'),
            cancelModal: document.getElementById('cancel-modal'),
            contactForm: document.getElementById('contact-form'),
            darkModeToggle: document.getElementById('dark-mode-toggle')
        };
    }

    // Bind event listeners
    bindEvents() {
        // Form submission
        this.elements.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Modal events
        this.elements.buyCreditsBtn.addEventListener('click', () => this.openContactModal());
        this.elements.buyCreditsNoCredits.addEventListener('click', () => this.openContactModal());
        this.elements.closeModal.addEventListener('click', () => this.closeContactModal());
        this.elements.cancelModal.addEventListener('click', () => this.closeContactModal());
        this.elements.contactModal.addEventListener('click', (e) => {
            if (e.target === this.elements.contactModal) {
                this.closeContactModal();
            }
        });
        
        // Contact form submission
        this.elements.contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        
        // Dark mode toggle
        this.elements.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Auto-resize textarea
        this.elements.prompt.addEventListener('input', () => this.autoResizeTextarea());
    }

    // Load credits from localStorage
    loadCredits() {
        const savedCredits = localStorage.getItem('artvision_credits');
        return savedCredits ? parseInt(savedCredits) : 10;
    }

    // Save credits to localStorage
    saveCredits() {
        localStorage.setItem('artvision_credits', this.credits.toString());
    }

    // Update credits display
    updateCreditsDisplay() {
        this.elements.creditsDisplay.textContent = this.credits;
        
        if (this.credits <= 0) {
            this.elements.noCreditsMessage.classList.remove('hidden');
            this.elements.form.classList.add('hidden');
        } else {
            this.elements.noCreditsMessage.classList.add('hidden');
            this.elements.form.classList.remove('hidden');
        }
    }

    // Handle form submission
    async handleFormSubmit(e) {
        e.preventDefault();
        
        if (this.credits <= 0) {
            this.showMessage('You have no credits remaining. Please purchase more credits.', 'error');
            return;
        }
        
        if (this.isGenerating) {
            return;
        }
        
        const prompt = this.elements.prompt.value.trim();
        const style = this.elements.style.value;
        const size = this.elements.size.value;
        
        if (!prompt) {
            this.showMessage('Please enter a description for your image.', 'error');
            return;
        }
        
        this.startGeneration();
        
        try {
            const imageData = await this.generateImage(prompt, style, size);
            this.addImageToGrid(imageData);
            this.credits--;
            this.saveCredits();
            this.updateCreditsDisplay();
            this.showMessage('Image generated successfully!', 'success');
        } catch (error) {
            console.error('Generation error:', error);
            this.showMessage('Failed to generate image. Please try again.', 'error');
        } finally {
            this.stopGeneration();
        }
    }

    // Start generation process
    startGeneration() {
        this.isGenerating = true;
        this.elements.generateBtn.disabled = true;
        this.elements.generateText.textContent = 'Generating...';
        this.elements.loadingSpinner.classList.remove('hidden');
        this.elements.generateBtn.classList.add('btn-loading');
    }

    // Stop generation process
    stopGeneration() {
        this.isGenerating = false;
        this.elements.generateBtn.disabled = false;
        this.elements.generateText.textContent = 'Generate Image';
        this.elements.loadingSpinner.classList.add('hidden');
        this.elements.generateBtn.classList.remove('btn-loading');
    }

    // Generate image (simulated AI generation)
    async generateImage(prompt, style, size) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
        
        // Generate a unique ID for the image
        const imageId = Date.now() + Math.random().toString(36).substr(2, 9);
        
        // Create a placeholder image based on the prompt and style
        const imageUrl = this.createPlaceholderImage(prompt, style, size);
        
        return {
            id: imageId,
            url: imageUrl,
            prompt: prompt,
            style: style,
            size: size,
            timestamp: new Date().toISOString()
        };
    }

    // Create placeholder image (simulates AI generation)
    createPlaceholderImage(prompt, style, size) {
        // Use a placeholder service that generates images based on text
        const encodedPrompt = encodeURIComponent(prompt);
        const [width, height] = size.split('x');
        
        // Using Picsum for placeholder images with different styles
        const styleMap = {
            'realistic': 'nature',
            'artistic': 'abstract',
            'cartoon': 'people',
            'abstract': 'abstract',
            'fantasy': 'fantasy',
            'minimalist': 'minimal'
        };
        
        const styleCategory = styleMap[style] || 'nature';
        const seed = this.hashCode(prompt);
        
        return `https://picsum.photos/${width}/${height}?random=${seed}&blur=2`;
    }

    // Simple hash function for consistent image generation
    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    // Add image to grid
    addImageToGrid(imageData) {
        this.generatedImages.unshift(imageData);
        
        const imageCard = this.createImageCard(imageData);
        this.elements.imagesGrid.insertBefore(imageCard, this.elements.imagesGrid.firstChild);
        
        this.elements.imagesContainer.classList.remove('hidden');
        
        // Add fade-in animation
        setTimeout(() => {
            imageCard.classList.add('fade-in');
        }, 100);
    }

    // Create image card element
    createImageCard(imageData) {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden image-card';
        card.innerHTML = `
            <div class="relative group">
                <img 
                    src="${imageData.url}" 
                    alt="${imageData.prompt}"
                    class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY3ZWVhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBHZW5lcmF0ZWQ8L3RleHQ+PC9zdmc+'"
                >
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <button 
                        class="download-btn bg-white text-gray-800 px-4 py-2 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        onclick="artVision.downloadImage('${imageData.url}', '${imageData.prompt}')"
                        data-tooltip="Download Image"
                    >
                        <i class="fas fa-download mr-2"></i>Download
                    </button>
                </div>
            </div>
            <div class="p-4">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span class="font-medium">Style:</span> ${imageData.style}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span class="font-medium">Size:</span> ${imageData.size}
                </p>
                <p class="text-gray-800 dark:text-gray-200 text-sm line-clamp-2" title="${imageData.prompt}">
                    ${imageData.prompt}
                </p>
            </div>
        `;
        
        return card;
    }

    // Download image
    downloadImage(imageUrl, prompt) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `artvision-${prompt.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showMessage('Image download started!', 'success');
    }

    // Open contact modal
    openContactModal() {
        this.elements.contactModal.classList.remove('hidden');
        this.elements.contactModal.classList.add('modal-enter');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            document.getElementById('contact-name').focus();
        }, 100);
    }

    // Close contact modal
    closeContactModal() {
        this.elements.contactModal.classList.add('hidden');
        this.elements.contactModal.classList.remove('modal-enter');
        document.body.style.overflow = '';
        this.elements.contactForm.reset();
    }

    // Handle contact form submission
    handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.elements.contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate sending email
        const mailtoLink = `mailto:samadus2005@gmail.com?subject=ArtVision AI - Credit Purchase Request&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        
        window.open(mailtoLink, '_blank');
        
        this.showMessage('Email client opened. Please send your message to purchase credits.', 'success');
        this.closeContactModal();
    }

    // Toggle dark mode
    toggleDarkMode() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('artvision_dark_mode', isDark ? 'dark' : 'light');
        
        // Update icon
        const moonIcon = this.elements.darkModeToggle.querySelector('.fa-moon');
        const sunIcon = this.elements.darkModeToggle.querySelector('.fa-sun');
        
        if (isDark) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }
    }

    // Load dark mode preference
    loadDarkMode() {
        const savedMode = localStorage.getItem('artvision_dark_mode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedMode === 'dark' || (!savedMode && prefersDark)) {
            document.documentElement.classList.add('dark');
            const moonIcon = this.elements.darkModeToggle.querySelector('.fa-moon');
            const sunIcon = this.elements.darkModeToggle.querySelector('.fa-sun');
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    }

    // Auto-resize textarea
    autoResizeTextarea() {
        const textarea = this.elements.prompt;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }

    // Handle keyboard shortcuts
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + Enter to generate
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (!this.elements.generateBtn.disabled) {
                this.elements.form.dispatchEvent(new Event('submit'));
            }
        }
        
        // Escape to close modal
        if (e.key === 'Escape' && !this.elements.contactModal.classList.contains('hidden')) {
            this.closeContactModal();
        }
    }

    // Show message notification
    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message-notification');
        existingMessages.forEach(msg => msg.remove());
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-notification fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg message-enter max-w-sm`;
        
        const bgColor = type === 'success' ? 'bg-green-500' : 
                       type === 'error' ? 'bg-red-500' : 'bg-blue-500';
        
        messageDiv.className += ` ${bgColor} text-white`;
        
        messageDiv.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-3"></i>
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Reset credits (for testing)
    resetCredits() {
        this.credits = 10;
        this.saveCredits();
        this.updateCreditsDisplay();
        this.showMessage('Credits reset to 10!', 'success');
    }

    // Add credits (for testing)
    addCredits(amount = 5) {
        this.credits += amount;
        this.saveCredits();
        this.updateCreditsDisplay();
        this.showMessage(`Added ${amount} credits!`, 'success');
    }
}

// Initialize the application
let artVision;

document.addEventListener('DOMContentLoaded', () => {
    artVision = new ArtVisionAI();
    
    // Add some helpful console commands for testing
    window.artVision = artVision;
    console.log('ArtVision AI initialized!');
    console.log('Available commands:');
    console.log('- artVision.resetCredits() - Reset credits to 10');
    console.log('- artVision.addCredits(5) - Add 5 credits');
});

// Service Worker for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 