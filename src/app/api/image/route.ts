import { NextRequest, NextResponse } from "next/server";
import { decodeImageUrl } from "@/utils/imageObfuscator";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const src = url.searchParams.get("src");

  if (!src) {
    return new NextResponse("Tài nguyên bắt buộc chưa được cấp", { status: 400 });
  }

  try {
    // 1. Giải mã đoạn mã Hash sang URL thật
    const realUrl = decodeImageUrl(src);
    if (!realUrl) {
      return new NextResponse("Mã độc không hợp lệ", { status: 400 });
    }
    
    // 2. Xử lý đường dẫn tương đối (local) và tuyệt đối (external)
    let fetchUrl = realUrl;
    if (realUrl.startsWith('/')) {
      fetchUrl = `${req.nextUrl.origin}${realUrl}`;
    }

    // 3. Tiến hành kẹp gói tải từ máy chủ trung gian (Reverse Proxy Tunnelling)
    // Client hoàn toàn không biết đường link gốc tới mây Vercel/S3 là gì.
    const response = await fetch(fetchUrl);
    
    if (!response.ok) {
       return new NextResponse("Lỗi truy xuất tài nguyên bảo mật", { status: response.status });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await response.arrayBuffer();
    
    // 4. Trả Data Stream đệm mượt mà về lại Browser
    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        // Bắt buộc chặn tải chéo
        "X-Content-Type-Options": "nosniff"
      },
    });

  } catch (error) {
    console.error("Image Reverse Proxy Tunnel Error:", error);
    return new NextResponse("Cổng kết nối nội bộ tắc nghẽn", { status: 500 });
  }
}
