// lib/file.ts
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";

/**
 * Upload 1 hoặc nhiều file
 * @param files Danh sách File object (FormData)
 * @param folderPath Thư mục con trong /images, ví dụ: "projects" hoặc "news"
 * @returns Danh sách { filename, url, mimeType }
 */
export async function uploadFile(files: File[], folderPath: string) {
  const uploadDir = path.join(process.cwd(), "images", folderPath);

  // 🔹 Tạo thư mục nếu chưa có
  await mkdir(uploadDir, { recursive: true });

  const results = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      // Làm sạch tên file
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filename = `${Date.now()}_${cleanName}`;
      const filePath = path.join(uploadDir, filename);

      await writeFile(filePath, buffer);

      // URL public (tùy cách bạn serve static)
      const url = `/images/${folderPath}/${filename}`;

      return {
        filename,
        url,
        mimeType: file.type,
      };
    })
  );

  return results;
}

/**
 * Xóa file khỏi hệ thống
 * @param relativePath Đường dẫn tương đối từ project root, ví dụ: "images/news/abc.jpg"
 */
export async function deleteFile(relativePath: string) {
  const filePath = path.join(process.cwd(), relativePath);

  try {
    await unlink(filePath);
  } catch (err) {
    if (err === "ENOENT") {
      console.warn("⚠️ File not found:", relativePath);
    } else {
      console.error("❌ Error deleting file:", err);
    }
  }
}
