package hu.tengeri.backend.dao;

import hu.tengeri.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {

    @Query("select w.prodName from Warehouse w where w.prodCount > 0")
    List<String> productName();


}
