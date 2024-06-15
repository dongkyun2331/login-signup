import { hashPassword } from "../../../lib/bcrypt";
import mysql from "mysql2/promise";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // 비밀번호 해싱
  const hashedPassword = await hashPassword(password);

  // 데이터베이스 연결
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    // 사용자 추가
    const [result] = await connection.execute(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ message: "User already exists" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  } finally {
    connection.end();
  }
};
