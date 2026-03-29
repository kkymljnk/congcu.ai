export function encodeImageUrl(realUrl: string): string {
  if (!realUrl) return "";
  if (realUrl.startsWith('/api/image')) return realUrl;

  // Chuyển URL gốc từ dạng text (ASCII/UTF-8) sang chuỗi ngẫu nhiên chuẩn Hex
  let hex = '';
  for (let i = 0; i < realUrl.length; i++) {
    hex += realUrl.charCodeAt(i).toString(16).padStart(2, '0');
  }
  
  // Đóng gói mảng mã hoá kèm con dấu riêng '_congcuai'
  return `/api/image?src=${hex}_congcuai`;
}

export function decodeImageUrl(encodedStr: string): string {
  if (!encodedStr) return "";
  
  // Gỡ bỏ con dấu
  const hex = encodedStr.replace('_congcuai', '');
  
  let realUrl = '';
  for (let i = 0; i < hex.length; i += 2) {
    realUrl += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
  }
  
  return realUrl;
}
