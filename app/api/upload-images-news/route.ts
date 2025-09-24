import { getUserFromCookie } from "@/lib/getUserFromCookie";
import { deleteFile, uploadFile } from "@/utils/fileUpload";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let filenames: string[] = [];
  try {
    const user = await getUserFromCookie();
    const userId = user?.userId;
    const role = user?.role;
    if (!userId || !role || role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Bạn không có quyền thực hiện hành động này' },
        { status: 403 }
      );
    }
    const formData = await req.formData();
    const files = Array.from(formData.values()).filter((value): value is File => value instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ message: "Không file nào được chọn" }, { status: 400 });
    }
    filenames = await uploadFile(files, "news");
    return NextResponse.json({ message: 'upload thành công', url: `/images/news/${filenames[0]}` }, { status: 200 })
  } catch (err) {
    if (filenames.length > 0) {
      await Promise.all(filenames.map((filename) => deleteFile(`/images/news/${filename}`)));
    }
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 })
    } else {
      return NextResponse.json({ message: "Có lỗi xảy ra" }, { status: 500 })
    }
  }
}