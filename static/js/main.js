
// Toggle mobile menu for responsive design
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Contact form modal handling
    const addContactBtn = document.getElementById('add-contact-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeModal = document.querySelector('.modal-close');
    
    if (addContactBtn && contactModal) {
        addContactBtn.addEventListener('click', function() {
            contactModal.style.display = 'block';
        });
    }
    
    if (closeModal && contactModal) {
        closeModal.addEventListener('click', function() {
            contactModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === contactModal) {
                contactModal.style.display = 'none';
            }
        });
    }
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            
            if (!nameInput.value.trim()) {
                event.preventDefault();
                alert('Name is required');
                return;
            }
            
            if (!phoneInput.value.trim()) {
                event.preventDefault();
                alert('Phone number is required');
                return;
            }
        });
    }
    
    // Edit contact handling
    const editButtons = document.querySelectorAll('.edit-contact');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactId = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const phone = this.getAttribute('data-phone');
            const email = this.getAttribute('data-email');
            const relationship = this.getAttribute('data-relationship');
            const isEmergency = this.getAttribute('data-emergency') === 'True';
            
            // Populate form
            document.getElementById('contact-id').value = contactId;
            document.getElementById('name').value = name || '';
            document.getElementById('phone').value = phone || '';
            document.getElementById('email').value = email || '';
            document.getElementById('relationship').value = relationship || '';
            document.getElementById('is_emergency').checked = isEmergency;
            
            // Update form action and button text
            document.getElementById('contact-form').action = `/api/contacts/${contactId}`;
            document.getElementById('form-submit-btn').textContent = 'Update Contact';
            document.getElementById('contact-modal-title').textContent = 'Edit Contact';
            
            // Show modal
            contactModal.style.display = 'block';
        });
    });
    
    // Delete contact handling
    const deleteButtons = document.querySelectorAll('.delete-contact');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactId = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            
            if (confirm(`Are you sure you want to delete ${name}?`)) {
                // Create and submit a form to delete the contact
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = `/api/contacts/${contactId}/delete`;
                document.body.appendChild(form);
                form.submit();
            }
        });
    });
    
    // Flash message auto-dismiss
    const flashMessages = document.querySelectorAll('.alert');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                message.style.display = 'none';
            }, 500);
        }, 5000);
    });
});
