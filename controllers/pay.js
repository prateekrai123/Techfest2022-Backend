const Stripe = require("stripe")(process.env.TEMP_STRIPE_PRV_KEY);

exports.payUser = async (req, res, next) => {
  try {
    const sessionStripe = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          // TODO: replace this with the `price` of the product you want to sell
          price: "price_1KfhYxSFIjJ4RWp4pdvCIEGc",
          quantity: 1,
        },
      ],
      success_url: `${process.env.LOCAL_URL_BK}/pay/success`,
      cancel_url: `${process.env.LOCAL_URL_BK}/pay/fail`,
    });
    // res.redirect(sessionStripe.url);
    res.status(200).json({ url: sessionStripe.url, isError: false });
  } catch (e) {
    res.status(200).json({ isError: true, message: e });
  }
};

exports.successPay = (req, res) => {
  res.render("successpay");
};

exports.failPay = (req, res) => {
  res.render("failedpay");
};
