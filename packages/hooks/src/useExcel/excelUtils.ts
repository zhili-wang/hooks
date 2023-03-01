import * as XLSX from 'xlsx';
import { isNumber } from './../utils/index';
import type { ExcelColumn, ExcelData, ExcelSheet, WorksheetData } from './types';

const getCols = (columns: ExcelColumn[]): ExcelColumn['col'][] =>
  columns.map(({ col = {} }) => ({
    ...(isNumber(col) ? { wpx: col } : col),
  }));

const getExcelCellName = (columnIndex: number, rowIndex: number): string => {
  let columnName = '';
  let index = columnIndex;
  while (index > 0) {
    const remainder = (index - 1) % 26;
    columnName = String.fromCharCode(65 + remainder) + columnName;
    index = Math.floor((index - 1) / 26);
  }
  return columnName + rowIndex;
};
// const getRowsRange = ({ columns, dataSource }: ExcelSheet) => {
//   const rowsLen = Number(columns?.some(({ title }) => title != undefined)) + dataSource?.length ?? 0;
//   return new Array(rowsLen).
// };

const mapData = (columns: ExcelColumn[], datas: ExcelData[]): WorksheetData => {
  const headers = columns
    ?.filter(({ title }) => title != null)
    ?.reduce((prev, { key, title }) => Object.assign(prev, { [key]: title }), {});

  if (Object.keys(headers)?.length) datas.unshift(headers);
  return datas
    ?.map((item, i) => {
      return columns.map(({ key, valueEnum }, j) => {
        const content = (valueEnum && valueEnum[item[key]]) || item[key];
        const position = getExcelCellName(j + 1, i + 1);
        return {
          content,
          position,
        };
      });
    })
    .flat()
    .reduce((prev, { position, content }) => {
      return {
        ...prev,
        [position]: {
          v: content,
          w: content,
        },
      };
    }, {});
};

export const exportExcel = (sheets: ExcelSheet[], fileName: string = 'exportExcel.xlsx') => {
  const Sheets: Record<string, XLSX.WorkSheet> = sheets?.reduce(
    (prev, { sheetName, columns = [], dataSource = [], ...rest }, index) => {
      const _sheetName = sheetName ? sheetName : `Sheet${index + 1}`;
      const datas = mapData(columns, dataSource);
      const refKeys = Object.keys(datas);
      return {
        ...prev,
        [_sheetName]: {
          ...datas,
          '!ref': `${refKeys[0]}:${refKeys[refKeys.length - 1]}`,
          '!cols': getCols(columns),
          ...rest,
        },
      };
    },
    {},
  );
  const worksheetObject: XLSX.WorkBook = {
    SheetNames: Object.keys(Sheets),
    Sheets,
  };
  console.info(worksheetObject, 'worksheetObject');

  XLSX.writeFile(worksheetObject, fileName);
};
