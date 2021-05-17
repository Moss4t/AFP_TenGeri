package hu.tengeri.backend;

import hu.tengeri.backend.controller.FoodController;
import hu.tengeri.backend.controller.OrderController;
import hu.tengeri.backend.controller.SummaryController;
import hu.tengeri.backend.controller.WarehouseController;
import hu.tengeri.backend.dao.FoodRepository;
import hu.tengeri.backend.dao.OrderRepository;
import hu.tengeri.backend.dao.SummaryRepository;
import hu.tengeri.backend.dao.WarehouseRepository;
import hu.tengeri.backend.model.Food;
import hu.tengeri.backend.model.Order;
import hu.tengeri.backend.model.Summary;
import hu.tengeri.backend.model.Warehouse;
import org.junit.Assert;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private FoodController foodController;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderController orderController;

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private WarehouseController warehouseController;

    @Autowired
    private SummaryRepository summaryRepository;

    @Autowired
    private SummaryController summaryController;

    @Autowired
    WebApplicationContext webApplicationContext;

    /* Test cases for foods */

    @Test
    public void contextFoodLoads() {
        assertThat(foodController).isNotNull();
    }

    @Test
    public void testGetProductByID()  {
        Food food = foodRepository.findById(101).get();
        String foodName = food.getName();
        String actual = "Orjaleves csigatésztával";
        Assert.assertEquals(foodName,actual);
    }

    @Test
    @Rollback(value = false)
    @Disabled("Dont need more foods with same parameters")
    public void testCreateFood() {

        Food food = new Food("Túrós tészta",1300.0);
        Food savedFood = foodRepository.save(food);
        Assert.assertNotNull(savedFood);
    }

    @Test
    public void testListFood()
    {
        List<Food> foods = foodRepository.findAll();
        assertThat(foods).size().isGreaterThan(0);
    }

    @Disabled
    @Test
    public void testDeleteFoodWithStatusCode() throws Exception {
        MockMvc mvc =  MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        String uri = "/foods/deleteFood/200";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.assertEquals(404, status);
    }

    @Test
    public void testGetProductByIdWithStatusCode() throws Exception {
        MockMvc mvc =  MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        String uri = "/foods/getFoodById/104";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.assertEquals(200, status);
    }

    @Test
    @Rollback(value = false)
    public void testCantDeleteFood()
    {
        Integer id = 124;
        boolean existBeforeDelete = foodRepository.findById(id).isPresent();
        Assert.assertFalse(existBeforeDelete);
    }

    @Test
    @Disabled("After update cant find food with the previous name")
    public void testUpdateFood()
    {
        String foodName = "Hideg gyümölcsleves";
        Food food = foodRepository.findById(103).get();
        food.setName("Hideg málnalevel");
        foodRepository.save(food);
        Assert.assertEquals(food.getName(),foodName);
    }


    /* Test cases for orders */

    @Test
    public void contextOrdersLoads() {
        assertThat(orderController).isNotNull();
    }

    @Test
    public void testGetOrderByID()  {
        Order order = orderRepository.findById(106).get();
        String foodName = order.getProdName();
        String actual = "Gombás natúr sertésborda vegyes körettel";
        Assert.assertEquals(foodName,actual);
    }

    @Test
    @Rollback(value = false)
    @Disabled("Dont need more order with same parameters")
    public void testCreateOrder() {

        Order order = new Order("Beefsteak tükörtojással, vegyes körettel",8,"2021-05-17",4000.0,"ACTIVE");
        Order savedOrder = orderRepository.save(order);
        Assert.assertNotNull(savedOrder);
    }

    @Test
    public void testListOrder()
    {
        List<Order> orders =  orderRepository.findAll();
        assertThat(orders).size().isGreaterThan(0);
    }

    @Test
    public void testFindOrderByID()
    {
        Integer id = 108;
        boolean existOrder = orderRepository.findById(id).isPresent();
        Assert.assertTrue(existOrder);
    }

    @Disabled
    @Test
    public void testDeleteOrderWithStatusCode() throws Exception {
        MockMvc mvc =  MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        String uri = "/orders/deleteOrder/255";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.assertEquals(404, status);
    }

    @Test
    public void testGetOrderByIdWithStatusCode() throws Exception {
        MockMvc mvc =  MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        String uri = "/orders/getOrderById/106";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.assertEquals(200, status);
    }

    @Test
    @Rollback(value = false)
    @Disabled("After delete the current order, order never exist anymore")
    public void testDeleteOrder()
    {
        Integer id = 102;
        boolean existBeforeDelete = orderRepository.findById(id).isPresent();

        orderRepository.deleteById(id);

        boolean existAfterDelete = orderRepository.findById(id).isPresent();

        Assert.assertTrue(existBeforeDelete);
        Assert.assertFalse(existAfterDelete);
    }

    @Test
    public void testUpdateOrder()
    {
        String status = "ACTIVE";
        Order order = orderRepository.findById(100).get();
        order.setStatus(status);
        orderRepository.save(order);
        Assert.assertEquals(order.getStatus(),status);
    }

    /* Test cases for warehouses */

    @Test
    public void contextWareHouseLoads() {
        assertThat(warehouseController).isNotNull();
    }

    @Test
    public void testGetProductFromWarehouseByID()  {
        Warehouse warehouse = warehouseRepository.findById(103).get();
        String productName = warehouse.getProdName();
        String actual = "Húsleves májgombóccal";
        Assert.assertEquals(productName,actual);
    }

    @Test
    @Rollback(value = false)
    @Disabled("Dont need more products in the warehouse with same parameters")
    public void testCreateProductForWarehouse() {

        Warehouse warehouse = new Warehouse("Babgulyás",30,"Tengeri Raktár");
        Warehouse savedWarehouse = warehouseRepository.save(warehouse);
        Assert.assertNotNull(savedWarehouse);
    }

    @Test
    public void testListProductFromWarehouse()
    {
        List<Warehouse> warehouses = warehouseRepository.findAll();
        assertThat(warehouses).size().isGreaterThan(2);
    }

    @Test
    public void testCantFindProductInWarehouseByID()
    {
        Integer id = 300;
        boolean existWarehouse = warehouseRepository.findById(id).isPresent();
        Assert.assertFalse(existWarehouse);
    }

    @Disabled
    @Test
    public void testDeleteProductFromWarehouseWithStatusCode() throws Exception {
        MockMvc mvc =  MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        String uri = "/warehouse/deleteProd/155";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.assertEquals(404, status);
    }

    @Test
    public void testGetProductFromWarehouseByIdWithStatusCode() throws Exception {
        MockMvc mvc =  MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        String uri = "/warehouse/getProdById/103";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.assertEquals(200, status);
    }

    @Test
    @Rollback(value = false)
    @Disabled("After delete the current product, product never exist anymore")
    public void testDeleteProductFromWarehouse()
    {
        Integer id = 105;
        boolean existBeforeDelete = warehouseRepository.findById(id).isPresent();

        warehouseRepository.deleteById(id);

        boolean existAfterDelete = warehouseRepository.findById(id).isPresent();

        Assert.assertTrue(existBeforeDelete);
        Assert.assertFalse(existAfterDelete);
    }

    @Test
    public void testUpdateProductFromWarehouse()
    {
        Integer productCount = 25;
        Warehouse warehouse = warehouseRepository.findById(102).get();
        warehouse.setProdCount(25);
        warehouseRepository.save(warehouse);
        Assert.assertEquals(warehouse.getProdCount(),productCount);
    }


    /* Test cases for summary */

    @Test
    public void contextOrderLoads() {
        assertThat(summaryController).isNotNull();
    }

    @Test
    public void testGetSummaryByID()  {
        boolean existsummary = summaryRepository.findById(560).isPresent();
        Assert.assertFalse(existsummary);
    }


    @Test
    public void testListSummary()
    {
        List<Summary> summaries =  summaryRepository.findAll();
        assertThat(summaries).size().isGreaterThan(0);
    }

    @Test
    public void testFindSummaryByID()
    {
        Integer id = 56;
        boolean existSumamry = summaryRepository.findById(id).isPresent();
        Assert.assertTrue(existSumamry);
    }

    @Test
    @Disabled("After delete the summary dont exist anymore")
    public void testDeleteSummaryWithStatusCode() throws Exception {
        MockMvc mvc =  MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        String uri = "/summary/deleteSummary/55";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        String content = mvcResult.getResponse().getContentAsString();
        System.out.println(content);
        Assert.assertEquals(200, status);
    }

    @Test
    public void testGetSummaryBySearch() throws Exception {
        MockMvc mvc =  MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        String uri = "/summary/search/2021-05-11";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)).andReturn();
        int status = mvcResult.getResponse().getStatus();
        String content = mvcResult.getResponse().getContentAsString();
        ArrayList<String> searchedSummary = new ArrayList<>();
        searchedSummary.add(content);
        System.out.println(content);
        assertThat(searchedSummary).size().isGreaterThan(0);
        Assert.assertEquals(200,status);
    }

    @Test
    @Rollback(value = false)
    public void testCantDeleteSummary()
    {
        Integer id = 171;
        boolean existBeforeDelete = summaryRepository.findById(id).isPresent();
        Assert.assertFalse(existBeforeDelete);
    }

    @Test
    public void testUpdateSummary()
    {
        Double price = 4700.0;
        Summary summary = summaryRepository.findById(56).get();
        summary.setSummary(price);
        summaryRepository.save(summary);
        Assert.assertEquals(summary.getSummary(),price);
    }



}
