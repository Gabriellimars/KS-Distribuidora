# Login Google — KS Distribuidora

Implementação: Better Auth 1.7.7, sessões por cookie HttpOnly e banco Cloudflare D1.
O nome e o e-mail vêm da conta Google; telefone e endereço são informados pelo cliente.
O histórico mostra somente pedidos novos feitos após o login. Pedidos antigos não são vinculados por nome ou e-mail.

## Ativação pelo responsável da distribuidora

1. Abra https://console.cloud.google.com/ e crie um projeto chamado KS Distribuidora.
2. Em Google Auth Platform, configure Branding: nome do aplicativo, e-mail de suporte e e-mail do responsável.
3. Em Audience, selecione External. Durante os testes, adicione os e-mails autorizados como usuários de teste.
4. Em Clients, crie um cliente OAuth do tipo Web application.
5. Cadastre a origem do site e a URI de retorno exata:
   - Desenvolvimento: origem http://localhost:5173 e retorno http://localhost:5173/api/auth/callback/google
   - Produção: origem do domínio definitivo e retorno https://SEU-DOMINIO/api/auth/callback/google
6. Use apenas os escopos openid, email e profile. Não é necessário acesso ao Gmail ou Google Drive.
7. Configure as variáveis no servidor pelo painel de hospedagem; nunca cole o Client Secret no chat ou no código:
   - GOOGLE_CLIENT_ID: ID fornecido pelo Google.
   - GOOGLE_CLIENT_SECRET: secret fornecido pelo Google.
   - BETTER_AUTH_SECRET: segredo aleatório com pelo menos 32 caracteres.
   - BETTER_AUTH_URL: origem exata do site, sem caminho e sem barra final.
8. Publique novamente após configurar as variáveis. Teste login, edição do endereço, novo pedido, histórico e logout com duas contas distintas.

O endereço atual do Sites é https://ks-distribuidora-coimbra.auroracocoa8.chatgpt.site.
A hospedagem permanece privada; sua autenticação de acesso do Sites continua independente da conta Google do cliente.
Antes de configurar o Google em produção, confirme no Google Cloud a aceitação do domínio e os requisitos de verificação.
Caso o Google exija comprovação de domínio, use um domínio próprio da distribuidora e atualize a origem e a URI acima.
Não há credenciais Google configuradas nesta entrega, portanto o botão informa que a ativação está pendente.

## Dados e segurança

As migrations criam tabelas de usuários, contas Google, sessões, verificações, limite de requisições e endereço salvo.
Cada pedido tem um user_id opcional determinado pela sessão validada no servidor.
Consultar, salvar e remover endereço exige sessão válida; o usuário não pode enviar o ID de outro cliente.
Dados da conta não são guardados no localStorage. Respostas pessoais não são armazenadas em cache.
Salvar endereço no delivery exige a opção explícita do cliente; a área Minha conta tem um botão próprio para salvar.
Remover dados salvos apaga telefone/endereço do perfil, mas não apaga registros de pedidos já enviados.

Referências oficiais:
https://better-auth.com/docs/authentication/google
https://better-auth.com/docs/adapters/drizzle
https://developers.google.com/identity/protocols/oauth2/web-server
