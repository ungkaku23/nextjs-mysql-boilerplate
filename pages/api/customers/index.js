import { pool } from "config/db";

export default async function handler(req, res) {
  let ti = setTimeout(() => {
    return res.status(500).json({ error: {
      message: "Request Timeout !. Your Vercel account must be upgraded to the PRO membership"
    } });
  }, 4500);

  switch (req.method) {
    case "GET":
      let result = await getCustomers(req, res)
      clearTimeout(ti);
      return result;
    case "POST":
      return await saveCustomer(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const getCustomers = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM customer");
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const saveCustomer = async (req, res) => {
  try {
    const { customerId, firstName, lastName, email } = req.body;

    const result = await pool.query("INSERT INTO customer SET ?", {
      customerId,
      firstName,
      lastName,
      email
    });

    return res.status(200).json({ ...req.body, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
