import type * as XLSX from 'xlsx';

export interface ExcelColumn {
  key: string;
  title: string;
  valueEnum?: Record<string, string>;
  cell?: XLSX.CellObject;
  col?: XLSX.ColInfo['wpx'] | XLSX.ColInfo;
}

export type ExcelData = Record<string, any>;

// type WorksheetData = Record<string, { v: any; w?: string }>;
export type WorksheetData = Record<string, XLSX.CellObject>;

export type WorkSheetPick = Pick<XLSX.WorkSheet, '!rows' | '!merges' | '!protect' | '!autofilter'>;

export interface ExcelSheet extends WorkSheetPick {
  sheetName?: string;
  columns: ExcelColumn[];
  dataSource: ExcelData[];
}
