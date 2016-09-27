# @@SHORTNAME@@

## Dev setup

- Install dependencies:
  ```
  $ cd front && npm install && bower install
  ```
- Append to your hosts file:
  ```
  127.0.0.1 @@SHORTNAME@@.dev
  127.0.0.1 assets.@@SHORTNAME@@.dev
  ```
- Append to your virtual hosts config:
  ```
  <VirtualHost *:80>
    ServerName @@SHORTNAME@@.dev
    DocumentRoot "@@PATH@@/back/public"
  </VirtualHost>
  <VirtualHost *:80>
    ServerName assets.@@SHORTNAME.dev
    DocumentRoot "@@PATH@@/front/public"
  </VirtualHost>
  ```
