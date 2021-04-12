package hu.tengeri.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "Orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "RendID")
    private Integer rendID;

    @Column(name = "ProdName")
    private String prodName;

    @Column(name = "TableID")
    private Integer tableID;

    @Column(name = "Date")
    private String date;

    @Column(name = "Price")
    private Double price;

    @Column(name = "Status")
    private String status;

    public Order(String prodName, Integer tableID, String date, Double price, String status) {
        this.prodName = prodName;
        this.tableID = tableID;
        this.date = date;
        this.price = price;
        this.status = status;
    }

    public Order() {}

    public Integer getRendID() {
        return rendID;
    }

    public void setRendID(Integer rendID) {
        this.rendID = rendID;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public Integer getTableID() {
        return tableID;
    }

    public void setTableID(Integer tableID) {
        this.tableID = tableID;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Order{" +
                "rendID=" + rendID +
                ", prodName='" + prodName + '\'' +
                ", tableID=" + tableID +
                ", date=" + date +
                ", price=" + price +
                ", status=" + status +
                '}';
    }
}
