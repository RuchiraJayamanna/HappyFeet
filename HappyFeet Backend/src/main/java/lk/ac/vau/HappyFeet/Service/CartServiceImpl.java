package lk.ac.vau.HappyFeet.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import lk.ac.vau.HappyFeet.Model.Cart;
import lk.ac.vau.HappyFeet.Model.Product;
import lk.ac.vau.HappyFeet.Repo.CartRepo;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepo cartItemRepository;

    public CartServiceImpl(CartRepo cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public List<Cart> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    @Override
    public Cart getCartItemById(Long id) {
        return cartItemRepository.findById(id).orElse(null);
    }

    @Override
    public Cart addToCart(Product product, int quantity) {
        Cart cart = new Cart(product, quantity);
        return cartItemRepository.save(cart);
    }

    @Override
    public Cart updateCartItem(Long id, int quantity) {
        Cart cart = cartItemRepository.findById(id).orElse(null);
        if (cart != null) {
            cart.setQuantity(quantity);
            return cartItemRepository.save(cart);
        }
        return null;
    }

    @Override
    public boolean removeCartItem(Cart cart) {
        if (cart != null) {
            cartItemRepository.delete(cart);
            return true;
        }
        return false;
    }
}
