from flask import Flask, render_template, request
import stripe

app = Flask(__name__)

# Set your Stripe API key
stripe.api_key = 'your_stripe_secret_key'

@app.route('/')
def index():
    return render_template('payment.html')

@app.route('/charge', methods=['POST'])
def charge():
    try:
        # Get the amount from the form (you should securely pass this from your front-end)
        amount = int(request.form['amount'])

        # Create a payment intent with Stripe
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            description='SafeHavenYears Payment'
        )

        return render_template('charge.html', client_secret=payment_intent.client_secret)

    except stripe.error.CardError as e:
        # Handle card errors
        return str(e)

if __name__ == '__main__':
    app.run(debug=True)
