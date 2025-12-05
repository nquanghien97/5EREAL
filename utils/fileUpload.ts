import { unlink, mkdir } from "fs/promises";
import fs from "fs";
import path from "path";
import { fileTypeFromBuffer } from "file-type";
import sanitize from "sanitize-filename";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Upload 1 hoặc nhiều file (AN TOÀN)
 */
export async function uploadFile(files: File[], folderPath: string) {
  const uploadDir = path.join(process.cwd(), "images", folderPath);

  await mkdir(uploadDir, { recursive: true });

  const results = await Promise.all(
    files.map(async (file) => {
      // Đọc buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // 🔒 1) Kiểm tra dung lượng an toàn
      if (buffer.length > MAX_SIZE) {
        throw new Error("File quá lớn (tối đa 5MB)");
      }

      // 🔒 2) Kiểm tra magic bytes (MIME thật)
      const fileType = await fileTypeFromBuffer(buffer);
      if (!fileType || !ALLOWED_MIME.includes(fileType.mime)) {
        throw new Error("File không phải ảnh hợp lệ");
      }

      // 🔒 3) Kiểm tra EXT thật
      const realExt = "." + fileType.ext.toLowerCase();
      if (!ALLOWED_EXT.includes(realExt)) {
        throw new Error("Định dạng ảnh không hỗ trợ");
      }

      // 🔒 4) Sanitize tên file
      let cleanName = sanitize(file.name.replace(/\0/g, ""));
      cleanName = cleanName.replace(/[^a-zA-Z0-9._-]/g, "_");

      // 🔒 5) Chống double-extension
      if (/\.[a-z0-9]+?\./i.test(cleanName)) {
        throw new Error("Tên file không hợp lệ");
      }

      // 🔒 6) Tạo tên file an toàn + random
      const filename = `${Date.now()}_${uuidv4()}${realExt}`;
      const filePath = path.join(uploadDir, filename);

      // 🔒 7) Re-encode ảnh (rất quan trọng để xoá payload EXIF)
      const sharpImg = sharp(buffer);

      if (realExt === ".jpg" || realExt === ".jpeg") {
        await sharpImg.jpeg({ quality: 90 }).toFile(filePath);
      } else if (realExt === ".png") {
        await sharpImg.png().toFile(filePath);
      } else if (realExt === ".webp") {
        await sharpImg.webp({ quality: 90 }).toFile(filePath);
      }

      // 🔒 8) Set quyền file an toàn (không thực thi)
      try {
        fs.chmodSync(filePath, 0o644);
      } catch (e) {
        console.log("Chmod failed:", e);
      }

      return {
        filename,
        url: `/images/${folderPath}/${filename}`,
        mimeType: fileType.mime,
      };
    })
  );

  return results;
}

/**
 * Xóa file an toàn
 */
export async function deleteFile(relativePath: string) {
  const filePath = path.join(process.cwd(), relativePath);

  try {
    await unlink(filePath);
  } catch (err) {
    if ((err as { code?: string }).code === "ENOENT") {
      console.warn("⚠️ File không tồn tại:", relativePath);
    } else {
      console.error("❌ Lỗi xoá file:", err);
    }
  }
}
