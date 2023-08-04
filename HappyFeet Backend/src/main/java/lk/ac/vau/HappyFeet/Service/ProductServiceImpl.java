package lk.ac.vau.HappyFeet.Service;


import org.springframework.stereotype.Service;

import lk.ac.vau.HappyFeet.Model.Product;
import lk.ac.vau.HappyFeet.Repo.ProductRepo;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepository;

    public ProductServiceImpl(ProductRepo productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct != null) {
            existingProduct.setName(product.getName());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setImageUrl(product.getImageUrl());
            return productRepository.save(existingProduct);
        }
        return null;
    }

    @Override
    public boolean deleteProduct(Long id) {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct != null) {
            productRepository.delete(existingProduct);
            return true;
        }
        return false;
    }
}

