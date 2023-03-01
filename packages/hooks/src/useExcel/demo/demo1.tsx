import React, { useState } from 'react';
import { useExcel } from 'ahooks';
import { exportExcel } from '../excelUtils';

// // 生成测试数据
// const generateMockData = (numRows: number, numColumns: number) => {
//   const headers = Array.from({ length: numColumns }, (_, index) => `Column ${index + 1}`);
//   const data = Array.from({ length: numRows }, () =>
//     Array.from({ length: numColumns }, (_, index) => `Row ${index + 1}`)
//   );
//   return { headers, data };
// };

// // 生成测试用的多个 Sheet 数据
// const sheets = Array.from({ length: 3 }, (_, index) => {
//   const { headers, data } = generateMockData(10, 5);
//   return { headers, data };
// });
const mockColumns1 = [
  {
    key: 'iccid',
    title: 'ICCID',
  },
  {
    key: 'code',
    title: '编码',
  },
  {
    key: 'type',
    title: '类型',
    valueEnum: {
      1: '类型1',
      2: '类型2',
    },
  },
];
const mockColumns2 = [
  {
    key: 'sim',
    title: 'SIM',
  },
  {
    key: 'code',
    title: '编码',
  },
  {
    key: 'type',
    title: '类型',
    valueEnum: {
      1: '类型1',
      2: '类型2',
    },
  },
];
const mockData = [
  {
    iccid: '8986032641201563902',
    code: '85159000841971223139998653010',
    sim: '1064956295102',
    type: '2',
    importTime: '2023-02-20 16:06:28',
    modifyTime: '2023-02-20 08:06:28',
    isDelete: '0',
    applicationScenariosId: '1555427949970628609',
    applicationScenariosPath: '1555425557535432705,1555425625290219521,1555427949970628609,',
    inputBatch: '2023022016062787165013',
    customerId: '1595614484698001409',
    customerPath: '1595614484698001409',
    customerName: '陈华江客户',
    principalId: '1589444678641287169',
    principalName: '范冰辉',
    packageName: '策&基础独立月&基础独立月',
    totalFlow: 2048,
    vanityFlow: 0,
    flowUpdateTime: '2023-02-21 06:49:00',
    totalVoice: 0,
    vanityVoice: 0,
    voiceUpdateTime: '2023-02-21 06:48:56',
    totalMsg: 0,
    vanityMsg: 0,
    msgUpdateTime: '2023-02-21 06:48:57',
    endTime: '2023-02-28 23:59:59',
    startTime: '2023-02-21 00:00:00',
    status: '6',
    operators: '2',
    apiAccountId: '1626790797837484034',
    apiId: '13',
    goodsId: '1627482936238120962',
    goodsName: 'chj资费卡商品测试',
  },
  {
    iccid: 'CS8608052121C2706979',
    code: '4746975302823467321961534787605',
    sim: 'CS857448739',
    type: '1',
    importTime: '2023-02-20 16:28:53',
    modifyTime: '2023-02-20 08:28:53',
    isDelete: '0',
    applicationScenariosId: '1555427949970628609',
    applicationScenariosPath: '1555425557535432705,1555425625290219521,1555427949970628609,',
    inputBatch: '2023022016285343798726',
    customerId: '1595614484698001409',
    customerPath: '1595614484698001409',
    customerName: '陈华江客户',
    principalId: '1589444678641287169',
    principalName: '范冰辉',
    packageName: '基础独立月&基础独立月&基础独立月&基础独立月',
    totalFlow: 3072,
    vanityFlow: 0,
    flowUpdateTime: '2023-02-21 06:48:54',
    totalVoice: 0,
    vanityVoice: 0,
    voiceUpdateTime: '2023-02-21 06:48:56',
    totalMsg: 0,
    vanityMsg: 0,
    msgUpdateTime: '2023-02-21 06:48:57',
    endTime: '2023-02-28 23:59:59',
    startTime: '2023-02-21 00:00:00',
    status: '2',
    operators: '2',
    apiAccountId: '1626790797837484034',
    apiId: '13',
    goodsId: '1627482936238120962',
    goodsName: 'chj资费卡商品测试',
  },
];

export default () => {
  const [excelData, setExcelData] = useState([]);

  // const handleExcelUpload = async (file) => {
  //   try {
  //     const data = await useExcel(file);
  //     setExcelData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <button
        onClick={() => {
          // 导出 Excel 文件
          exportExcel(
            [
              { columns: mockColumns1, dataSource: mockData, sheetName: '测试表1' },
              { columns: mockColumns2, dataSource: mockData, sheetName: '测试表2' },
            ],
            'test.xlsx',
          );
        }}
      >
        导出
      </button>
      {/* <input type="file" onChange={(e) => handleExcelUpload(e)} />
      {excelData.map((row, i) => (
        <div key={i}>
          <span>{row?.name}</span>
          <span>{row?.age}</span>
          <span>{row?.email}</span>
        </div>
      ))} */}
    </div>
  );
};
