import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Layout } from "components/Layout";

function CustomerPage({ customer }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/customers/" + id);
      toast.success("Customer deleted");
      router.push("/");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Customer Detail</h2>
      <div className="p-6">
        <p>Customer ID: {customer.customerId}</p>
        <p>First Name: {customer.firstName}</p>
        <p>Last Name: {customer.lastName}</p>
        <p>EMail: {customer.email}</p>
      </div>

      <div className="mt-7 flex justify-center">
        <button
          className="bg-light-500 hover:shadow-xl ml-2 py-2 px-5 rounded shadow-md mb-4"
          onClick={() => router.push("/customers/")}
        >
          Add New Cusomter
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { data: customer} = await axios.get(
    "http://localhost:3000/api/customers/" + query.id
  );

  console.log(customer)

  return {
    props: {
      customer,
    },
  };
};

export default CustomerPage;
