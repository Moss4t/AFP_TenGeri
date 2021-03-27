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
        return orderRepository.findById(id).orElse(null);
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
}
