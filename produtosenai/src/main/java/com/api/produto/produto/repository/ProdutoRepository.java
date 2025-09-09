package com.api.produto.produto.repository;

import com.api.produto.produto.models.ProdutoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProdutoRepository extends
        JpaRepository<ProdutoModel, UUID> {

//        List<ProdutoModel> findByNome(String nome);
    List<ProdutoModel> findByNomeContainingIgnoreCase(String nome);
}
