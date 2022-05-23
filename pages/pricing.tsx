export default function pricing() {
  return <div>pricing</div>
}

const stripe = require('stripe')(process.env.STRIPE_SECRET)

export async function getServerSideProps() {
  const { data: prices } = await stripe.prices.list()
  const { id, name } = await stripe.products.retrieve(prices[0].product)
  console.log('prices', id, name, prices[0].unit_amount, prices[0].currency)
  return { props: {} }
}
