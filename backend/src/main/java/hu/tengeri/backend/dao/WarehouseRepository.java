package hu.tengeri.backend.dao;

import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {

    @Query("From Warehouse w WHERE w.prodName=:searchText OR w.prodId=:searchText OR w.warehouseName=:searchText ORDER BY w.prodId DESC")
    List<Warehouse> listProductBySearch(@Param("searchText") String searchText);
}
