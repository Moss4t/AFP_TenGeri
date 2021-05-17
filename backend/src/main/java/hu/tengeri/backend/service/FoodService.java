package hu.tengeri.backend.service;


import hu.tengeri.backend.dao.FoodRepository;
import hu.tengeri.backend.model.Food;
import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.model.Summary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    @Autowired
    FoodRepository foodRepository;

    public List<Food> getAllData()
    {
        return foodRepository.findAll();
    }
    public Food getFoodById(int id){
        return foodRepository.findById(id).get();
    }

    //create
    public Food createFood(Food food){
        return foodRepository.save(food);
    }

    //delete
    public String deleteFood(int id){
        foodRepository.deleteById(id);
        return "Food removed!" +id;
    }

    //update
    public Food updateFood(Food food){
        Food existingFood = foodRepository.findById(food.getId()).orElse(null);
        existingFood.setName(food.getName());
        existingFood.setPrice(food.getPrice());
        return foodRepository.save(existingFood);
    }

    public List<Food> listFoodBySearch(String searchText)
    {
        return foodRepository.listFoodBySearch(searchText);
    }
}
