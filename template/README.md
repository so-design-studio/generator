# @@SHORTNAME@@

## Dev setup

- Install dependencies:
  ```
  bin/prep
  ```
- Append to your hosts file:
  ```
  127.0.0.1 so-@@SHORTNAME@@.dev
  127.0.0.1 assets.@@OPS_NAMESPACE@@-@@SHORTNAME@@.dev
  ```
- Append to your Apache vhosts config:
  ```
  <VirtualHost *:80>
    ServerName @@OPS_NAMESPACE@@-@@SHORTNAME@@.dev
    DocumentRoot "@@PATH@@/back/public"
  </VirtualHost>
  <VirtualHost *:80>
    ServerName assets.@@OPS_NAMESPACE@@-@@SHORTNAME@@.dev
    DocumentRoot "@@PATH@@/front/public"
  </VirtualHost>
  ```
