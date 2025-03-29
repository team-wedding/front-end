import { GuestInfo } from "@/types/GuestType";
import XLSX from 'xlsx-js-style';

const headerStyle = {
    font: { bold: true, color: { rgb: '000000' }, name: '함초롱바탕', sz: 13 },
    fill: { fgColor: { rgb: 'BC8F8F' } },
    alignment: { horizontal: 'center', vertical: 'center' },
    border: { left: { style: 'thin', color: { auto: 1 } }, right: { style: 'thin', color: { auto: 1 } }, top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } }
};

const dataStyle = {
    font: { color: { rgb: '000000' }, name: '함초롱바탕', sz: 11 },
    fill: { fgColor: { rgb: 'FFFAFA' } },
    alignment: { horizontal: 'center', vertical: 'center' },
    border: { left: { style: 'thin', color: { auto: 1 } }, right: { style: 'thin', color: { auto: 1 } }, top: { style: 'thin', color: { auto: 1 } }, bottom: { style: 'thin', color: { auto: 1 } } }
};

export const downloadRsvpExcel = (attendanceList: GuestInfo[]) => {
    const excelData = attendanceList.map((item) => ({
        "대표자": item.name,
        "참석자 수": item.companions + 1,
        "연락처": item.contact,
        "참석": item.attendance ? "O" : "X",
        "식사": item.isDining === "예정" ? "O" : item.isDining === "미정" ? "-" : "X",
    }));

    // Excel 파일 생성 및 다운로드
    const wb = XLSX.utils.book_new();

    // 열의 폭을 정의
    const colWidths = [80, 80, 120, 80, 80];

    // cols 속성을 사용하여 각 열의 폭을 조절
    const cols = colWidths.map(width => ({ wpx: width }));

    const headerRow = [
        { v: '대표자', t: 's', s: headerStyle },
        { v: '참석자 수', t: 's', s: headerStyle },
        { v: '연락처', t: 's', s: headerStyle },
        { v: '참석', t: 's', s: headerStyle },
        { v: '식사', t: 's', s: headerStyle },
    ];

    const dataRows = excelData.map(row => [
        { v: row["대표자"], t: 's', s: dataStyle },
        { v: row["참석자 수"], t: 's', s: dataStyle },
        { v: row["연락처"], t: 's', s: dataStyle },
        { v: row["참석"], t: 's', s: dataStyle },
        { v: row["식사"], t: 's', s: dataStyle },
    ]);

    const rows = [headerRow, ...dataRows];

    // 새로운 Sheet 객체 생성
    const ws = XLSX.utils.aoa_to_sheet(rows);

    // cols 속성 적용
    ws['!cols'] = cols;

    // workbook에 추가
    XLSX.utils.book_append_sheet(wb, ws, '참석자 목록');

    // 파일 다운로드
    XLSX.writeFile(wb, 'rsvp_attendance.xlsx');

}