package hu.tengeri.backend.dao;

import hu.tengeri.backend.model.Food;
import hu.tengeri.backend.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {

    @Query("From Food f WHERE f.name=:searchText OR f.id=:searchText  ORDER BY f.price DESC")
    List<Food> listFoodBySearch(@Param("searchText") String searchText);
}
