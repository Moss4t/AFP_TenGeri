package hu.tengeri.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "Warehouse")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ProdID")
    private Integer prodId;

    @Column(name = "ProdName")
    private String prodName;

    @Column(name = "ProdCount")
    private Double prodCount;

    @Column(name = "WarehouseName")
    private String warehouseName;

    public Integer getProdId() {
        return prodId;
    }

    public void setProdId(Integer prodId) {
        this.prodId = prodId;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public Double getProdCount() {
        return prodCount;
    }

    public void setProdCount(Double prodCount) {
        this.prodCount = prodCount;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public Warehouse(String prodName, Double prodCount, String warehouseName){
        this.prodName = prodName;
        this.prodCount = prodCount;
        this.prodName = prodName;
    }

    public Warehouse() {}

    @Override
    public String toString(){
        return "Warehouse{" +
                "ProdID=" + prodId +
                ", ProdName=" + prodName +
                ", ProdCount=" + prodCount +
                ", WarehouseName=" + warehouseName +
                '}';
    }
}
