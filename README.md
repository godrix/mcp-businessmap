# MCP Businessmap

Este projeto é um servidor MCP (Model Context Protocol) não oficial para [Businessmap](https://businessmap.io) (anteriormente Kanbanize), projetado para expor um conjunto de ferramentas para gerenciar entidades relacionadas a negócios, como quadros, cartões, colunas e informações de usuários. Foi construído para facilitar a interação com Modelos de Linguagem Grande (LLMs) e aplicações similares através de um protocolo padronizado.

## Ferramentas Disponíveis

O servidor fornece as seguintes ferramentas, acessíveis via MCP:

- **Ferramentas de Limites da API**: Gerenciar e monitorar limites de uso da API.
- **Ferramentas de Quadros**: Interagir e gerenciar quadros de negócios.
- **Ferramentas de Comentários de Cartões**: Gerenciar comentários associados aos cartões.
- **Ferramentas de Co-proprietários de Cartões**: Lidar com atribuições de co-propriedade para cartões.
- **Ferramentas de Cartões Vinculados**: Gerenciar relacionamentos entre cartões vinculados.
- **Ferramentas de Subtarefas de Cartões**: Gerenciar subtarefas dentro dos cartões.
- **Ferramentas de Cartões**: Ferramentas gerais para gerenciar e interagir com cartões.
- **Ferramentas de Colunas**: Interagir e gerenciar colunas dentro dos quadros.
- **Ferramentas de Raias**: Interagir e gerenciar raias dentro dos quadros.
- **Ferramentas de Sistema**: Monitorar saúde do servidor, informações de versão e configuração do ambiente.
- **Ferramentas de Usuários**: Interagir e gerenciar usuários.
- **Ferramentas de Espaços de Trabalho**: Interagir e gerenciar espaços de trabalho.

## Recursos Disponíveis

O servidor fornece os seguintes recursos, acessíveis via MCP:

- **Informações do Usuário**: Recuperar dados sobre o usuário ativo (`user://me`).

## Começando

Para usar este servidor MCP com seu LLM, siga estes passos:

### 1. Configurar Node.js e NPM

Primeiro, certifique-se de ter o Node.js (que inclui npm) instalado em seu sistema. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

### 2. Conectar ao seu LLM

## Instalação Rápida no Cursor

[![Adicionar ao Cursor](https://img.shields.io/badge/Adicionar%20ao-Cursor-blue?style=for-the-badge&logo=cursor)](https://cursor.sh/settings/mcp)

### Configuração Rápida para Cursor

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=businessmap&config=eyJjb21tYW5kIjoibnB4IC15IGJ1c2luZXNzbWFwLW1jcCJ9)

1. **Abra o Cursor** e vá para `Configurações > Recursos > MCP`
2. **Adicione um novo servidor** com as seguintes configurações:

```json
{
  "businessmap": {
    "command": "npx",
    "args": [
      "-y",
      "businessmap-mcp"
    ]
  }
}
```

3. **Salve** e **reinicie** o Cursor
4. **Comece a usar** as ferramentas do Businessmap diretamente no chat!

### Instalação via NPM

```bash
npm install -g businessmap-mcp
```


Para conectar este servidor MCP ao seu LLM, você precisa configurá-lo em seu arquivo `mcp.json`. Este arquivo informa ao ambiente do seu LLM como descobrir e interagir com o servidor MCP.

Adicione a seguinte configuração ao seu arquivo `mcp.json`:

```json
{
  "servers": [
    {
      "name": "businessmap",
      "command": "npx",
      "args": ["businessmap-mcp", "-y"],
      "envs": {
        "BUSINESSMAP_API_URL": "https://exemplo.kanbanize.com/api/v2",
        "BUSINESSMAP_API_KEY": "sua_chave_api_businessmap"
        // "BUSINESSMAP_READ_ONLY": "true" opcional, valor padrão é false
        // "BUSINESSMAP_DEFAULT_WORKSPACE_ID": "123" opcional - Define o ID do workspace do BusinessMap
      }
    }
  ]
}
```

### Variáveis de Ambiente

#### `BUSINESSMAP_READ_ONLY`

- **Propósito**: Esta variável de ambiente opcional controla se o servidor opera apenas em modo de leitura.
- **Valor padrão**: `false` (operações de alteração são habilitadas por padrão).
- **Comportamento**: Se definida como `true`, todas as ferramentas que executam operações de alteração (como criar, atualizar e excluir cartões, comentários, co-proprietários e subtarefas) serão desabilitadas. Isso garante que o servidor apenas recupere dados e não modifique nenhuma entidade no BusinessMap.

#### `BUSINESSMAP_DEFAULT_WORKSPACE_ID`

- **Propósito**: Esta variável de ambiente opcional define o ID padrão do workspace do BusinessMap a ser usado pelo servidor.
- **Valor padrão**: `undefined` (nenhum ID de workspace padrão).
- **Comportamento**: Quando definida, este ID de workspace será usado como workspace padrão para operações que requerem um contexto de workspace. Isso pode ajudar a simplificar operações evitando a necessidade de especificar o ID do workspace repetidamente.


**Nota:**

- Substitua `"https://exemplo.kanbanize.com/api/v2"` pela URL base real da API à qual seu servidor `businessmap-mcp` precisa se conectar.
- Substitua `"sua_chave_api_businessmap"` pela sua chave de API real.
- O `command` e `args` especificam como executar o servidor MCP.
- A seção `envs` fornece as variáveis de ambiente necessárias para a operação do servidor `businessmap-mcp`.

Após configurar o `mcp.json`, seu LLM deve ser capaz de descobrir e chamar as ferramentas expostas por este servidor (ex: `Ferramentas de Quadros`, `Ferramentas de Cartões`). Consulte a documentação do seu LLM para instruções específicas sobre como carregar configurações `mcp.json`.

## Suporte e Contribuição

Se você achar este projeto útil, considere dar uma estrela ⭐ no GitHub!

### Reportar Problemas

Se você encontrar bugs ou tiver solicitações de recursos, abra uma issue na [página de Issues do GitHub](https://github.com/godrix/mcp-businessmap/issues).

### Contribuindo

Contribuições são bem-vindas! Se você gostaria de contribuir, siga estes passos:

1.  Faça um fork do repositório.
2.  Crie uma nova branch (`git checkout -b feature/nome-da-sua-feature`).
3.  Faça suas alterações e commit (`git commit -m 'Adicionar nova feature'`).
4.  Faça push para sua branch (`git push origin feature/nome-da-sua-feature`).
5.  Abra um Pull Request.

Certifique-se de que seu código segue os padrões de codificação do projeto e inclui testes apropriados.

### Mais Informações

Para mais informações sobre o Businessmap Kanbanize, visite o site oficial: [https://businessmap.io](https://businessmap.io)
