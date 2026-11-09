# Seu portfólio — Darliene Gonçalves Maciel

## 1. Publicar gratuitamente

1. Extraia o ZIP no computador.
2. Entre no GitHub com a conta Darli-n.
3. Crie um repositório público chamado **Darli-n.github.io**. Se já existir, use o existente e confira seus arquivos antes de substituir.
4. Clique em **Add file → Upload files** e envie os arquivos extraídos e a pasta images. O index.html deve ficar diretamente na raiz do repositório, não dentro de outra pasta. Não envie o ZIP fechado.
5. Clique em **Commit changes**.
6. Abra **Settings → Pages**.
7. Em Source, selecione **Deploy from a branch**. Escolha a branch **main**, pasta **/(root)** e clique em **Save**.
8. Aguarde a publicação e use o endereço que aparecer em **Visit site**. O endereço esperado é https://darli-n.github.io/ (ainda não verificado nem publicado por este pacote).

Instruções oficiais: https://docs.github.com/pt/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 2. Seus contatos

Abra **profile.js** no GitHub e clique no lápis. Altere linkedin, email ou github, mantendo as aspas. Salve em Commit changes.

Para sua foto, envie um arquivo para images e preencha:

    photo: "images/minha-foto.jpg",

A foto aparece na seção Sobre mim. Deixe photo vazio para não mostrar foto.

## 3. Colocar fotos dos projetos

1. Abra a pasta images no GitHub.
2. Add file → Upload files → selecione a captura → Commit changes.
3. Abra **projects-data.js**, clique no lápis e encontre o projeto.
4. Troque o campo image vazio por **"images/auto-solutions.png"**, usando exatamente o nome enviado. Preencha imageAlt com uma descrição da imagem.
5. Commit changes. Ao clicar na captura no site, ela abre em tamanho maior.

Sugestão: PNG ou JPG, largura de aproximadamente 1600 pixels. O nome diferencia maiúsculas e minúsculas. As imagens iniciais são ilustrações; nenhuma captura real foi fornecida.

## 4. Adicionar um projeto

No projects-data.js, copie um objeto inteiro entre { e }, dentro da lista window.PORTFOLIO_PROJECTS. Separe os objetos com vírgula. Use MODELO-PROJETO.txt como referência.

- title: nome para mostrar no cartão.
- category: nome da categoria para exibição.
- filter: bi, sql ou ml. Use um desses valores para funcionar nos filtros existentes.
- repo: somente o nome do repositório na conta Darli-n, sem o endereço inteiro.
- description: resumo do problema e do trabalho.
- tags: ferramentas utilizadas, entre aspas e separadas por vírgulas.
- detail: contexto, etapas, conclusões e créditos de cursos, quando houver.
- image: caminho da captura ou vazio para manter a ilustração.
- imageAlt: descrição acessível da captura.
- dashboard: link público do painel ou aplicação, ou vazio para ocultar o botão.
- tint: cor de fundo hexadecimal.
- art: line, bars, table ou scatter (ilustração se image estiver vazio).

Os códigos continuam nos repositórios dos projetos. O site fornece o botão para acessá-los; não é preciso duplicar notebooks no portfólio. Arquivos .pbix não viram painéis interativos só por serem enviados: use captura e link ao repositório, ou informe o endereço de um painel publicado e acessível no campo dashboard.

## 5. Alterar textos

A apresentação e a seção Sobre mim estão no index.html. Evite alterar as marcações HTML se quiser mudar apenas o texto. O arquivo projects.js cuida da exibição; normalmente você não precisa editá-lo.

## 6. Atualizações

Depois da configuração inicial, alterações salvas na branch main disparam nova publicação. Pode levar alguns minutos. Confira Settings → Pages e a aba Actions caso não apareça.

A prévia hospedada no ChatGPT e o GitHub Pages são publicações independentes. Editar o GitHub atualiza o GitHub Pages, não a prévia do ChatGPT.

## 7. Divulgar no LinkedIn

Depois de verificar que o link abre numa janela anônima, adicione o site à seção Destaques do seu perfil. Sugestão de título: **Portfólio | Darliene Gonçalves Maciel — Dados & BI**.

Antes de divulgar, substitua as ilustrações por capturas dos seus projetos quando disponíveis e confira textos e contatos. Use dados públicos, fictícios ou anonimizados nas capturas.
