import single from 'single';

// 原始数据到 excel
function originToExcel (data, dataIndex) {
  return data.map(row => {
    return dataIndex.map(col => row[col]);
  });
}
// excel 到原始数据
function excelToOrigin (data, dataIndex) {
  return data.map(row => {
    let rowData = {};
    dataIndex.forEach((colName, index) => {
      rowData[colName] = row[index];
    });
    return rowData;
  });
}

export default {
  single,
  originToExcel,
  excelToOrigin
};
