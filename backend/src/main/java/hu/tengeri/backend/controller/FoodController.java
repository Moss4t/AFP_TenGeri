package hu.tengeri.backend.controller;

import hu.tengeri.backend.model.Food;
import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.model.ResponseMessage;
import hu.tengeri.backend.service.FoodService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping(value = "/foods")
@CrossOrigin(origins = "*")
@Api(tags = "Food")
public class FoodController {

    @Autowired
    FoodService foodService;

    @GetMapping(value = "/list",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get all data from database with JSON format")
    public List<Food> getAll()
    {
        try
        {
            return foodService.getAllData();
        }
        catch (Exception e)
        {
            throw new NoSuchElementException(e.getMessage());
        }
    }

    @GetMapping(value = "/getFoodById/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get data by id from database with JSON format")
    public Food getFoodById(@PathVariable int id){
        return foodService.getFoodById(id);
    }

    @PostMapping(value = "/createFood", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Creat data to database")
    public ResponseEntity<ResponseMessage> createFood(@RequestBody Food food){

        foodService.createFood(food);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Successfully added food!"));
    }

    @PutMapping(value = "/updateFood/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Change data in database")
    public ResponseEntity<ResponseMessage> updateFood(@RequestBody Food food, @PathVariable int id){
        Food existingFood = foodService.getFoodById(id);
        if(existingFood == null){
            throw new NoSuchElementException();
        }

        foodService.updateFood(food);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Successfully updated food!"));
    }

    @DeleteMapping(value = "/deleteFood/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Delete data from database")
    public ResponseEntity<ResponseMessage> deleteOrder(@PathVariable int id){
        foodService.deleteFood(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Food deleted by id: " + id));
    }

    @GetMapping(value = "/search/{searchText}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation("Get the order with specific searchText")
    public ResponseEntity<List<Food>> listAllOrderBySearch(@PathVariable String searchText)
    {
        return new ResponseEntity<>(foodService.listFoodBySearch(searchText),HttpStatus.OK);
    }
}
