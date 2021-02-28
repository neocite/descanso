# descanso

Que tal fazer uma pausa e se exercitar? Uma aplicação feita em reactjs + nextjs que pode ser acessada através do endereço https://descanso.vercel.app

## Como usar localmente

#### Rodando os testes

ixi, que feio! ainda não fiz os testes :(

```
npm test
```

#### Rodando a aplicação localmente

```
yarn install

yarn dev
```

#### Fazendo o deploy na Vercel

Crie uma conta em vercel.com

Vá até o diretório da aplicação e digite o seguinte comando

```
vercel login 
```

```
vercel
```

#### Estrutura do aplicação

###### Pasta public
Contém todos os arquivos públicos da aplicação (imagens, audios e etc)

###### Pasta components
Contém todos os componentes REACT que podem ser reutilizados em toda a aplicação.

###### Pasta context
Contém todos os gerenciadores de contexto. É uma maneira de fazer comunicação entre os componentes da aplicação

###### Pasta pages
##### _app.tsx_
Contém o conteúdo principal do aplicativo. Tudo que estiver contido neste arquivo poderá ser utilizado por toda aplicação

##### _document.tsx_
Documento principal da aplicação. Aqui você pode incluir tags HTMLs que serão comuns em todas as páginas

##### index.tsx_
Rota principal da aplicação. Aqui você monta os componentes da sua página.

```
getServerSideProps - método que roda do lado do servidor do next
```

###### Pasta styles
Contém os arquivos de CSS da aplicação

