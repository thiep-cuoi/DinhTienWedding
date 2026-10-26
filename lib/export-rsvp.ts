import {attendanceLabels,salutationText,bridgeLabel,rsvpEventLabel,sides,type Invitation,type RSVP,type WeddingSites} from "./wedding";
import {createWorkbook} from "./xlsx";
export function buildRsvpWorkbook(invites:Invitation[],responses:RSVP[],link:(invite:Invitation)=>string,configs:WeddingSites){
 const yes=responses.filter(r=>r.attendance==="yes"),people=(list:RSVP[])=>list.reduce((n,r)=>n+(r.attendance==="yes"?r.guests:0),0);
 const time=(s:string)=>new Date(s).toLocaleString("vi-VN",{timeZone:"Asia/Ho_Chi_Minh"});
 return createWorkbook([
  {name:"RSVP",widths:[28,22,15,52,65,22,24,24],rows:[["Tên khách mời","Xác nhận","Số người","Đầu cầu · Chương trình","Lời chúc","Nhóm khách","Gửi lần đầu (UTC+7)","Cập nhật (UTC+7)"],...responses.map(r=>[r.guestName,attendanceLabels[r.attendance],r.guests,rsvpEventLabel(configs,r),r.wish,r.groupName,time(r.createdAt),time(r.updatedAt)])]},
  {name:"Khách mời",widths:[30,18,24,16,18,85,24,45],rows:[["Tên khách mời","Xưng hô","Nhóm khách","Số người tối đa","Trạng thái RSVP","Link thiệp riêng","Thiệp hoạt động","Lời nhắn riêng"],...invites.map(i=>[i.guestName,salutationText(i.salutation,i.salutationAfter),i.groupName,i.maxGuests,attendanceLabels[i.attendance??""]??"Chưa phản hồi",link(i),i.enabled?"Có":"Tạm đóng",i.note])]},
  {name:"Thống kê",widths:[36,24],rows:[["Chỉ tiêu","Số lượng"],["Thiệp đã tạo",invites.length],["Tổng phản hồi",responses.length],["Sẽ tham dự",responses.filter(r=>r.attendance==="yes").length],["Tổng số người tham dự",people(responses)],...sides.map(s=>[`Số người tham dự · ${bridgeLabel(configs[s])}`,people(yes.filter(r=>r.side===s))]),["Không tham dự",responses.filter(r=>r.attendance==="no").length],["Chưa xác nhận",responses.filter(r=>r.attendance==="later").length],["Thiệp chưa phản hồi",invites.filter(i=>!i.attendance).length]]}
 ]);
}
