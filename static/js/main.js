
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Toggle icon between bars and X
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Flash message close buttons
    const closeButtons = document.querySelectorAll('.close-flash');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const flashMessage = this.parentElement;
            flashMessage.style.opacity = '0';
            setTimeout(() => {
                flashMessage.remove();
            }, 300);
        });
    });
    
    // Auto-dismiss flash messages after 5 seconds
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 5000);
    });
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Get the target content ID from the data attribute
                const target = button.getAttribute('data-tab');
                
                // Remove active class from all tabs and content
                document.querySelectorAll('.tab').forEach(tab => {
                    tab.classList.remove('active');
                });
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked tab and corresponding content
                button.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
        
        // Activate the first tab by default
        tabButtons[0].click();
    }
});

// Generic form submission handler with fetch API
function submitForm(formId, url, successCallback, errorCallback) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (successCallback) successCallback(data);
        })
        .catch(error => {
            if (errorCallback) errorCallback(error);
        });
    });
}

// Show a notification
function showNotification(message, type = 'info') {
    const notifications = document.createElement('div');
    notifications.className = 'flash-messages';
    if (!document.querySelector('.flash-messages')) {
        document.body.appendChild(notifications);
    }
    
    const notification = document.createElement('div');
    notification.className = `flash-message ${type}`;
    notification.innerHTML = message + '<button class="close-flash"><i class="fas fa-times"></i></button>';
    
    document.querySelector('.flash-messages').appendChild(notification);
    
    // Add close event
    notification.querySelector('.close-flash').addEventListener('click', function() {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto dismiss
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}
