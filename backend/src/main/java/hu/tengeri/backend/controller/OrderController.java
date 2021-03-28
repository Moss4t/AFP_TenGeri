package hu.tengeri.backend.controller;

import com.sun.jdi.InvalidLineNumberException;
import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.service.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

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
        return orderService.createOrder(order);
    }

    @PutMapping(value = "/updateOrder/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Change data in database")
    public Order updateOrder(@RequestBody Order order, @PathVariable int id){
        Order existingOrder = orderService.getOrderById(id);
        if(existingOrder == null){
            throw new NoSuchElementException();
        }
        return orderService.updateOrder(order);
    }

    @DeleteMapping(value = "/deleteOrder/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Delete data from database")
    public String deleteOrder(@PathVariable int id){
        return orderService.deleteOrder(id);
    }
}
