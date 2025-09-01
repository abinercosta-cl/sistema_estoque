import React, {useState, useEffect} from "react";
import axios from 'axios';

function ProductLists(){
    //1.Criamos nossa "caixa" (estado) para guardar a lista de produtos.
    // Começa como um array vazio.
    const [products, setProducts] = useState([]);

    //2. useEffect para buscar os dados da API quando o componente montar.
    useEffect(() => {
        //URL da nossa API
        const apiURL = 'http://localhost:3001/produtos';

        axios.get(apiURL)
      .then(response => {
        // Se a requisição for bem-sucedida...
        console.log('Dados recebidos:', response.data); // Ótimo para depurar!
        setProducts(response.data); // 3. Guardamos os dados recebidos na nossa "caixa".
      })
      .catch(error => {
        // Se houver um erro...
        console.error('Houve um erro ao buscar os produtos!', error);
      });

  }, []); // O array vazio [] significa que este efeito só roda UMA VEZ.

  // 4. Renderizamos a lista de Produtos na tela.
  return(
    <div>
        <h2>Lista de Produtos</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Código de Barras</th>
                    <th>Preço de Vendas</th>
                    <th>Estoque</th>
                </tr>
            </thead>
            <tbody>
          {/* Usamos .map() para transformar cada produto do array em uma linha da tabela */}
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nome}</td>
              <td>{product.codigo_barras}</td>
              <td>R$ {product.preco_venda}</td>
              <td>{product.quantidade_estoque}</td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}

export default ProductLists;