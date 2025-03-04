import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);
let db;

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
    const { id } = req.query;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid blog ID format" });
    }

    if (req.method === "GET") {
      const blog = await collection.findOne({ _id: new ObjectId(id) });
      if (!blog) return res.status(404).json({ error: "Blog not found" });
      return res.status(200).json(blog);
    }

    if (req.method === "PUT") {
      const { title, content, author } = req.body;
      if (!title || !content || !author) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const updatedBlog = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { title, content, author } },
        { returnDocument: "after" }
      );

      if (!updatedBlog.value) return res.status(404).json({ error: "Blog not found" });
      return res.json({ message: "Blog updated successfully", blog: updatedBlog.value });
    }

    if (req.method === "DELETE") {
      const deletedBlog = await collection.findOneAndDelete({ _id: new ObjectId(id) });
      if (!deletedBlog.value) return res.status(404).json({ error: "Blog not found" });
      return res.json({ message: "Blog deleted successfully" });
    }

    return res.status(405).json({ error: "Method Not Allowed" });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
