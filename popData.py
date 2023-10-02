import sqlite3
import random
import string
from datetime import datetime, timedelta

# List of sample asset names
ASSET_NAMES = ["Laptop", "Desktop", "Tablet", "Printer", "Monitor", "Server", "Keyboard", "Mouse"]

# Function to generate a random serial number
def generate_serial_number(length=10):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

# Function to generate a random 13-digit string
def generate_random_13_digit():
    return ''.join(random.choices(string.digits, k=13))

# Function to generate a random human-like name
def generate_human_name():
    first_names = ["John", "Jane", "Michael", "Emma", "Daniel", "Olivia", "Emily", "David","Alex","Jim"]
    last_names = ["Smith", "Johnson", "Brown", "Davis", "Miller", "Wilson", "Taylor", "Anderson","Walker","Rider"]
    return f"{random.choice(first_names)} {random.choice(last_names)}"

# Function to generate a random user ID as 'null' or a random 13-digit string
def generate_user_id():
    return 'null' if random.random() < 0.5 else random.choice(list(UNIQUE_13_DIGIT_STRINGS))

# Function to generate a random date within the last 8 years
def generate_random_date():
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365 * 8)
    random_date = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
    return random_date.strftime("%Y-%m-%d")

# Connect to the SQLite database
conn = sqlite3.connect('test.db')
cursor = conn.cursor()

# Create the assets table if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS assets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        sn TEXT,
        userId TEXT,
        dateAdded DATE
    )
''')

# Create users table if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT,
        un TEXT UNIQUE
    )
''')

# Clear existing data from assets and users tables
cursor.execute('DELETE FROM assets')
cursor.execute('DELETE FROM users')

# Prompt the user for the number of records to add
try:
    num_records = int(input("Enter the number of records to add: "))
except ValueError:
    print("Invalid input. Please enter a valid number.")
    conn.close()
    exit()

# Generate a 13-digit string for some users
UNIQUE_13_DIGIT_STRINGS = set()  # Store unique 13-digit strings to ensure uniqueness
records = []

# Populate the users table with the specified number of records
for i in range(num_records):
    un = generate_random_13_digit()
    UNIQUE_13_DIGIT_STRINGS.add(un)  # Add the generated 13-digit string to the set
    name = generate_human_name()
    records.append((name, un))

cursor.executemany('INSERT INTO users (name, un) VALUES (?, ?)', records)

# Populate the assets table with the specified number of records
records = []
for _ in range(num_records):
    name = random.choice(ASSET_NAMES)
    sn = generate_serial_number()
    userId = generate_user_id()
    dateAdded = generate_random_date()

    # Insert the record into the assets table
    cursor.execute('''
        INSERT INTO assets (name, sn, userId, dateAdded)
        VALUES (?, ?, ?, ?)
    ''', (name, sn, userId, dateAdded))

# Commit the changes and close the connection
conn.commit()
conn.close()

print(f"{num_records} records added to the 'assets' and 'users' tables.")
