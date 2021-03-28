package hu.tengeri.backend.service;

import hu.tengeri.backend.dao.SummaryRepository;
import hu.tengeri.backend.model.Summary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SummaryService {

    @Autowired
    SummaryRepository summaryRepository;

    //read
    public List<Summary> getAllData() {return summaryRepository.findAll();}
    public Summary getSummaryById(int id) { return summaryRepository.findById(id).get();}

    //create
    public Summary createSummary(Summary summary){
        return summaryRepository.save(summary);
    }

    //delete
    public String deleteSummary(int id){
        summaryRepository.deleteById(id);
        return "Summary removed!"+id;
    }

    //update
    public Summary updateSummary(Summary summary){
        Summary existingSummary = summaryRepository.findById(summary.getSumId()).orElse(null);
        existingSummary.setOrdCount(summary.getOrdCount());
        existingSummary.setDate(summary.getDate());
        existingSummary.setSummary(summary.getSummary());
        return summaryRepository.save(existingSummary);
    }
}
