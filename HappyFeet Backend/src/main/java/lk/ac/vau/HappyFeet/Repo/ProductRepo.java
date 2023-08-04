package lk.ac.vau.HappyFeet.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lk.ac.vau.HappyFeet.Model.Product;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    List<Product> findByPriceGreaterThan(double price);
    List<Product> findByNameContainingIgnoreCase(String name);
    
}

