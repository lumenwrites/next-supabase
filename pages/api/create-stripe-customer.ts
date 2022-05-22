import { supabase } from 'backend/supabase'
const stripe = require('stripe')(process.env.STRIPE_SECRET)

// Create a stripe customer as soon as user registers with Supabase.
const handler = async (req, res) => {
  console.log("Yes")
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You're not authorized to call the API. Makes sure API_ROUTE_SECRET variable is set in Supabase and in .env.local variables.")
  }
  console.log("[create-stripe-customer] Supabase function hook has been called once profile has been created")
  // req.body.record is passed to us by...??
  const customer = await stripe.customers.create({
    email: req.body.record.email
  })
  console.log("[create-stripe-customer] Created stripe customer, saving his id into profile table")
  // Save stripe customer id into profile table.
  await supabase.from('profile').update({
    stripe_customer: customer.id
  }).eq('id', req.body.record.id)
  res.send({ message: `Stripe customer created: ${customer.id}` })
}

export default handler
