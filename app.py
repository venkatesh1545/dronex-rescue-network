
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
import os
import json
from datetime import datetime
import pymysql

app = Flask(__name__)
app.secret_key = 'dronex_secret_key'  # Change this in production

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # Update with your MySQL password
    'database': 'dronex_db',
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

# Database connection function
def get_db_connection():
    try:
        connection = pymysql.connect(**DB_CONFIG)
        return connection
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# Initialize database tables if they don't exist
def init_db():
    try:
        connection = get_db_connection()
        if connection:
            with connection.cursor() as cursor:
                # Create users table
                cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(50) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                ''')
                
                # Create contacts table
                cursor.execute('''
                CREATE TABLE IF NOT EXISTS contacts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT,
                    name VARCHAR(255) NOT NULL,
                    phone VARCHAR(50),
                    email VARCHAR(255),
                    relationship VARCHAR(100),
                    is_emergency BOOLEAN DEFAULT FALSE,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )
                ''')
                
                # Create alerts table
                cursor.execute('''
                CREATE TABLE IF NOT EXISTS alerts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    locations TEXT,
                    type VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    created_by VARCHAR(255)
                )
                ''')
                
                # Create rescues table
                cursor.execute('''
                CREATE TABLE IF NOT EXISTS rescues (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    location VARCHAR(255),
                    people_count INT,
                    status VARCHAR(100),
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    recorded_by VARCHAR(255)
                )
                ''')
                
                # Create safety_locations table
                cursor.execute('''
                CREATE TABLE IF NOT EXISTS safety_locations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    address TEXT,
                    capacity INT,
                    current_occupancy INT DEFAULT 0,
                    resources TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    created_by VARCHAR(255)
                )
                ''')
                
                # Create disaster_victims table
                cursor.execute('''
                CREATE TABLE IF NOT EXISTS disaster_victims (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255),
                    contact VARCHAR(255),
                    location TEXT,
                    status VARCHAR(100),
                    needs TEXT,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    recorded_by VARCHAR(255)
                )
                ''')
                
                # Commit changes
                connection.commit()
            connection.close()
            print("Database tables initialized successfully")
    except Exception as e:
        print(f"Database initialization error: {e}")

# Mock data for users (will be migrated to DB later)
mock_users = {
    'user@dronex.com': {'password': 'user123', 'role': 'user'},
    'admin@dronex.com': {'password': 'admin123', 'role': 'admin'}
}

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        connection = get_db_connection()
        if connection:
            try:
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                    user = cursor.fetchone()
                    
                    if user and user['password'] == password:  # In production, use proper password hashing
                        session['user'] = email
                        session['user_id'] = user['id']
                        session['role'] = user['role']
                        flash('Logged in successfully!', 'success')
                        
                        if user['role'] == 'admin':
                            return redirect(url_for('admin'))
                        else:
                            return redirect(url_for('dashboard'))
                    else:
                        # Fall back to mock users if not found in DB (for development only)
                        if email in mock_users and mock_users[email]['password'] == password:
                            session['user'] = email
                            session['role'] = mock_users[email]['role']
                            flash('Logged in successfully (from mock data)!', 'success')
                            
                            if mock_users[email]['role'] == 'admin':
                                return redirect(url_for('admin'))
                            else:
                                return redirect(url_for('dashboard'))
                        else:
                            flash('Invalid email or password', 'error')
            finally:
                connection.close()
        else:
            # If DB connection fails, use mock users
            if email in mock_users and mock_users[email]['password'] == password:
                session['user'] = email
                session['role'] = mock_users[email]['role']
                flash('Logged in successfully (from mock data)!', 'success')
                
                if mock_users[email]['role'] == 'admin':
                    return redirect(url_for('admin'))
                else:
                    return redirect(url_for('dashboard'))
            else:
                flash('Invalid email or password', 'error')
    
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        first_name = request.form.get('first_name', '')
        last_name = request.form.get('last_name', '')
        phone = request.form.get('phone', '')
        
        connection = get_db_connection()
        if connection:
            try:
                with connection.cursor() as cursor:
                    # Check if user already exists
                    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                    existing_user = cursor.fetchone()
                    
                    if existing_user:
                        flash('User already exists', 'error')
                    else:
                        # Create new user
                        cursor.execute(
                            "INSERT INTO users (email, password, role) VALUES (%s, %s, %s)",
                            (email, password, 'user')  # In production, hash the password
                        )
                        connection.commit()
                        
                        # Get the new user's ID
                        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
                        user_id = cursor.fetchone()['id']
                        
                        # Add emergency contact if phone provided
                        if phone:
                            cursor.execute(
                                "INSERT INTO contacts (user_id, name, phone, is_emergency) VALUES (%s, %s, %s, %s)",
                                (user_id, f"{first_name} {last_name}", phone, True)
                            )
                            connection.commit()
                        
                        flash('Account created successfully!', 'success')
                        return redirect(url_for('login'))
            except Exception as e:
                flash(f'Error creating account: {str(e)}', 'error')
            finally:
                connection.close()
        else:
            # If DB connection fails, fall back to mock data (for development only)
            if email in mock_users:
                flash('User already exists (mock data)', 'error')
            else:
                mock_users[email] = {'password': password, 'role': 'user'}
                flash('Account created successfully (mock data)!', 'success')
                return redirect(url_for('login'))
    
    return render_template('signup.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    session.pop('role', None)
    session.pop('user_id', None)
    flash('Logged out successfully', 'success')
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        flash('Please log in to access the dashboard', 'error')
        return redirect(url_for('login'))
    
    if session['role'] == 'admin':
        return redirect(url_for('admin'))
    
    return render_template('dashboard.html')

@app.route('/admin')
def admin():
    if 'user' not in session or session['role'] != 'admin':
        flash('Unauthorized access', 'error')
        return redirect(url_for('login'))
    
    return render_template('admin.html')

@app.route('/safety')
def safety():
    return render_template('safety.html')

@app.route('/alerts')
def alerts_page():
    return render_template('alerts.html')

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')

@app.route('/contacts')
def contacts():
    if 'user' not in session:
        flash('Please log in to access your contacts', 'error')
        return redirect(url_for('login'))
    
    user_id = session.get('user_id')
    contacts_list = []
    
    if user_id:
        connection = get_db_connection()
        if connection:
            try:
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM contacts WHERE user_id = %s", (user_id,))
                    contacts_list = cursor.fetchall()
            finally:
                connection.close()
    
    return render_template('contacts.html', contacts=contacts_list)

@app.route('/profile')
def profile():
    if 'user' not in session:
        flash('Please log in to access your profile', 'error')
        return redirect(url_for('login'))
    
    return render_template('profile.html')

# API Routes
@app.route('/api/alerts', methods=['GET', 'POST'])
def api_alerts():
    if request.method == 'POST':
        if 'user' not in session or session['role'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.json
        connection = get_db_connection()
        if connection:
            try:
                with connection.cursor() as cursor:
                    cursor.execute(
                        "INSERT INTO alerts (title, description, locations, type, created_by) VALUES (%s, %s, %s, %s, %s)",
                        (
                            data.get('title'),
                            data.get('description'),
                            json.dumps(data.get('locations', [])),
                            data.get('type'),
                            session['user']
                        )
                    )
                    connection.commit()
                    cursor.execute("SELECT LAST_INSERT_ID()")
                    alert_id = cursor.fetchone()['LAST_INSERT_ID()']
                    return jsonify({'success': True, 'alert_id': alert_id}), 201
            finally:
                connection.close()
        else:
            # Fall back to mock data
            alerts = []  # Mock alerts list
            alerts.append({
                'id': len(alerts) + 1,
                'title': data.get('title'),
                'description': data.get('description'),
                'locations': data.get('locations', []),
                'type': data.get('type'),
                'created_at': datetime.now().isoformat(),
                'created_by': session['user']
            })
            return jsonify({'success': True, 'alert_id': len(alerts)}), 201
    else:
        connection = get_db_connection()
        if connection:
            try:
                with connection.cursor() as cursor:
                    cursor.execute("SELECT * FROM alerts ORDER BY created_at DESC")
                    alerts = cursor.fetchall()
                    # Process JSON fields
                    for alert in alerts:
                        if isinstance(alert['locations'], str):
                            alert['locations'] = json.loads(alert['locations'])
                    return jsonify(alerts)
            finally:
                connection.close()
        else:
            # Fall back to mock data
            return jsonify([])  # Return empty list

@app.route('/api/contacts', methods=['GET', 'POST'])
def api_contacts():
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 403
    
    user_id = session.get('user_id')
    
    if request.method == 'POST':
        name = request.form.get('name')
        phone = request.form.get('phone')
        email = request.form.get('email', '')
        relationship = request.form.get('relationship', '')
        is_emergency = True if request.form.get('is_emergency') else False
        
        connection = get_db_connection()
        if connection:
            try:
                with connection.cursor() as cursor:
                    cursor.execute(
                        "INSERT INTO contacts (user_id, name, phone, email, relationship, is_emergency) VALUES (%s, %s, %s, %s, %s, %s)",
                        (
                            user_id,
                            name,
                            phone,
                            email,
                            relationship,
                            is_emergency
                        )
                    )
                    connection.commit()
                    flash('Contact added successfully!', 'success')
            except Exception as e:
                flash(f'Error adding contact: {e}', 'error')
            finally:
                connection.close()
        else:
            flash('Failed to connect to database', 'error')
        
        return redirect(url_for('contacts'))
    else:
        if user_id:
            connection = get_db_connection()
            if connection:
                try:
                    with connection.cursor() as cursor:
                        cursor.execute("SELECT * FROM contacts WHERE user_id = %s", (user_id,))
                        contacts = cursor.fetchall()
                        return jsonify(contacts)
                finally:
                    connection.close()
        return jsonify([])

@app.route('/api/contacts/<int:contact_id>', methods=['POST'])
def update_contact(contact_id):
    if 'user' not in session:
        flash('Please log in to manage contacts', 'error')
        return redirect(url_for('login'))
    
    user_id = session.get('user_id')
    connection = get_db_connection()
    
    if not connection:
        flash('Database connection failed', 'error')
        return redirect(url_for('contacts'))
    
    try:
        with connection.cursor() as cursor:
            # Verify the contact belongs to the user
            cursor.execute("SELECT * FROM contacts WHERE id = %s AND user_id = %s", (contact_id, user_id))
            contact = cursor.fetchone()
            
            if not contact:
                flash('Contact not found or unauthorized', 'error')
                return redirect(url_for('contacts'))
            
            name = request.form.get('name')
            phone = request.form.get('phone')
            email = request.form.get('email', '')
            relationship = request.form.get('relationship', '')
            is_emergency = True if request.form.get('is_emergency') else False
            
            cursor.execute(
                "UPDATE contacts SET name = %s, phone = %s, email = %s, relationship = %s, is_emergency = %s WHERE id = %s",
                (
                    name,
                    phone,
                    email,
                    relationship,
                    is_emergency,
                    contact_id
                )
            )
            connection.commit()
            flash('Contact updated successfully!', 'success')
    except Exception as e:
        flash(f'Error updating contact: {e}', 'error')
    finally:
        connection.close()
    
    return redirect(url_for('contacts'))

@app.route('/api/contacts/<int:contact_id>/delete', methods=['POST'])
def delete_contact(contact_id):
    if 'user' not in session:
        flash('Please log in to manage contacts', 'error')
        return redirect(url_for('login'))
    
    user_id = session.get('user_id')
    connection = get_db_connection()
    
    if not connection:
        flash('Database connection failed', 'error')
        return redirect(url_for('contacts'))
    
    try:
        with connection.cursor() as cursor:
            # Verify the contact belongs to the user
            cursor.execute("SELECT * FROM contacts WHERE id = %s AND user_id = %s", (contact_id, user_id))
            contact = cursor.fetchone()
            
            if not contact:
                flash('Contact not found or unauthorized', 'error')
                return redirect(url_for('contacts'))
            
            cursor.execute("DELETE FROM contacts WHERE id = %s", (contact_id,))
            connection.commit()
            flash('Contact deleted successfully!', 'success')
    except Exception as e:
        flash(f'Error deleting contact: {e}', 'error')
    finally:
        connection.close()
    
    return redirect(url_for('contacts'))

# Main execution
if __name__ == '__main__':
    init_db()  # Initialize database tables
    app.run(debug=True)
