package hu.tengeri.backend.export;

import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.model.Summary;
import hu.tengeri.backend.model.Warehouse;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelFileExporter {

    public static ByteArrayInputStream exportOrderListToExcelFile(List<Order> orders) {
        try (Workbook workbook = new XSSFWorkbook()) {

            Sheet sheet = workbook.createSheet("Orders");

            Row row = sheet.createRow(0);
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
            headerCellStyle.setAlignment(HorizontalAlignment.CENTER);
            headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            //Creating header cells

            Cell cell = row.createCell(0);
            cell.setCellValue("RendID");
            cell.setCellStyle(headerCellStyle);

            cell = row.createCell(1);
            cell.setCellValue("ProdName");
            cell.setCellStyle(headerCellStyle);

            cell = row.createCell(2);
            cell.setCellValue("TableID");
            cell.setCellStyle(headerCellStyle);

            cell = row.createCell(3);
            cell.setCellValue("Date");
            cell.setCellStyle(headerCellStyle);

            cell = row.createCell(4);
            cell.setCellValue("Price");
            cell.setCellStyle(headerCellStyle);

            cell = row.createCell(5);
            cell.setCellValue("Status");
            cell.setCellStyle(headerCellStyle);

            //Creating data row for each of product object

            for (int i = 0; i < orders.size(); i++)
            {
                Row dataRow = sheet.createRow(i + 1); //plus one to exclude header row
                dataRow.createCell(0).setCellValue(orders.get(i).getRendID());
                dataRow.createCell(1).setCellValue(orders.get(i).getProdName());
                dataRow.createCell(2).setCellValue(orders.get(i).getTableID());
                dataRow.createCell(3).setCellValue(orders.get(i).getDate());
                dataRow.createCell(4).setCellValue(orders.get(i).getPrice() + " Ft");
                dataRow.createCell(5).setCellValue(orders.get(i).getStatus());

            }

            //Making sure the size of Exel cell auto resize to fit the data
            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);
            sheet.autoSizeColumn(2);
            sheet.autoSizeColumn(3);
            sheet.autoSizeColumn(4);
            sheet.autoSizeColumn(5);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            return new ByteArrayInputStream(outputStream.toByteArray());

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static ByteArrayInputStream exportProductListToExcelFile(List<Warehouse> warehouses) {
        try (Workbook workbook = new XSSFWorkbook()) {

            Sheet sheet = workbook.createSheet("Products");

            Row row = sheet.createRow(0);
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
            headerCellStyle.setAlignment(HorizontalAlignment.CENTER);
            headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            //Creating header cells

            Cell cell = row.createCell(0);
            cell.setCellValue("ProdID");
            cell.setCellStyle(headerCellStyle);

            cell = row.createCell(1);
            cell.setCellValue("ProdName");
            cell.setCellStyle(headerCellStyle);

            cell = row.createCell(2);
            cell.setCellValue("ProdCount");
            cell.setCellStyle(headerCellStyle);

            cell = row.createCell(3);
            cell.setCellValue("WarehouseName");
            cell.setCellStyle(headerCellStyle);


            //Creating data row for each of product object

            for (int i = 0; i < warehouses.size(); i++)
            {
                Row dataRow = sheet.createRow(i + 1); //plus one to exclude header row
                dataRow.createCell(0).setCellValue(warehouses.get(i).getProdId());
                dataRow.createCell(1).setCellValue(warehouses.get(i).getProdName());
                dataRow.createCell(2).setCellValue(warehouses.get(i).getProdCount() + " DB");
                dataRow.createCell(3).setCellValue(warehouses.get(i).getWarehouseName());
            }

            //Making sure the size of Exel cell auto resize to fit the data
            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);
            sheet.autoSizeColumn(2);
            sheet.autoSizeColumn(3);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            return new ByteArrayInputStream(outputStream.toByteArray());

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static ByteArrayInputStream exportSummaryListToExcelFile(List<Summary> summaries) {
        try (Workbook workbook = new XSSFWorkbook()) {

            Sheet sheet = workbook.createSheet("Summary");

            Row row = sheet.createRow(0);
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
            headerCellStyle.setAlignment(HorizontalAlignment.CENTER);
            headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

            //Creating header cells

            Cell cell = row.createCell(0);
            cell.setCellValue("SumID");
            cell.setCellStyle(headerCellStyle);

            cell = row.createCell(1);
            cell.setCellValue("OrderCount");
            cell.setCellStyle(headerCellStyle);

            cell = row.createCell(2);
            cell.setCellValue("Date");
            cell.setCellStyle(headerCellStyle);

            cell = row.createCell(3);
            cell.setCellValue("Summary");
            cell.setCellStyle(headerCellStyle);


            //Creating data row for each of product object

            for (int i = 0; i < summaries.size(); i++)
            {
                Row dataRow = sheet.createRow(i + 1); //plus one to exclude header row
                dataRow.createCell(0).setCellValue(summaries.get(i).getSumId());
                dataRow.createCell(1).setCellValue(summaries.get(i).getOrdCount() + " db");
                dataRow.createCell(2).setCellValue(summaries.get(i).getDate());
                dataRow.createCell(3).setCellValue(summaries.get(i).getSummary() + " Ft");

            }

            //Making sure the size of Exel cell auto resize to fit the data
            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);
            sheet.autoSizeColumn(2);
            sheet.autoSizeColumn(3);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            return new ByteArrayInputStream(outputStream.toByteArray());

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
