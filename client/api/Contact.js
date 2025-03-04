export default async function handler(req, res) {
    if (req.method === "POST") {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }
      console.log("Contact request received:", req.body);
      return res.status(200).json({ message: "Contact form submitted!" });
    }
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  