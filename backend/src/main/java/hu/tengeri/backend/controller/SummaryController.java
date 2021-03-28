package hu.tengeri.backend.controller;

import hu.tengeri.backend.model.Summary;
import hu.tengeri.backend.service.SummaryService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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
    public Summary createSummary(@RequestBody Summary summary){
        return summaryService.createSummary(summary);
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
    public String deleteSummary(@PathVariable int id){
        return summaryService.deleteSummary(id);
    }
}
