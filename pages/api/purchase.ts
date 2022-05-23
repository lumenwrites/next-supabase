import { supabase } from "backend/supabase";
// import cookie from "cookie";

// pages/api/protected-route.js
import {
  withApiAuth,
  supabaseServerClient,
  getUser
} from '@supabase/supabase-auth-helpers/nextjs';


const stripe = require('stripe')(process.env.STRIPE_SECRET)

const handler = async (req, res) => {
  // Run queries with RLS on the server
  const { user } = await getUser({ req, res })

  // Run queries with RLS on the server
  const { data: { stripe_customer } } = await supabaseServerClient({ req, res })
    .from("profile")
    .select("stripe_customer")
    .eq("id", user.id)
    .single()

  console.log('Stripe customer inside route', stripe_customer)

  return res.send({ stripe_customer })
  // const { priceId } = req.query;

  // const lineItems = [
  //   {
  //     price: priceId,
  //     quantity: 1,
  //   },
  // ];

  // const session = await stripe.checkout.sessions.create({
  //   customer: stripe_customer,
  //   mode: "subscription",
  //   payment_method_types: ["card"],
  //   line_items: lineItems,
  //   success_url: `${process.env.CLIENT_URL}/payment/success`,
  //   cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
  // });

  // res.send({
  //   id: session.id,
  // });
};

export default withApiAuth(handler);
