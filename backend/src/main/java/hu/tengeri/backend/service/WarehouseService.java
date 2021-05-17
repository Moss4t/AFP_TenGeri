package hu.tengeri.backend.service;

import hu.tengeri.backend.dao.WarehouseRepository;
import hu.tengeri.backend.model.Food;
import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.model.Warehouse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseService {

    @Autowired
    WarehouseRepository warehouseRepository;

    //read
    public List<Warehouse> getAllData(){
        return warehouseRepository.findAll();
    }
    public Warehouse getProdById(int id){
        return warehouseRepository.findById(id).get();
    }

    //create
    public Warehouse createProd(Warehouse warehouse){
        return warehouseRepository.save(warehouse);
    }

    //delete
    public String deleteProd(int id){
        warehouseRepository.deleteById(id);
        return "Product deleted!" +id;
    }

    //update
    public Warehouse updateProduct(Warehouse warehouse){
        Warehouse existingWarehouse = warehouseRepository.findById(warehouse.getProdId()).orElse(null);
        existingWarehouse.setProdName(warehouse.getProdName());
        existingWarehouse.setProdCount(warehouse.getProdCount());
        existingWarehouse.setWarehouseName(warehouse.getWarehouseName());
        return warehouseRepository.save(existingWarehouse);
    }

    public List<Warehouse> listWarehouseBySearch(String searchText)
    {
        return warehouseRepository.listProductBySearch(searchText);
    }

    public List<String> listFoodName()
    {
        return warehouseRepository.foodName();
    }


}
