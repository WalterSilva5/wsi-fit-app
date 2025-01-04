#Wsi FIT App

# WSI Angular Front

## Descrição
O **WSI Angular Front** é uma aplicação frontend desenvolvida em Angular para gerenciar rotinas de treinos de academias. Esta aplicação permite aos usuários (alunos, instrutores e administradores) gerenciar informações de treinos, exercícios e grupos musculares.

---

## Recursos Principais
- **Cadastro de usuários**: Suporte para diferentes papéis (aluno, instrutor, administrador).
- **Gestão de grupos musculares**: Visualização e edição de informações como nome e imagens.
- **Gestão de exercícios**: Controle detalhado dos exercícios, incluindo vídeos, descrições e vinculação a grupos musculares.
- **Gestão de treinos**: Criação de rotinas de treino personalizadas e vinculação a usuários.
- **Visualização de dados**: Gráficos e tabelas interativas para melhor acompanhamento do progresso.

---

## Tecnologias Utilizadas

### Frontend
- **Angular 18**: Framework principal.
- **Angular Material** e **Bootstrap 5.3**: Para estilização e componentes visuais.
- **NgRx**: Gerenciamento de estado.
- **Chart.js** e **Ng2-Charts**: Visualização de dados com gráficos.
- **ngx-charts**: Gráficos adicionais.
- **SweetAlert2**: Notificações e alertas estilizados.
- **Papaparse** e **jsPDF**: Exportação de dados em CSV e PDF.

### Backend (Integração)
- **Prisma ORM**: Gerenciamento do banco de dados MySQL.
- **Nestjs**: Servidor backend.
- **MySQL**: Banco de dados para armazenamento das informações.

---

## Estrutura do Projeto

### Scripts Disponíveis
- `start`: Inicia a aplicação em modo de produção.
- `start:dev`: Inicia a aplicação em modo de desenvolvimento com observação de mudanças.
- `build`: Realiza o build para produção.
- `test`: Executa os testes unitários.
- `serve:ssr:test`: Executa o servidor SSR (Server-Side Rendering) para teste.

### Estrutura de Modelos no Backend
1. **Usuário (`User`)**: Representa os usuários com diferentes papéis (aluno, instrutor, administrador).
2. **Grupo Muscular (`MuscleGroup`)**: Gerencia informações sobre grupos musculares e suas imagens.
3. **Exercício (`Exercise`)**: Representa os exercícios vinculados a grupos musculares.
4. **Treino (`Workout`)**: Define as rotinas de treino associadas a usuários e exercícios.
5. **Exercícios de Treino (`WorkoutExercise`)**: Associação entre treinos e exercícios.

---

## Configuração e Execução

### Requisitos
- Node.js (v18+)
- Angular CLI (v18+)
- MySQL

### Passos para Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/WalterSilva5/wsi-fit-app
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd wsi-angular-front
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure a URL do banco de dados no backend:
   Defina a variável `DATABASE_URL` no arquivo `.env` do backend com os dados do banco MySQL.

5. Inicie o servidor backend.
6. Execute a aplicação frontend:
   ```bash
   npm run start
   ```

---

## Contribuição
Contribuições são bem-vindas! Por favor, siga as seguintes etapas:
1. Crie um fork do repositório.
2. Crie uma nova branch para suas alterações:
   ```bash
   git checkout -b minha-feature
   ```
3. Envie suas alterações:
   ```bash
   git commit -m "Minha feature"
   ```
4. Submeta um Pull Request.

---

## Licença
Este projeto está licenciado sob os termos da [GPLv3](LICENSE).

---

## Contato
Para dúvidas ou suporte, entre em contato através de minhas redes:
- [LinkedIn](https://www.linkedin.com/in/walter-pereira-245067161)
- [GitHub](https://github.com/waltersilva5)
- [Instagram](https://www.instagram.com/walterpsilva28/)

---

