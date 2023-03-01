import XLSX from 'xlsx';

interface ExcelFile extends Event {
  target: {
    files: FileList;
  };
}

type ExcelRow = Record<string, any>;

/**
 * 获取Excel表格中的表头
 * @param worksheet Excel表格对象
 * @returns Excel表格中的表头
 */
const getHeaders = (worksheet: XLSX.WorkSheet): string[] => {
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  const headers: string[] = [];

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + '1';
    const cell = worksheet[address];
    if (!cell) continue;
    headers.push(cell.w);
  }

  return headers;
};

/**
 * 将Excel表格中的数据转换成JSON格式
 * @param workbook Excel文件对象
 * @returns 转换后的数据
 */
const getExcelData = (workbook: XLSX.WorkBook): ExcelRow[] => {
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const headers = getHeaders(worksheet);
  return XLSX?.utils?.sheet_to_json(worksheet, { header: headers });
  // const data = XLSX?.utils?.sheet_to_json(worksheet, { header: headers });
  // return data;
};

/**
 * 读取Excel文件，并将数据转换成JSON格式返回
 * @param file 上传的Excel文件
 * @returns 解析后的数据
 */
export const importExcel = async (file: ExcelFile): Promise<ExcelRow[]> => {
  return new Promise((resolve, reject) => {
    const { files } = file.target;
    const fileReader = new FileReader();

    fileReader.onload = async (event: ProgressEvent<FileReader>) => {
      try {
        const { result } = event.target!;
        const workbook = XLSX.read(result, { type: 'binary' });

        const data = getExcelData(workbook);

        resolve(data);
      } catch (error) {
        reject('文件解析失败');
      }
    };

    fileReader.readAsBinaryString(files[0]);
  });
};

export default importExcel;
