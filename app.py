
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
import os
import json
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'dronex_secret_key'  # Change this in production

# Mock data storage (replace with database in production)
users = {
    'user@dronex.com': {'password': 'user123', 'role': 'user'},
    'admin@dronex.com': {'password': 'admin123', 'role': 'admin'}
}

alerts = []
rescues = []
safety_locations = []
disaster_victims = []

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        if email in users and users[email]['password'] == password:
            session['user'] = email
            session['role'] = users[email]['role']
            flash('Logged in successfully!', 'success')
            
            if users[email]['role'] == 'admin':
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
        
        if email in users:
            flash('User already exists', 'error')
        else:
            users[email] = {'password': password, 'role': 'user'}
            flash('Account created successfully!', 'success')
            return redirect(url_for('login'))
    
    return render_template('signup.html')

@app.route('/logout')
def logout():
    session.pop('user', None)
    session.pop('role', None)
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
        return jsonify(alerts)

@app.route('/api/rescues', methods=['GET', 'POST'])
def api_rescues():
    if request.method == 'POST':
        if 'user' not in session or session['role'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.json
        rescues.append({
            'id': len(rescues) + 1,
            'location': data.get('location'),
            'people_count': data.get('people_count'),
            'status': data.get('status'),
            'timestamp': datetime.now().isoformat(),
            'recorded_by': session['user']
        })
        return jsonify({'success': True, 'rescue_id': len(rescues)}), 201
    else:
        return jsonify(rescues)

@app.route('/api/victims', methods=['GET', 'POST'])
def api_victims():
    if request.method == 'POST':
        if 'user' not in session or session['role'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.json
        disaster_victims.append({
            'id': len(disaster_victims) + 1,
            'name': data.get('name'),
            'contact': data.get('contact'),
            'location': data.get('location'),
            'status': data.get('status'),
            'needs': data.get('needs', []),
            'timestamp': datetime.now().isoformat(),
            'recorded_by': session['user']
        })
        return jsonify({'success': True, 'victim_id': len(disaster_victims)}), 201
    else:
        return jsonify(disaster_victims)

@app.route('/api/safety-locations', methods=['GET', 'POST'])
def api_safety_locations():
    if request.method == 'POST':
        if 'user' not in session or session['role'] != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        data = request.json
        safety_locations.append({
            'id': len(safety_locations) + 1,
            'name': data.get('name'),
            'address': data.get('address'),
            'capacity': data.get('capacity'),
            'current_occupancy': data.get('current_occupancy', 0),
            'resources': data.get('resources', []),
            'created_at': datetime.now().isoformat(),
            'created_by': session['user']
        })
        return jsonify({'success': True, 'location_id': len(safety_locations)}), 201
    else:
        return jsonify(safety_locations)

if __name__ == '__main__':
    app.run(debug=True)
