import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { Router, Request, Response } from "express";
import pool from "../db";
import multer from "multer";

dotenv.config();

// Ensure uploads folder exists
const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) => {
    const timestamped = `${Date.now()}-${file.originalname}`;
    cb(null, timestamped);
  },
});

const upload = multer({ storage });

const router = Router();
// const upload = multer(); // in-memory file storage

interface ProductData {
  product: string;
  marterial: string;
  color: string;
  size: string;
  comment: string;
  basePrice: number;
  commentPrice: number;
  imagePrice: number;
  totalPrice: number;
}

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

router.post(
  "/addProduct",
  upload.single("image"),
  async (req: MulterRequest, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const {
        product,
        material,
        color,
        currency,
        comment,
        basePrice,
        commentPrice,
        imagePrice,
        totalPrice,
      } = data;

      const file = req.file;

      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      if (
        !product ||
        !color ||
        !currency ||
        basePrice === undefined ||
        commentPrice === undefined ||
        imagePrice === undefined ||
        totalPrice === undefined
      ) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }

      const client = await pool.connect();

      try {
        await client.query("BEGIN");
        console.log("first");
        const productResult = await client.query(
          `INSERT INTO designed_products 
        (product, material, color, currency, comment, base_price, comment_price, image_price, total_price) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
          [
            product,
            material,
            color,
            currency,
            comment,
            basePrice,
            commentPrice,
            imagePrice,
            totalPrice,
          ]
        );

        const designedProductId = productResult.rows[0].id;
        const fileKey = `${uuidv4()}-${file.originalname}`;

        // console.log(designedProductId, fileKey);

        await client.query(
          `INSERT INTO designed_images (filename, stored_path, mimetype, size, designed_products_id)
         VALUES ($1, $2, $3, $4, $5)`,
          [file.originalname, file.path, file.mimetype, file.size, designedProductId]
        );

        await client.query("COMMIT");
        res.json({
          message: "Product and file uploaded successfully",
          key: fileKey,
        });
      } catch (err) {
        await client.query("ROLLBACK");
        console.error(err);
        res.status(500).json({ error: "Database operation failed" });
      } finally {
        client.release();
      }
    } catch (err) {
      console.error("Request processing error:", err);
      res.status(500).json({ error: "Request processing failed" });
    }
  }
);

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(
      `SELECT 
        p.*, 
        i.filename, 
        i.stored_path, 
        i.mimetype, 
        i.size, 
        i.created_at
      FROM designed_products p
      JOIN designed_images i ON p.id = i.designed_products_id
      ORDER BY p.id DESC
      LIMIT 1`
    );
    console.log("get");

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No design found' });
      return;
    }

    const data = result.rows[0];

    // Check if file exists on disk
    if (!fs.existsSync(data.stored_path)) {
      res.status(404).json({ error: 'File not found on disk' });
      return;
    }

    // Return product + file metadata (not the file itself)
    res.json({
      design: {
        id: data.id,
        product: data.product,
        material: data.material,
        color: data.color,
        currency: data.currency,
        comment: data.comment,
        basePrice: data.base_price,
        commentPrice: data.comment_price,
        imagePrice: data.image_price,
        totalPrice: data.total_price,
        createdAt: data.created_at,
      },
      file: {
        filename: data.filename,
        path: data.stored_path,
        size: data.size,
        type: data.mimetype,
        uploadedAt: data.uploaded_at,
        // downloadUrl: `/download/${data.filename}` // optional
      }
    });
  } catch (err) {
    console.error('Failed to fetch latest design:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
export default router;
