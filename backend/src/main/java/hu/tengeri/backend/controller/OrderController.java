package hu.tengeri.backend.controller;

import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.service.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping(value = "/orders")
@CrossOrigin(origins = "*")
@Api(tags = "Order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping(value = "/list",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get all data from database with JSON format")
    public List<Order> getAll()
    {
        try
        {
            return orderService.getAllData();
        }
        catch (Exception e)
        {
            throw new NoSuchElementException(e.getMessage());
        }
    }

    @GetMapping(value = "/getOrderById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get data by id from database with JSON format")
    public Order getOrderById(@PathVariable int id){
        return orderService.getOrderById(id);
    }

    @PostMapping(value = "/createOrder", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Creat data to database")
    public Order createOrder(@RequestBody Order order){
        LocalDateTime dateTime = LocalDateTime.now(); // Gets the current date and time
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        order.setDate(dateTime.format(formatter));
        order.setStatus("ACTIVE");
        return orderService.createOrder(order);
    }

    @PutMapping(value = "/updateOrder/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Change data in database")
    public Order updateOrder(@RequestBody Order order, @PathVariable int id){
        Order existingOrder = orderService.getOrderById(id);
        if(existingOrder == null){
            throw new NoSuchElementException();
        }
        LocalDateTime dateTime = LocalDateTime.now(); // Gets the current date and time
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        order.setDate(dateTime.format(formatter));

        return orderService.updateOrder(order);
    }

    @DeleteMapping(value = "/deleteOrder/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Delete data from database")
    public String deleteOrder(@PathVariable int id){
        return orderService.deleteOrder(id);
    }

    @GetMapping(value = "/category",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get category for orders")
    public ResponseEntity<Set<String>> findAllCategoryForProduct()
    {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("ACTIVE", "CLOSED")), HttpStatus.OK);
    }

    @GetMapping(value = "/tableID",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get tableID for orders")
    public ResponseEntity<Set<Integer>> findAlltableIDForOrder()
    {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15)), HttpStatus.OK);
    }

    @GetMapping(value = "/listNames",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get all data from database with JSON format")
    public List<String> getAllNames()
    {
        try
        {
            return orderService.listProdName();
        }
        catch (Exception e)
        {
            throw new NoSuchElementException(e.getMessage());
        }
    }
}
