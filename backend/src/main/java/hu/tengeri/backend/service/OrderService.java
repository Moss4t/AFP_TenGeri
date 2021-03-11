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

    public List<Order> getAllData()
    {
        return orderRepository.findAll();
    }
}
