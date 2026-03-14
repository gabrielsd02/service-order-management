# Sobre

O projeto mobile tem como objetivo conseguir realizar as alterações de forma offline (via banco local) e online (via api).
O aplicativo é sobre o gerenciamento de ordens de serviço, onde o usuário consegue listar, cadastrar, atualizar e excluir as ordens de serviço.

# Tecnologias utilizadas

As tecnologias utilizadas foram: [**React Native**](https://reactnative.dev) com [**Typescript**](https://www.typescriptlang.org/), 
**Realm** para armazenar dados locais, **Zustand** para o gerenciamento de estados globais. 
Também foi utilizado o [**Async Storage**](https://react-native-async-storage.github.io/2.0/) para armazenar dados em cache.

# Para iniciar o APP

Você deve ter o node (versão >= 22.11.0) e o java (versão jsk 17) instalados em sua máquina.

Executar o seguinte comando para instalar as bibliotecas do projeto:
```sh
# Usando npm
npm install
# ou
# Usando yarn
yarn install
```

Após isso, executar: 
```sh
# Usando npm
npm start
# ou
# Usando yarn
yarn start

# Usando npm
npm android
# ou
# Usando yarn
yarn android
```

Após executar estes comandos, irá iniciar o app em seu dispositivo!