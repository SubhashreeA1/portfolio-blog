import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
let db;

// Connect to MongoDB once and reuse the connection
async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("portfolio");
  }
  return db;
}

export default async function handler(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("blogs");

    if (req.method === "GET") {
      const blogs = await collection.find().sort({ createdAt: -1 }).toArray();
      return res.status(200).json(blogs);
    }

    if (req.method === "POST") {
      const { title, content, author } = req.body;
      if (!title || !content || !author) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newBlog = { title, content, author, createdAt: new Date() };
      const result = await collection.insertOne(newBlog);
      return res.status(201).json({ message: "Blog created!", blog: result.ops[0] });
    }

    return res.status(405).json({ error: "Method Not Allowed" });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
