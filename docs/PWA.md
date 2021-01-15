# Progressive Web Apps (PWA)

O conceito de **Progressive Web Apps (PWA)** é um método de desenvolvimento de software criado para melhorar a forma como o usuário vive a sua experiência online diminuindo a barreira entre aplicativos nativos e híbridos. Através da combinação dos recursos modernos oferecidos pelos navegadores e com as vantagens de uso em celular, o site se torna mais "app" a medida que o usuário vai se engajando e interagindo com a aplicação. Com PWA, basta adicionar o Web App à sua página inicial e ele passa a adquirir funções que antes eram exclusivas de aplicativos nativos: geolocalização, notificações, uso off-line, etc.

## Características

- **Progressivo –** Funciona para qualquer usuário, independentemente do navegador escolhido, pois é criado com aprimoramento progressivo como princípio fundamental.
- **Responsivo –** Se adequa a qualquer formato: desktop, tablet, ou o que for inventado a seguir.
- **Independente de conectividade –** Aprimorado com service-workers para trabalhar off-line ou em redes de baixa qualidade.
- **Semelhante a aplicativos –** Parece com aplicativos para os usuários, com interações e navegação de estilo de aplicativos, pois é compilado no modelo shell de aplicativo.
- **Atual –** Sempre atualizado graças ao processo de atualização do service worker.
- **Seguro –** Fornecido via HTTPS para evitar invasões e garantir que o conteúdo não seja adulterado.
- **"Descobrível" –** Pode ser identificado como "aplicativo" graças aos manifestos W3C e ao escopo de registro do service worker, que permitem que os mecanismos de pesquisa os encontrem.
- **Reenvolvente –** Facilita o reengajamento com recursos como notificações de push.
- **Instalável –** Permite que os usuários "guardem" os aplicativos mais úteis em suas telas sem precisar acessar uma loja de aplicativos.
- **"Linkável" –** Compartilhe facilmente por URL, não requer instalação complexa.

## Vantagens

- Acesso à capacidades oferecidas pelos navegadores para entregar ao usuário uma experiência tão boa quando a de um app nativo, sem precisar de um casco de HTML5 para ser instalado em uma App Store. O site [What Web Can Do Today](https://whatwebcando.today/) possui uma lista com as capacidades de hardware que podem ser acessadas via navegador e o que ainda está em desenvolvimento.
- Com relação às aplicações nativas, o custo de distribuição para o público-alvo é baixo, uma vez que a aplicação web progressiva já estará online e acessível a partir de qualquer dispositivo. Por ser instalável, também elimina a necessidade de ir à App Store, procurar o app, fazer o download, clicar em Instalar e abrir a aplicação.
- Conteúdo pode ser facilmente encontrado por engines de busca. Qualquer página pode ter seu conteúdo acessado e compartilhado com facilidade. Os links podem ser salvos e acessados diretamente na view de aplicação. O conteúdo estará sempre atualizado, sem a necessidade de passar pela aprovação da App Store.
- O custo de desenvolvimento é menor, uma vez que apenas uma plataforma precisará ser desenvolvida e atualizada constantemente para ser acessada por múltiplos dispositivos.
- Economia de espaço do dispositivo móvel, dado que utiliza o cache para fazer o armazenamento off-line dados e na maior parte do tempo quando estiver conectado acessará o conteúdo a partir da web.

## Estrutura básica de um PWA

### Shell da Aplicação (App Shell)

É o padrão de arquitetura utilizado na criação de aplicativos PWA para carregar o conteúdo de forma confiável e instantânea na tela do usuário, e com uma interface similar a que se vê em aplicativos nativos. Para mais informações, clique [aqui](./PWA_APP_SHELL.md) para acessar a sessão da documentação.

### Manifesto do Aplicativo Web (Web App Manifest)

O arquivo manifesto é o que nos permite deixar nossa aplicação web mais parecida com um aplicativo mobile. Ele é apenas um arquivo no formato JSON que segue as orientações da [W3C](https://w3c.github.io/manifest/) para fornecer metadados associados à aplicação web. Esses metadados costumam incluir o nome da aplicação, seus ícones, como também a url preferida para abrir quando o usuário dispara a aplicação. O manifesto também permite aos desenvolvedores definir qual a orientação do app, bem como seu modo de exibição (i.e., fullscreen, standalone...).

Através desse arquivo é possível exibir o site ou app web em áreas que normalmente espera-se ver aplicativos nativos, definir o que o usuário pode inicializar e o visual durante a inicialização. Para mais informações, clique [aqui](./PWA_APP_MANIFEST.md) para acessar a sessão da documentação.

### Service Workers

[Service workers](https://github.com/w3c/ServiceWorker/blob/master/explainer.md) são um recurso utilizado para fazer o armazenamento do shell do aplicativo no cache do navegador, eles podem ser feitos manualmente ou gerados dinamicamente por alguma ferramenta como o Angular-CLI.

Para gerar um service worker manual basta criar um nome para cache, um vetor contendo os nomes dos arquivos que deverão ser cacheados e acrescentar um listener para identificar o evento de instalação e executar o processo de cacheamento utilizando a [API Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache). Porém alguns sites podem ser muito grandes e ter muito conteúdo para cachear, então escrever o service worker manualmente acaba se tornando muito custoso. Devemos levar em consideração também que o arquivo do service worker deve ser atualizado constantemente conforme a lista de arquivos a serem cacheados é atualizada e a sua não atualização pode causar problemas na experiência final do usuário. Para evitar isso, costuma-se utilizar bibliotecas para gerar os service-workers de forma dinâmica e manter a lista de arquivos sempre atualizada. Para mais informações acesse a seção [Service Workers](./PWA_SW.md) da documentação.

## Próximos passos

- [Shell da Aplicação](./PWA_APP_SHELL.md)
- [Web App Manifest](./PWA_APP_MANIFEST.md)
- [Service Workers](./PWA_SW.md)
