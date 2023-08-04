package lk.ac.vau.HappyFeet.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lk.ac.vau.HappyFeet.Model.Cart;
import lk.ac.vau.HappyFeet.Model.Product;

import java.util.List;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {

    List<Cart> findAll();

    Cart findById(long id);

    List<Cart> findByProduct(Product product);

    List<Cart> findByQuantityGreaterThan(int quantity);

    List<Cart> findByQuantityLessThan(int quantity);

    List<Cart> findByQuantityBetween(int minQuantity, int maxQuantity);
}

