package hu.tengeri.backend.dao;

import hu.tengeri.backend.model.Summary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SummaryRepository extends JpaRepository<Summary,Integer> {

    @Query("select count(o.prodName) from Order o where o.date=:date")
    Integer summaryCount (@Param("date") String date);

    @Query("select sum(o.price) from Order o where o.date=:date")
    Double summarySum (@Param("date") String date);

    @Query("From Summary s WHERE s.date=:searchText OR s.sumId=:searchText ORDER BY s.sumId DESC")
    List<Summary> listSummaryBySearch(@Param("searchText") String searchText);
}
