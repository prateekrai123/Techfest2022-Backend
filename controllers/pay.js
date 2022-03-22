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
      success_url: `${process.env.LOCAL_URL_BK}/pay/success/?uId=${uId}`,
      cancel_url: `${process.env.LOCAL_URL_BK}/pay/fail/?uId=${uId}`,
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

exports.successPay = async (req, res) => {
  const uId = req.query.uId;
  const getPaymentId = await User.findById({ _id: uId });
  const checkIfPaid = await Stripe.checkout.sessions.retrieve(
    getPaymentId.paymentDetails.paymentId
  );
  if (!checkIfPaid) {
    return res.send("Some Error Accured");
  }

  if (checkIfPaid.payment_status != "unpaid") {
    // User.findByIdAndUpdate(
    //  customer_details
    //   {
    //     _id: uId,
    //   },
    //   {
    //     $set: { hasPaidEntry: true },
    //   },
    //   {
    //     new: true,
    //     useFindAndModify: false,
    //   },
    //   {
    //     paymentDetails: {
    //       paymentStatus: "Paid",
    //     },
    //   },
    //   (err, user) => {
    //     if (err) {
    //       console.log(err);
    //       return res.status(208).json({
    //         error: "You are not authorized to update this user",
    //       });
    //     }
    //     res.render("successpay");
    //   }
    // );

    let userUpdate = await User.findOneAndUpdate(
      { _id: uId },
      {
        paymentDetails: {
          paymentStatus: checkIfPaid.payment_status,
          isSuccess: true,
          paymentId: checkIfPaid.id,
          paymentIntent: checkIfPaid.payment_intent,
          subscriptionType: getPaymentId.paymentDetails.subscriptionType,
          payUserDetail: checkIfPaid.customer_details,
        },
      }
    );
  }
  res.render("successpay");
};

exports.failPay = (req, res) => {
  res.render("failedpay");
};
