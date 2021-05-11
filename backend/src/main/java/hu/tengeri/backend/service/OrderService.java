package hu.tengeri.backend.service;

import hu.tengeri.backend.dao.OrderRepository;
import hu.tengeri.backend.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    //read
    public List<Order> getAllData()
    {
        return orderRepository.findAll();
    }
    public Order getOrderById(int id){
        return orderRepository.findById(id).get();
    }

    //create
    public Order createOrder(Order order){
        return orderRepository.save(order);
    }

    //delete
    public String deleteOrder(int id){
        orderRepository.deleteById(id);
        return "Order removed!" +id;
    }

    //update
    public Order updateOrder(Order order){
        Order existingOrder = orderRepository.findById(order.getRendID()).orElse(null);
        existingOrder.setProdName(order.getProdName());
        existingOrder.setDate(order.getDate());
        existingOrder.setPrice(order.getPrice());
        existingOrder.setStatus(order.getStatus());
        existingOrder.setTableID(order.getTableID());
        return orderRepository.save(existingOrder);
    }

    public List<String> listProdName()
    {
        return orderRepository.productName();
    }

    public void updateQuery(Integer pcount,String pname)
    {
        orderRepository.updateProductForOrder(pcount,pname);
    }

    public String searchNameForOrder(String pname)
    {
        return orderRepository.searchNameForOrder(pname);
    }

    public Integer countForOrder(String pname)
    {
        return orderRepository.countForOrder(pname);
    }

    public List<Order> listOrderBySearch(String searchText)
    {
        return orderRepository.listOrderBySearch(searchText);
    }
}
