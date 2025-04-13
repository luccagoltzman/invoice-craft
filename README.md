# InvoiceCraft - Gerador de Faturas 

![InvoiceCraft Logo](public/favicon.ico)

Um aplicativo web moderno e elegante para criação de faturas profissionais com facilidade.

## 📋 Visão Geral

InvoiceCraft é uma solução para freelancers e pequenos negócios criarem faturas profissionais em segundos. Com uma interface intuitiva e moderna, é possível criar, visualizar e exportar faturas em formato PDF rapidamente.

## ✨ Funcionalidades

- **Criação de Faturas**: Interface amigável para inserir dados do cliente e serviços
- **Visualização em Tempo Real**: Veja a aparência da sua fatura enquanto a edita
- **Exportação para PDF**: Exporte suas faturas em formato PDF pronto para impressão
- **Design Responsivo**: Interface adaptável para todos os tamanhos de tela
- **Interface Moderna**: Design elegante com animações e transições suaves

## 🚀 Tecnologias

- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Tipagem estática para JavaScript
- **Vite**: Ferramenta de build rápida para desenvolvimento
- **React Hook Form**: Gerenciamento de formulários com validação
- **jsPDF**: Geração de documentos PDF no navegador
- **React Icons**: Biblioteca de ícones para React

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/luccagoltzman/invoice-craft.git
   cd invoice-craft
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Abra [http://localhost:5173](http://localhost:5173) para ver a aplicação no navegador.

## 🏗️ Estrutura do Projeto

```
invoice-craft/
├── public/             # Recursos estáticos
├── src/                # Código fonte
│   ├── assets/         # Imagens e outros recursos
│   ├── components/     # Componentes React reutilizáveis
│   ├── pages/          # Componentes de página
│   ├── utils/          # Funções utilitárias
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Ponto de entrada
├── index.html          # Template HTML
└── package.json        # Dependências e scripts
```

## 📝 Uso

1. Preencha os dados do cliente (nome, email, endereço).
2. Adicione os serviços prestados com suas quantidades e valores.
3. Visualize a fatura em tempo real na coluna direita.
4. Clique em "Baixar PDF" para exportar a fatura.

## 🌐 Demonstração

Acesse a [versão de demonstração](https://invoice-craft.vercel.app) para experimentar a aplicação sem necessidade de instalação.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar o projeto.

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/nome-da-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Lucca Goltzman - [GitHub](https://github.com/luccagoltzman)
