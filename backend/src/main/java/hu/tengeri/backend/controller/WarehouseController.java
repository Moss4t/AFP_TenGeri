package hu.tengeri.backend.controller;

import hu.tengeri.backend.model.Warehouse;
import hu.tengeri.backend.service.WarehouseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

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
    public Warehouse createProd(@RequestBody Warehouse warehouse){
        return warehouseService.createProd(warehouse);
    }

    @PutMapping(value = "/updateProd/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Change data in database")
    public Warehouse updateProd(@RequestBody Warehouse warehouse, @PathVariable int id){
        Warehouse existingProd = warehouseService.getProdById(id);
        if(existingProd == null){
            throw new NoSuchElementException();
        }
        return warehouseService.updateProduct(warehouse);
    }

    @DeleteMapping(value = "/deleteProd/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Delete data from database")
    public String deleteProd(@PathVariable int id){
        return warehouseService.deleteProd(id);
    }
}
