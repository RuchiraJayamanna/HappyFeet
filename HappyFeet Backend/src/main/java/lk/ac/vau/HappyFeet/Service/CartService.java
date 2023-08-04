package lk.ac.vau.HappyFeet.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import lk.ac.vau.HappyFeet.Model.Cart;
import lk.ac.vau.HappyFeet.Model.Product;

@Service
public interface CartService {
    List<Cart> getAllCartItems();
    Cart getCartItemById(Long id);
    Cart addToCart(Product product, int quantity);
    Cart updateCartItem(Long id, int quantity);
    boolean removeCartItem(Cart cart);
}
