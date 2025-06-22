// exportFiles.js
import fs from 'fs/promises';
import { Parser as Json2csvParser } from 'json2csv';
import XLSX from 'xlsx';

export async function saveJSON(data, filename = 'Articulos.json') {
  await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Archivo ${filename} creado.`);
}

export async function saveCSV(data, filename = 'Articulos.csv') {
  const json2csvParser = new Json2csvParser();
  const csv = json2csvParser.parse(data);
  await fs.writeFile(filename, csv, 'utf-8');
  console.log(`Archivo ${filename} creado.`);
}

export async function saveXLSX(data, filename = 'Articulos.xlsx') {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Articulos');
  XLSX.writeFile(workbook, filename);
  console.log(`Archivo ${filename} creado.`);
}
