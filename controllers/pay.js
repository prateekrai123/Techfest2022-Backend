const Stripe = require("stripe")(process.env.TEMP_STRIPE_PRV_KEY);

exports.payUser = async (req, res, next) => {
  try {
    const sessionStripe = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      user_paid_id: "mahi",
      success_url: `${process.env.LOCAL_URL_BK}/pay/success`,
      cancel_url: `${process.env.LOCAL_URL_BK}/pay/fail`,
    });
    console.log(sessionStripe.url);
    res.status(200).json({ url: sessionStripe.url, isError: false });
  } catch (e) {
    res.status(500).json({ isError: true, message: "False" });
  }
  console.log("here");
};

exports.successPay = (req, res) => {
  res.render("successpay");
};

exports.failPay = (req, res) => {
  res.render("failedpay");
};
