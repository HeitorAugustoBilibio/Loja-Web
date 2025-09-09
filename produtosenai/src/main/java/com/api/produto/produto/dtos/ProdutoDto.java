package com.api.produto.produto.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProdutoDto {
    @NotBlank(message = "O nome é obrigatório")
    private String nome;
    private String descricao;
    @NotNull(message = "O preço é obrigatório")
    @Min(value = 1, message = "O preço deve ser maior a zero")
    private double preco;
}
