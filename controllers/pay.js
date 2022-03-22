const Stripe = require("stripe")(process.env.TEMP_STRIPE_PRV_KEY);
const User = require("../models/user");

exports.payUser = async (req, res, next) => {
  const uId = req.userId;
  const userSubscriptionPrice = req.body.price;
  const priceId =
    userSubscriptionPrice === 300
      ? "price_1KfhYxSFIjJ4RWp4pdvCIEGc"
      : "price_1KflKoSFIjJ4RWp4oTNiipUD";
  // return console.log(priceId);

  try {
    const sessionStripe = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          // TODO: replace this with the `price` of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: "mima",
      },
      success_url: `${process.env.LOCAL_URL_BK}/pay/success`,
      cancel_url: `${process.env.LOCAL_URL_BK}/pay/fail`,
    });
    let userUpdate = await User.findOneAndUpdate(
      { _id: uId },
      {
        paymentDetails: {
          paymentId: sessionStripe.id,
          subscriptionType: userSubscriptionPrice,
          paymentStatus: "Ongoing",
        },
      }
    );
    res.status(200).json({ url: sessionStripe.url, isError: false });
    // return console.log(checkIfAlreadyPaid, sessionStripe.url);
  } catch (e) {
    res.status(208).json({ isError: true, message: e });
  }
};

exports.successPay = (req, res) => {
  req.res.render("successpay");
};

exports.failPay = (req, res) => {
  res.render("failedpay");
};
