import { useState } from 'react';
import { useLatest } from 'ahooks';
import { exportExcel } from './excelUtils';
import { importExcel } from './importExcel';

interface ExcelState {
  Header?: {
    key: string;
    title: string;
    width?: number;
    // valueEnum?: ValueEnum;
  };
  data: any[];
  fileName: string;
}

const useExcel = (props?: Partial<ExcelState>) => {
  const [excelData, setExcelData] = useState<ExcelState>({ data: [], fileName: '' });
  const latestCountRef = useLatest(excelData);

  const handleImportExcel = async (file: any) => {
    try {
      const data = await importExcel(file);
      setExcelData({ data, fileName: file.target.files[0].name });
    } catch (error) {
      console.log(error);
    }
  };

  const handleExportExcel = () => {
    if (excelData.data.length > 0) {
      exportExcel(excelData.data, excelData.fileName);
    }
  };

  return {
    // excelData,
    excelData: latestCountRef.current,
    handleImportExcel,
    handleExportExcel,
  };
};

export default useExcel;
