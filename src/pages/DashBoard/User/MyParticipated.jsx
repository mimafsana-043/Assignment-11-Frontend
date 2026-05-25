import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParticipated = () => {

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
  } = useQuery({
    queryKey: ["participated", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {

      const res = await axiosSecure.get(
        `/payments/user/${user.email}`
      );

      return res.data;
    },
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">

      <h1 className="text-3xl font-bold mb-8">
        My Participated Contests
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          payments.map(payment => (

            <div
              key={payment._id}
              className="border rounded-2xl p-5"
            >

              <h3 className="text-xl font-bold">
                {payment.contestName}
              </h3>

              <p className="mt-2 text-gray-500">
                Paid: ${payment.price}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Transaction:
                {payment.transactionId}
              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default MyParticipated;