package tn.schult.BackendSchult.services;







import tn.schult.BackendSchult.entities.Stock;

import java.util.List;

public interface StockFunctionality {
    List<Stock> getAllStocks();
    Stock getStockById(int id);
    Stock createStock(Stock stock);
    Stock updateStock(int id, Stock stockDetails);
    void deleteStock(int id);
}
