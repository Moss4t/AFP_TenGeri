package hu.tengeri.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "Summary")
public class Summary {


    public Integer getSumId() {
        return sumId;
    }

    public void setSumId(Integer sumId) {
        this.sumId = sumId;
    }

    public Integer getOrdCount() {
        return ordCount;
    }

    public void setOrdCount(Integer ordCount) {
        this.ordCount = ordCount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Double getSummary() {
        return summary;
    }

    public void setSummary(Double summary) {
        this.summary = summary;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "SumID")
    private Integer sumId;

    @Column(name = "OrderCount")
    private Integer ordCount;

    @Column(name = "Date")
    private String date;

    @Column(name = "Summary")
    private Double summary;

    public Summary(Integer ordCount, String date, Double summary){
        this.ordCount = ordCount;
        this.date = date;
        this.summary = summary;
    }

    public Summary() {}


    @Override
    public String toString() {
        return "Summary{" +
                "sumID=" +sumId +
                ", OrderCount" +ordCount +
                ", Date" +date +
                ", Summary" +summary +
                '}';
    }

}
