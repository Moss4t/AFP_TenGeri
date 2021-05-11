package hu.tengeri.backend.controller;

import hu.tengeri.backend.export.ExcelFileExporter;
import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.model.ResponseMessage;
import hu.tengeri.backend.model.Summary;
import hu.tengeri.backend.service.SummaryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.poi.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/summary")
@CrossOrigin(origins = "*")
@Api(tags = "Summary")
public class SummaryController {

    @Autowired
    SummaryService summaryService;

    @GetMapping(value = "/list",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get all data from database with JSON format")
    public List<Summary> getAll(){
        try {
            return summaryService.getAllData();
        }
        catch (Exception e){
            throw new NoSuchElementException(e.getMessage());
        }
    }

    @GetMapping(value = "/getSummaryById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get data by id from database with JSON format")
    public Summary getSummaryById(@PathVariable int id) { return summaryService.getSummaryById(id);}

    @PostMapping(value = "/createSummary", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Creat data to database")
    public ResponseEntity<ResponseMessage> createSummary(@RequestBody Summary summary){
        summary.setOrdCount(summaryService.summaryCount(summary.getDate()));
        summary.setDate(summary.getDate());
        summary.setSummary(summaryService.summarySum(summary.getDate()));
        summaryService.createSummary(summary);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Successfully added summary!"));
    }

    @PutMapping(value = "/updateSummary/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("update data in database")
    public Summary updateSummary(@RequestBody Summary summary, @PathVariable int id){
        Summary existingSummary = summaryService.getSummaryById(id);
        if(existingSummary == null){
            throw new NoSuchElementException();
        }
        return summaryService.updateSummary(summary);
    }

    @DeleteMapping(value = "/deleteSummary/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Delete data from database")
    public ResponseEntity<ResponseMessage> deleteSummary(@PathVariable int id){
        summaryService.deleteSummary(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Summary deleted by id: " + id));
    }

    @GetMapping(value = "/count/{date}",produces = MediaType.APPLICATION_JSON_VALUE)
    public Integer countSummary(@PathVariable String date)
    {
        return summaryService.summaryCount(date);
    }
    @GetMapping(value = "/sum/{date}",produces = MediaType.APPLICATION_JSON_VALUE)
    public Double summarySum(@PathVariable String date)
    {
        return summaryService.summarySum(date);
    }

    @GetMapping(value = "/search/{searchText}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get the order with specific searchText")
    public ResponseEntity<List<Summary>> listAllSummaryBySearch(@PathVariable String searchText)
    {
        return new ResponseEntity<>(summaryService.listSummaryBySearch(searchText),HttpStatus.OK);
    }

    @GetMapping(value = "/export")
    @ApiOperation("Export orders")
    public void exportOrderToExcelFile(HttpServletResponse response) throws IOException {
        try {
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=SummaryList_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH:mm:ss")) + ".xlsx");
            ByteArrayInputStream inputStream = ExcelFileExporter.exportSummaryListToExcelFile((List<Summary>) summaryService.getAllData());
            IOUtils.copy(inputStream, response.getOutputStream());
        }
        catch (IOException e)
        {
            throw new IOException(e.getMessage());
        }
    }

}
