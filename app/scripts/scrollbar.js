let scrollTimeouts = new Map();
let isScrolling = false;

function hideScrollbar() {
  document.documentElement.style.setProperty('--scrollbar-thumb-color', 'transparent');
}

function showScrollbar() {
  document.documentElement.style.setProperty('--scrollbar-thumb-color', '#FFB200');
}

// Initialize scrollbar functionality
export function initScrollbar() {
  document.addEventListener('scroll', function(e) {
    if (!isScrolling) {
      isScrolling = true;
      showScrollbar();
    }
    
    // Clear the previous timeout
    clearTimeout(scrollTimeouts.get('main'));
    
    // Set a new timeout to hide the scrollbar
    const timeout = setTimeout(() => {
      isScrolling = false;
      hideScrollbar();
    }, 1500); // Hide after 1.5 seconds of no scrolling
    
    scrollTimeouts.set('main', timeout);
  }, true);

  // Handle scrollable elements within the page
  document.querySelectorAll('*').forEach(element => {
    if (element !== document.documentElement && (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth)) {
      element.addEventListener('scroll', function(e) {
        e.stopPropagation();
        
        if (!isScrolling) {
          isScrolling = true;
          showScrollbar();
        }
        
        // Clear the previous timeout
        clearTimeout(scrollTimeouts.get(element));
        
        // Set a new timeout to hide the scrollbar
        const timeout = setTimeout(() => {
          isScrolling = false;
          hideScrollbar();
        }, 1500); // Hide after 1.5 seconds of no scrolling
        
        scrollTimeouts.set(element, timeout);
      });
    }
  });
} 