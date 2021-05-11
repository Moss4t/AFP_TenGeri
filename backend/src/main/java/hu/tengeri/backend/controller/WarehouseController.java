package hu.tengeri.backend.controller;

import hu.tengeri.backend.export.ExcelFileExporter;
import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.model.ResponseMessage;
import hu.tengeri.backend.model.Warehouse;
import hu.tengeri.backend.service.WarehouseService;
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
@RequestMapping(value = "/warehouse")
@CrossOrigin(origins = "*")
@Api(tags = "Warehouse")
public class WarehouseController {

    @Autowired
    WarehouseService warehouseService;

    @GetMapping(value = "/list",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get all data from database with JSON format")
    public List<Warehouse> getAll(){
        try {
            return warehouseService.getAllData();
        }
        catch (Exception e){
            throw new NoSuchElementException(e.getMessage());
        }
    }

    @GetMapping(value = "/getProdById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get data by id from database with JSON format")
    public Warehouse getProdById(@PathVariable int id){
        return warehouseService.getProdById(id);
    }

    @PostMapping(value = "/createProd", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Creat data to database")
    public ResponseEntity<ResponseMessage> createProd(@RequestBody Warehouse warehouse){
        warehouseService.createProd(warehouse);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Successfully added product!"));
    }

    @PutMapping(value = "/updateProd/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Change data in database")
    public ResponseEntity<ResponseMessage> updateProd(@RequestBody Warehouse warehouse, @PathVariable int id){
        Warehouse existingProd = warehouseService.getProdById(id);
        if(existingProd == null){
            throw new NoSuchElementException();
        }
         warehouseService.updateProduct(warehouse);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Successfully updated product!"));
    }

    @DeleteMapping(value = "/deleteProd/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Delete data from database")
    public ResponseEntity<ResponseMessage> deleteProd(@PathVariable int id){
        warehouseService.deleteProd(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Product deleted by id: " + id));
    }

    @GetMapping(value = "/search/{searchText}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get the product with specific searchText")
    public ResponseEntity<List<Warehouse>> listAllOrderBySearch(@PathVariable String searchText)
    {
        return new ResponseEntity<>(warehouseService.listWarehouseBySearch(searchText), HttpStatus.OK);
    }

    @GetMapping(value = "/export")
    @ApiOperation("Export product")
    public void exportOrderToExcelFile(HttpServletResponse response) throws IOException {
        try {
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=ProductList_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH:mm:ss")) + ".xlsx");
            ByteArrayInputStream inputStream = ExcelFileExporter.exportProductListToExcelFile((List<Warehouse>) warehouseService.getAllData());
            IOUtils.copy(inputStream, response.getOutputStream());
        }
        catch (IOException e)
        {
            throw new IOException(e.getMessage());
        }
    }
}
