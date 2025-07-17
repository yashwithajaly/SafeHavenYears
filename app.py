from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('page.html')

@app.route('/signup', methods=['POST'])
def signup():
    email = request.form['email']
    contact = request.form['contactNo']
    username = request.form['username']
    password = request.form['password']

    # Call your Python function for signup logic here
    
    print(f"User signed up: {username}, {email}, {contact}")

    return "Signup successful! Redirecting to the next page..."

if __name__ == '_main_':
    app.run(debug=True)