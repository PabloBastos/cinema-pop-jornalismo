# Cinema Pop

Arquivos: `index.html` (formulário da plateia), `respostas.html` (painel), `config.js`, `api.js`, `style.css`, `logo.png`.

## 1. Banco de respostas (grátis, Supabase)
O GitHub Pages só serve arquivos estáticos, então as respostas ficam no Supabase.
1. Crie um projeto em supabase.com.
2. Em **SQL Editor**, rode:

```sql
create table respostas (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  nome text not null check (char_length(nome) <= 80),
  idade int not null check (idade between 1 and 120),
  curso text not null check (char_length(curso) <= 80),
  filme text not null check (char_length(filme) <= 120),
  descricao text not null check (char_length(descricao) <= 1000)
);
alter table respostas enable row level security;
create policy "inserir" on respostas for insert to anon with check (true);
create policy "ler" on respostas for select to anon using (true);
```
3. Em **Project Settings > API**, copie a *Project URL* e a chave *anon public* e cole no `config.js`.

## 2. Hospedar no GitHub Pages
Crie um repositório, suba todos os arquivos na raiz, vá em **Settings > Pages**, escolha a branch `main` / pasta root. O formulário fica em `https://SEU-USUARIO.github.io/REPO/` e o painel em `.../respostas.html`.

## Observações
- Sem preencher o `config.js`, o site roda em modo demo (salva só no navegador), bom pra mostrar ao amigo.
- A chave anon é pública por natureza. Como o painel é estático, quem souber o link de `respostas.html` consegue ver as respostas. Para apresentação tudo bem; se precisar de algo privado, dá pra adicionar login depois.
