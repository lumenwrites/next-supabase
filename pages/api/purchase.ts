import { supabase } from "backend/supabase";
// import cookie from "cookie";

const stripe = require('stripe')(process.env.STRIPE_SECRET)

const handler = async (req, res) => {
  // AuthContext called set-supabase-cookie to save the cookie, and now I can get the user here
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) return res.status(401).send("Unauthorized")

  // On the client supabase would send along all the identifying tokens automatically,
  // But here I have to send it manually
  const token = "asd" // cookie.parse(req.headers.cookie)["sb:token"];
  supabase.auth.session = () => ({ access_token: token })

  // Fetch my own custom data from profile
  const { data: { stripe_customer } } = await supabase
    .from("profile")
    .select("stripe_customer")
    .eq("id", user.id)
    .single();


  const { priceId } = req.query;

  const lineItems = [
    {
      price: priceId,
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
  });

  res.send({
    id: session.id,
  });
};

export default handler;
