import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export function CustomerList({ customers, fetchCustomers }) {

  const [customer, setCustomer] = useState({
    customerId: 0,
    firstName: "",
    lastName: "",
    email: "",
    id: -1
  });

  const handleChange = ({ target: { name, value } }) =>
    setCustomer({ ...customer, [name]: value });
  
  const handleSubmit = async (type) => {
    try {
      if (type === 1) { // update
        await axios.put("/api/customers/" + customer.id, {
          customerId: customer.customerId,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
        });
      } else { // create
        await axios.post("/api/customers", customer);
      }
      toast.success(type === 1 ? "Customer Updated" : "Customer Saved", {
        position: "bottom-center",
      });
      resetCustomer();
      fetchCustomers();
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/customers/" + id);
      toast.success("Customer deleted");
      fetchCustomers();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleCancel = async () => {
    resetCustomer();
    fetchCustomers();
  };

  const resetCustomer = () => {
    setCustomer({
      customerId: 0,
      firstName: "",
      lastName: "",
      email: "",
      id: -1
    });
  };

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Customer ID
          </th>
          <th scope="col" className="px-6 py-3">
            First Name
          </th>
          <th scope="col" className="px-6 py-3">
            Last Name
          </th>
          <th scope="col" className="px-6 py-3">
            E-Mail
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          customers.map(c => {
            if (customer.id === c.id) {
              return (
                <tr key={c.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                      name="customerId"
                      placeholder="10.00"
                      onChange={handleChange}
                      value={customer.customerId}
                    />
                  </th>
                  <td className="px-6 py-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                      type="text"
                      placeholder="firstName"
                      id="firstName"
                      name="firstName"
                      onChange={handleChange}
                      value={customer.firstName}
                      autoComplete="off"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                      type="text"
                      placeholder="lastName"
                      id="lastName"
                      name="lastName"
                      onChange={handleChange}
                      value={customer.lastName}
                      autoComplete="off"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                      type="email"
                      placeholder="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={customer.email}
                      autoComplete="off"
                    />
                  </td>
                  <td className="px-6 py-4 flex flex-wrap justify-end">
                    <a 
                      href="#" 
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => { 
                        handleSubmit(1);
                      }}
                    >
                      Save
                    </a>&nbsp;&nbsp;
                    <Link href={`/customers/${c.id}`}> 
                      <a className="font-medium text-green-600 dark:text-green-500 hover:underline">View More</a>
                    </Link>&nbsp;&nbsp;
                    <a 
                      href="#" 
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => {
                        handleDelete(c.id);
                      }}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              )
            } else {
              if (c.id === -2) { // add new customer
                return (
                  <tr key={c.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                        name="customerId"
                        placeholder="10.00"
                        onChange={handleChange}
                        value={customer.customerId}
                      />
                    </th>
                    <td className="px-6 py-4">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                        type="text"
                        placeholder="firstName"
                        id="firstName"
                        name="firstName"
                        onChange={handleChange}
                        value={customer.firstName}
                        autoComplete="off"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                        type="text"
                        placeholder="lastName"
                        id="lastName"
                        name="lastName"
                        onChange={handleChange}
                        value={customer.lastName}
                        autoComplete="off"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                        type="email"
                        placeholder="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={customer.email}
                        autoComplete="off"
                      />
                    </td>
                    <td className="px-6 py-4 flex flex-wrap justify-end">
                      <a 
                        href="#" 
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => { 
                          handleSubmit(2);
                        }}
                      >
                        Save
                      </a>&nbsp;&nbsp;
                      <a 
                        href="#" 
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={handleCancel}
                      >
                        Cancel
                      </a>
                    </td>
                  </tr>
                )
              } else {
                return (
                  <tr key={customer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {c.customerId}
                    </th>
                    <td className="px-6 py-4">
                      {c.firstName}
                    </td>
                    <td className="px-6 py-4">
                      {c.lastName}
                    </td>
                    <td className="px-6 py-4">
                      {c.email}
                    </td>
                    <td className="px-6 py-4 flex flex-wrap justify-end">
                      <a 
                        href="#" 
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => { 
                          setCustomer(c); 
                        }}
                      >
                        Edit
                      </a>&nbsp;&nbsp;
                      <Link href={`/customers/${c.id}`}> 
                        <a className="font-medium text-green-600 dark:text-green-500 hover:underline">View More</a>
                      </Link>&nbsp;&nbsp;
                      <a 
                        href="#" 
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => {
                          handleDelete(c.id);
                        }}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                )
              }
            }
          })
        }
      </tbody>
    </table>
  );
}
