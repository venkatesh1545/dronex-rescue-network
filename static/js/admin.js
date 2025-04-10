
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard stats
    updateDashboardStats();
    
    // Initialize tables
    loadAlerts();
    loadRescues();
    loadVictims();
    loadSafetyLocations();
    
    // Set up form submissions
    setupAlertForm();
    setupRescueForm();
    setupVictimForm();
    setupSafetyLocationForm();
    
    // View all buttons
    document.getElementById('view-all-alerts').addEventListener('click', function() {
        document.querySelector('[data-tab="alerts"]').click();
    });
    
    document.getElementById('view-all-rescues').addEventListener('click', function() {
        document.querySelector('[data-tab="rescues"]').click();
    });
});

// Dashboard stats
function updateDashboardStats() {
    // This would typically fetch from the server
    // For now, we'll set some demo values
    fetch('/api/alerts')
        .then(response => response.json())
        .then(data => {
            document.getElementById('active-alerts-count').textContent = data.length || 0;
            updateRecentAlertsTable(data.slice(0, 5));
        });
    
    fetch('/api/rescues')
        .then(response => response.json())
        .then(data => {
            let totalRescued = 0;
            data.forEach(rescue => {
                totalRescued += parseInt(rescue.people_count || 0);
            });
            document.getElementById('rescue-count').textContent = totalRescued;
            updateRecentRescuesTable(data.slice(0, 5));
        });
    
    fetch('/api/victims')
        .then(response => response.json())
        .then(data => {
            const assistanceRequests = data.filter(victim => 
                (victim.needs && victim.needs.length > 0) || 
                victim.status === 'missing' || 
                victim.status === 'injured'
            ).length;
            document.getElementById('assistance-count').textContent = assistanceRequests;
        });
    
    fetch('/api/safety-locations')
        .then(response => response.json())
        .then(data => {
            document.getElementById('shelter-count').textContent = data.length || 0;
        });
}

// Load data for tables
function loadAlerts() {
    fetch('/api/alerts')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#active-alerts-table tbody');
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5" class="text-center">No active alerts found</td></tr>';
                return;
            }
            
            tableBody.innerHTML = '';
            data.forEach(alert => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${alert.title}</td>
                    <td>${capitalizeFirstLetter(alert.type || 'N/A')}</td>
                    <td>${(alert.locations || []).join(', ') || 'All areas'}</td>
                    <td>${formatDate(alert.created_at)}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn edit" data-id="${alert.id}"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete" data-id="${alert.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            
            // Add event listeners for action buttons
            addActionButtonListeners('active-alerts-table', 'alerts');
        });
}

function loadRescues() {
    fetch('/api/rescues')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#rescue-operations-table tbody');
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5" class="text-center">No rescue operations recorded</td></tr>';
                return;
            }
            
            tableBody.innerHTML = '';
            data.forEach(rescue => {
                const row = document.createElement('tr');
                const statusClass = getStatusClass(rescue.status);
                row.innerHTML = `
                    <td>${rescue.location}</td>
                    <td>${rescue.people_count}</td>
                    <td><span class="status-badge ${statusClass}">${capitalizeFirstLetter(rescue.status || 'Unknown')}</span></td>
                    <td>${formatDate(rescue.timestamp)}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn edit" data-id="${rescue.id}"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete" data-id="${rescue.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            
            // Add event listeners for action buttons
            addActionButtonListeners('rescue-operations-table', 'rescues');
        });
}

function loadVictims() {
    fetch('/api/victims')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#victims-table tbody');
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No victims registered</td></tr>';
                return;
            }
            
            tableBody.innerHTML = '';
            data.forEach(victim => {
                const row = document.createElement('tr');
                const statusClass = getStatusClass(victim.status);
                row.innerHTML = `
                    <td>${victim.name}</td>
                    <td>${victim.contact || 'N/A'}</td>
                    <td>${victim.location}</td>
                    <td><span class="status-badge ${statusClass}">${capitalizeFirstLetter(victim.status || 'Unknown')}</span></td>
                    <td>${(victim.needs || []).join(', ') || 'None'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn edit" data-id="${victim.id}"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete" data-id="${victim.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            
            // Add event listeners for action buttons
            addActionButtonListeners('victims-table', 'victims');
        });
}

function loadSafetyLocations() {
    fetch('/api/safety-locations')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#safety-locations-table tbody');
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No safety locations registered</td></tr>';
                return;
            }
            
            tableBody.innerHTML = '';
            data.forEach(location => {
                const occupancyPercentage = location.capacity > 0 
                    ? Math.round((location.current_occupancy / location.capacity) * 100)
                    : 0;
                    
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${location.name}</td>
                    <td>${location.address}</td>
                    <td>${location.capacity}</td>
                    <td>
                        ${location.current_occupancy} / ${location.capacity}
                        <div style="width: 100%; background-color: #e2e8f0; height: 5px; border-radius: 9999px; margin-top: 4px;">
                            <div style="width: ${occupancyPercentage}%; background-color: ${getOccupancyColor(occupancyPercentage)}; height: 5px; border-radius: 9999px;"></div>
                        </div>
                    </td>
                    <td>${(location.resources || []).join(', ') || 'None'}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn edit" data-id="${location.id}"><i class="fas fa-edit"></i></button>
                            <button class="action-btn delete" data-id="${location.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            
            // Add event listeners for action buttons
            addActionButtonListeners('safety-locations-table', 'safety-locations');
        });
}

// Update dashboard tables
function updateRecentAlertsTable(alerts) {
    const tableBody = document.querySelector('#recent-alerts-table tbody');
    if (alerts.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center">No alerts found</td></tr>';
        return;
    }
    
    tableBody.innerHTML = '';
    alerts.forEach(alert => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${alert.title}</td>
            <td>${capitalizeFirstLetter(alert.type || 'N/A')}</td>
            <td>${(alert.locations && alert.locations[0]) || 'All areas'}</td>
            <td><span class="status-badge status-active">Active</span></td>
        `;
        tableBody.appendChild(row);
    });
}

function updateRecentRescuesTable(rescues) {
    const tableBody = document.querySelector('#recent-rescues-table tbody');
    if (rescues.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center">No rescue operations found</td></tr>';
        return;
    }
    
    tableBody.innerHTML = '';
    rescues.forEach(rescue => {
        const row = document.createElement('tr');
        const statusClass = getStatusClass(rescue.status);
        row.innerHTML = `
            <td>${rescue.location}</td>
            <td>${rescue.people_count}</td>
            <td><span class="status-badge ${statusClass}">${capitalizeFirstLetter(rescue.status || 'Unknown')}</span></td>
            <td>${formatDate(rescue.timestamp)}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Form submission handlers
function setupAlertForm() {
    const form = document.getElementById('alert-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather form data
        const title = document.getElementById('alert-title').value;
        const type = document.getElementById('alert-type').value;
        const description = document.getElementById('alert-description').value;
        
        // Get selected locations
        const locationCheckboxes = document.querySelectorAll('input[name="locations[]"]:checked');
        const locations = Array.from(locationCheckboxes).map(cb => cb.value);
        
        // Prepare data for API
        const alertData = {
            title,
            type,
            description,
            locations
        };
        
        // Send to server
        fetch('/api/alerts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alertData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create alert');
            }
            return response.json();
        })
        .then(data => {
            showNotification('Alert has been sent successfully', 'success');
            form.reset();
            loadAlerts();
            updateDashboardStats();
        })
        .catch(error => {
            showNotification('Error: ' + error.message, 'error');
        });
    });
}

function setupRescueForm() {
    const form = document.getElementById('rescue-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather form data
        const location = document.getElementById('rescue-location').value;
        const peopleCount = document.getElementById('rescue-people').value;
        const status = document.getElementById('rescue-status').value;
        const notes = document.getElementById('rescue-notes').value;
        
        // Prepare data for API
        const rescueData = {
            location,
            people_count: peopleCount,
            status,
            notes
        };
        
        // Send to server
        fetch('/api/rescues', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rescueData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to record rescue operation');
            }
            return response.json();
        })
        .then(data => {
            showNotification('Rescue operation recorded successfully', 'success');
            form.reset();
            loadRescues();
            updateDashboardStats();
        })
        .catch(error => {
            showNotification('Error: ' + error.message, 'error');
        });
    });
}

function setupVictimForm() {
    const form = document.getElementById('victim-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather form data
        const name = document.getElementById('victim-name').value;
        const contact = document.getElementById('victim-contact').value;
        const location = document.getElementById('victim-location').value;
        const status = document.getElementById('victim-status').value;
        
        // Get selected needs
        const needCheckboxes = document.querySelectorAll('input[name="needs[]"]:checked');
        const needs = Array.from(needCheckboxes).map(cb => cb.value);
        
        // Prepare data for API
        const victimData = {
            name,
            contact,
            location,
            status,
            needs
        };
        
        // Send to server
        fetch('/api/victims', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(victimData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register victim');
            }
            return response.json();
        })
        .then(data => {
            showNotification('Victim registered successfully', 'success');
            form.reset();
            loadVictims();
            updateDashboardStats();
        })
        .catch(error => {
            showNotification('Error: ' + error.message, 'error');
        });
    });
}

function setupSafetyLocationForm() {
    const form = document.getElementById('safety-location-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather form data
        const name = document.getElementById('location-name').value;
        const address = document.getElementById('location-address').value;
        const capacity = document.getElementById('location-capacity').value;
        const currentOccupancy = document.getElementById('location-occupancy').value;
        const locationType = document.getElementById('location-type').value;
        
        // Get selected resources
        const resourceCheckboxes = document.querySelectorAll('input[name="resources[]"]:checked');
        const resources = Array.from(resourceCheckboxes).map(cb => cb.value);
        
        // Prepare data for API
        const locationData = {
            name,
            address,
            capacity,
            current_occupancy: currentOccupancy,
            location_type: locationType,
            resources
        };
        
        // Send to server
        fetch('/api/safety-locations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(locationData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add safety location');
            }
            return response.json();
        })
        .then(data => {
            showNotification('Safety location added successfully', 'success');
            form.reset();
            loadSafetyLocations();
            updateDashboardStats();
        })
        .catch(error => {
            showNotification('Error: ' + error.message, 'error');
        });
    });
}

// Helper functions
function addActionButtonListeners(tableId, resourceType) {
    const editButtons = document.querySelectorAll(`#${tableId} .action-btn.edit`);
    const deleteButtons = document.querySelectorAll(`#${tableId} .action-btn.delete`);
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            showNotification(`Edit functionality for ${resourceType} ID: ${id} would open a modal in production`, 'info');
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if (confirm(`Are you sure you want to delete this ${resourceType.replace('-', ' ')} record?`)) {
                showNotification(`Delete functionality for ${resourceType} ID: ${id} would remove this item in production`, 'info');
            }
        });
    });
}

function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
}

function getStatusClass(status) {
    if (!status) return '';
    return `status-${status.replace(/\s+/g, '-').toLowerCase()}`;
}

function getOccupancyColor(percentage) {
    if (percentage < 50) return '#16a34a'; // Green
    if (percentage < 75) return '#f59e0b'; // Yellow
    return '#dc2626'; // Red
}

function showNotification(message, type = 'info') {
    // Use the function from main.js
    window.showNotification(message, type);
}
