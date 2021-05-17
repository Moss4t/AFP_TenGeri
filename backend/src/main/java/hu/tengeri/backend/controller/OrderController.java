package hu.tengeri.backend.controller;

import hu.tengeri.backend.export.ExcelFileExporter;
import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.model.ResponseMessage;
import hu.tengeri.backend.service.OrderService;
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
    public ResponseEntity<ResponseMessage>  createOrder(@RequestBody Order order){
        LocalDateTime dateTime = LocalDateTime.now(); // Gets the current date and time
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        order.setDate(dateTime.format(formatter));
        order.setStatus("ACTIVE");
        Double price = orderService.foodPrice(order.getProdName());
        order.setPrice(price);
        String prodName = orderService.searchNameForOrder(order.getProdName());
        Integer currentCount = orderService.countForOrder(prodName);
        orderService.updateQuery(currentCount - 1,prodName);
        orderService.createOrder(order);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Successfully added order!"));
    }

    @PutMapping(value = "/updateOrder/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Change data in database")
    public ResponseEntity<ResponseMessage> updateOrder(@RequestBody Order order, @PathVariable int id){
        Order existingOrder = orderService.getOrderById(id);
        if(existingOrder == null){
            throw new NoSuchElementException();
        }
        LocalDateTime dateTime = LocalDateTime.now(); // Gets the current date and time
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        order.setDate(dateTime.format(formatter));
        if (!existingOrder.getProdName().equalsIgnoreCase(order.getProdName()))
        {
            String prodName = orderService.searchNameForOrder(order.getProdName());
            Integer currentCount = orderService.countForOrder(prodName);
            orderService.updateQuery(currentCount - 1,prodName);
        }

        orderService.updateOrder(order);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Successfully updated product!"));
    }

    @DeleteMapping(value = "/deleteOrder/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Delete data from database")
    public ResponseEntity<ResponseMessage> deleteOrder(@PathVariable int id){
        orderService.deleteOrder(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Order deleted by id: " + id));
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

    @GetMapping(value = "/search/{searchText}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get the order with specific searchText")
    public ResponseEntity<List<Order>> listAllOrderBySearch(@PathVariable String searchText)
    {
        return new ResponseEntity<>(orderService.listOrderBySearch(searchText),HttpStatus.OK);
    }

    @GetMapping(value = "/export")
    @ApiOperation("Export orders")
    public void exportOrderToExcelFile(HttpServletResponse response) throws IOException {
        try {
            response.setContentType("application/octet-stream");
            response.setHeader("Content-Disposition", "attachment; filename=OrdersList_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH:mm:ss")) + ".xlsx");
            ByteArrayInputStream inputStream = ExcelFileExporter.exportOrderListToExcelFile((List<Order>) orderService.getAllData());
            IOUtils.copy(inputStream, response.getOutputStream());
        }
        catch (IOException e)
        {
            throw new IOException(e.getMessage());
        }
    }

    @GetMapping(value = "/price/{name}")
    public Double foodPrice(@PathVariable String name)
    {
        return orderService.foodPrice(name);
    }
}
