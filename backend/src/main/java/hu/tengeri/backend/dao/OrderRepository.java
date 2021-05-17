package hu.tengeri.backend.dao;

import hu.tengeri.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Integer> {

    @Query("select w.prodName from Warehouse w where w.prodCount > 0")
    List<String> productName();

    @Query("select w.prodName from Warehouse w where w.prodName=:pname")
    String searchNameForOrder(@Param("pname") String pname);

    @Query("select w.prodCount from Warehouse w where w.prodName=:pname")
    Integer countForOrder(@Param("pname") String pname);

    @Query("select f.price from Food f where f.name=:pname")
    Double foodPrice(@Param("pname") String pname);

    @Transactional
    @Modifying
    @Query("update Warehouse b set b.prodCount=:pcount where b.prodName=:pname")
    void updateProductForOrder(@Param("pcount") Integer pcount, @Param("pname") String pname);

    @Query("From Order p WHERE p.prodName=:searchText OR p.tableID=:searchText OR  p.date=:searchText OR p.status=:searchText OR p.status=:searchText ORDER BY p.rendID DESC")
    List<Order> listOrderBySearch(@Param("searchText") String searchText);
}
