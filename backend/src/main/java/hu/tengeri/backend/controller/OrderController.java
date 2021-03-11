package hu.tengeri.backend.controller;

import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.service.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
