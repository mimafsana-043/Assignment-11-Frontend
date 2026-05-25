import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [clientSecret, setClientSecret] = useState("");

  const { data: contest = {} } = useQuery({
    queryKey: ["payment-contest", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/contests/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (contest.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: contest.price })
        .then(res => setClientSecret(res.data.clientSecret));
    }
  }, [contest.price, axiosSecure]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      return Swal.fire("Error", error.message, "error");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user.email,
            name: user.displayName,
          },
        },
      });

    if (confirmError) {
      return Swal.fire("Error", confirmError.message, "error");
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        contestId: id,
        contestName: contest.name,
        userEmail: user.email,
        userName: user.displayName,
        price: contest.price,
        transactionId: paymentIntent.id,
      };

      axiosSecure.post("/payments", paymentInfo).then(res => {
        if (res.data.insertedId) {
          Swal.fire("Success", "Payment successful", "success");
          navigate(`/contest/${id}`);
        }
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Payment</h1>
        <p className="text-gray-500 mb-6">
          Register for: {contest.name}
        </p>

        <div className="mb-6 p-4 rounded-xl bg-indigo-50">
          <p className="font-bold text-indigo-600">
            Pay: ${contest.price}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="border rounded-xl p-4 mb-6">
            <CardElement />
          </div>

          <button
            disabled={!stripe || !clientSecret}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:bg-gray-400"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;