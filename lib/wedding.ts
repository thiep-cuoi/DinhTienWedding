import {defaultWedding,defaultWeddings} from "./card";
export {defaultWedding,defaultWeddings};

export type WeddingConfig = {
  side: string; bridgeName: string;
  groom: string; bride: string; groomFull: string; brideFull: string;
  groomFather: string; groomMother: string; groomHome: string; brideFather: string; brideMother: string; brideHome: string;
  ceremonyTitle: string; date: string; ceremonyTime: string; lunarDate: string;
  ceremonyVenue: string; ceremonyHall: string; ceremonyAddress: string; ceremonyNote: string;
  receptionTitle: string; receptionDate: string; receptionTime: string; receptionLunar: string;
  receptionVenue: string; receptionHall: string; receptionAddress: string; receptionNote: string;
  city: string; intro: string;
};
export const optionalConfigKeys: (keyof WeddingConfig)[] = ["bridgeName","groomFather","groomMother","groomHome","brideFather","brideMother","brideHome","lunarDate","ceremonyHall","ceremonyNote","receptionTitle","receptionDate","receptionTime","receptionLunar","receptionVenue","receptionHall","receptionAddress","receptionNote","city"];
// Hai đầu cầu: nhà gái (TP. Hồ Chí Minh) và nhà trai (Hải Phòng), theo thứ tự hiện trên màn mở thiệp.
export type Side = "nha-gai" | "nha-trai";
export const sides: Side[] = ["nha-gai","nha-trai"];
export type WeddingSites = Record<Side,WeddingConfig>;
export const isSide = (value: unknown): value is Side => value === "nha-gai" || value === "nha-trai";
export const bridgeLabel = (config: WeddingConfig) => config.bridgeName?.trim() || `Đầu cầu ${config.city || (config.side === "nha-gai" ? "nhà gái" : "nhà trai")}`;
// Gộp nội dung đã lưu (Google Sheets) vào mặc định theo từng trường, để trường mới thêm sau vẫn có giá trị.
export const mergeConfigs = (saved?: Partial<Record<Side,Partial<WeddingConfig>>>): WeddingSites => ({"nha-gai": {...defaultWeddings["nha-gai"], ...saved?.["nha-gai"]}, "nha-trai": {...defaultWeddings["nha-trai"], ...saved?.["nha-trai"]}});

export type Invitation = { id: string; token: string; guestName: string; salutation: string; salutationAfter?: number | boolean; groupName: string; maxGuests: number; note: string; enabled: number; createdAt: string; openedAt: string | null; attendance?: string | null; guests?: number | null; wish?: string | null; respondedAt?: string | null; side?: Side | null; };
export type RSVP = { id: string; inviteId: string | null; guestName: string; attendance: "yes" | "no" | "later"; guests: number; event: "ceremony" | "reception" | "both"; wish: string; groupName: string; side?: Side | null; createdAt: string; updatedAt: string; };
// Tên trên thiệp: xưng hô đứng trước tên ("Anh Minh") hoặc sau tên khi tuỳ chỉnh ("Lân bro").
export const guestTitle = (salutation: string, name: string, after?: number | boolean | null) => [after ? name : salutation, after ? salutation : name].filter(Boolean).join(" ");
export const salutationText = (salutation: string, after?: number | boolean | null) => after ? `${salutation} (sau tên)` : salutation;
export const attendanceLabels: Record<string,string> = { yes: "Sẽ tham dự", no: "Không tham dự", later: "Chưa xác nhận" };
export const eventLabels: Record<string,string> = { ceremony: "Lễ", reception: "Tiệc", both: "Cả hai chương trình" };
// Nhãn chương trình theo đúng đầu cầu khách đã chọn, ví dụ "Đầu cầu Hải Phòng · Tiệc mừng hạnh phúc".
export function rsvpEventLabel(configs: WeddingSites, r: Pick<RSVP,"event"|"side">) {
  const config = r.side ? configs[r.side] : undefined;
  if (!config) return eventLabels[r.event] ?? r.event;
  const title = r.event === "ceremony" ? config.ceremonyTitle : r.event === "reception" ? config.receptionTitle || "Tiệc cưới" : eventLabels.both;
  return `${bridgeLabel(config)} · ${title}`;
}

export class InputError extends Error { status = 400; }
export function cleanText(value: unknown, max: number, label: string, required = true): string {
  if (value === undefined || value === null) value = "";
  if (typeof value !== "string") throw new InputError(`${label} không hợp lệ.`);
  const text = value.trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
  if (required && !text) throw new InputError(`Vui lòng nhập ${label.toLowerCase()}.`);
  if (text.length > max) throw new InputError(`${label} tối đa ${max} ký tự.`);
  return text;
}
export function validateRSVP(value: Record<string,unknown>, invite?: Pick<Invitation,"guestName"|"maxGuests"|"groupName">) {
  const guestName = invite?.guestName ?? cleanText(value.guestName, 100, "Tên khách mời");
  const attendance = cleanText(value.attendance, 10, "Xác nhận tham dự");
  if (!["yes","no","later"].includes(attendance)) throw new InputError("Vui lòng chọn tình trạng tham dự.");
  const count = Number(value.guests);
  if (attendance === "yes" && (!Number.isInteger(count) || count < 1 || count > (invite?.maxGuests ?? 10))) throw new InputError(`Số người tham dự phải từ 1 đến ${invite?.maxGuests ?? 10}.`);
  const event = cleanText(value.event, 20, "Chương trình tham dự");
  if (!["ceremony","reception","both"].includes(event)) throw new InputError("Chương trình tham dự không hợp lệ.");
  const wish = cleanText(value.wish, 1200, "Lời chúc", false);
  const submissionId = cleanText(value.submissionId, 80, "Mã phản hồi");
  if (!/^[a-zA-Z0-9_-]{16,80}$/.test(submissionId)) throw new InputError("Mã phản hồi không hợp lệ. Vui lòng tải lại trang.");
  return { guestName, attendance: attendance as RSVP["attendance"], guests: attendance === "yes" ? count : 0, event: event as RSVP["event"], wish, groupName: invite?.groupName ?? "Khách tự xác nhận", submissionId };
}
export function validateConfig(input: Record<string,unknown>, side?: Side): WeddingConfig {
  const result = {} as WeddingConfig;
  for (const key of Object.keys(defaultWedding) as (keyof WeddingConfig)[]) result[key] = cleanText(input[key], key === "intro" ? 1500 : 250, key, !optionalConfigKeys.includes(key));
  if (!isSide(result.side) || (side && result.side !== side)) throw new InputError("Loại thiệp không hợp lệ.");
  const checkDate = (date: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date + "T00:00:00+07:00"))) throw new InputError("Ngày tổ chức không hợp lệ.");
    if (new Date(date + "T12:00:00+07:00").toISOString().slice(0,10) !== date) throw new InputError("Ngày tổ chức không tồn tại trong lịch.");
  };
  const checkTime = (time: string) => { if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new InputError("Giờ tổ chức không hợp lệ."); };
  checkDate(result.date); checkTime(result.ceremonyTime);
  if (result.receptionVenue) {
    if (!result.receptionDate) result.receptionDate = result.date;
    if (!result.receptionTitle) result.receptionTitle = "Tiệc Cưới";
    checkDate(result.receptionDate); checkTime(result.receptionTime);
  }
  return result;
}
export type WeddingEvent = { key: "ceremony" | "reception"; title: string; date: string; time: string; lunar: string; venue: string; hall: string; address: string; note: string };
export function weddingEvents(config: WeddingConfig): WeddingEvent[] {
  const events: WeddingEvent[] = [{ key: "ceremony", title: config.ceremonyTitle, date: config.date, time: config.ceremonyTime, lunar: config.lunarDate, venue: config.ceremonyVenue, hall: config.ceremonyHall, address: config.ceremonyAddress, note: config.ceremonyNote ?? "" }];
  if (config.receptionVenue?.trim()) events.push({ key: "reception", title: config.receptionTitle || "Tiệc Cưới", date: config.receptionDate || config.date, time: config.receptionTime, lunar: config.receptionLunar, venue: config.receptionVenue, hall: config.receptionHall, address: config.receptionAddress, note: config.receptionNote ?? "" });
  return events;
}
export const hasReception = (config: WeddingConfig) => weddingEvents(config).length > 1;
// Sự kiện chính mà khách được mời (tiệc nếu có, nếu không là lễ) dùng cho ngày nổi bật và đếm ngược.
export const mainEvent = (config: WeddingConfig) => weddingEvents(config).at(-1)!;
export const isBrideSide = (config: WeddingConfig) => config.side === "nha-gai";
export function couple(config: WeddingConfig) {
  const groom = { role: "Chú rể", name: config.groom, full: config.groomFull, family: "Nhà trai", father: config.groomFather, mother: config.groomMother, home: config.groomHome ?? "" };
  const bride = { role: "Cô dâu", name: config.bride, full: config.brideFull, family: "Nhà gái", father: config.brideFather, mother: config.brideMother, home: config.brideHome ?? "" };
  return isBrideSide(config) ? [bride, groom] : [groom, bride];
}
export const initial = (name: string) => (name.trim().split(/\s+/).at(-1) ?? "").charAt(0).toUpperCase();
export function weddingDate(config: WeddingConfig) { const e = mainEvent(config); return new Date(`${e.date}T${e.time}:00+07:00`); }
export function prettyDate(date: string) { return new Date(date + "T12:00:00+07:00").toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Asia/Ho_Chi_Minh" }); }
export function dayName(date: string) { return new Date(date + "T12:00:00+07:00").toLocaleDateString("vi-VN", { weekday: "long", timeZone: "Asia/Ho_Chi_Minh" }); }
