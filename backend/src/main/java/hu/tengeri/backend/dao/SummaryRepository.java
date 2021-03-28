package hu.tengeri.backend.dao;

import hu.tengeri.backend.model.Summary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SummaryRepository extends JpaRepository<Summary,Integer> {
}
