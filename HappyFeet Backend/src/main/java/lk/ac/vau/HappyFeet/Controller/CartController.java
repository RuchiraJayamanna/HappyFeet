package lk.ac.vau.HappyFeet.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lk.ac.vau.HappyFeet.Model.Cart;
import lk.ac.vau.HappyFeet.Model.CartRequest;
import lk.ac.vau.HappyFeet.Model.Product;
import lk.ac.vau.HappyFeet.Service.CartService;
import lk.ac.vau.HappyFeet.Service.ProductService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final ProductService productService;

    public CartController(CartService cartService, ProductService productService) {
        this.cartService = cartService;
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Cart>> getAllCartItems() {
        List<Cart> carts = cartService.getAllCartItems();
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCartItemById(@PathVariable Long id) {
        Cart cart = cartService.getCartItemById(id);
        if (cart == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Cart> addToCart(@RequestBody CartRequest cartRequest) {
        Long productId = cartRequest.getProductId();
        int quantity = cartRequest.getQuantity();

        Product product = productService.getProductById(productId);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Cart addedCartItem = cartService.addToCart(product, quantity);
        return new ResponseEntity<>(addedCartItem, HttpStatus.CREATED);
    }
    
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long id) {
        Cart cart = cartService.getCartItemById(id);
        if (cart == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        boolean removed = cartService.removeCartItem(cart);
        if (removed) {
           
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
           
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }   
}
