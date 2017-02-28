# @@NAME@@

## Dev setup

- Install dependencies:

```
bin/prep
```

- Append to your hosts file:

```
127.0.0.1 so-@@NAME@@.dev
127.0.0.1 assets.@@OPS_NAMESPACE@@-@@NAME@@.dev
```

- Append to your Apache vhosts config (make sure you change the paths):

```
<VirtualHost *:80>
  ServerName @@OPS_NAMESPACE@@-@@NAME@@.dev
  DocumentRoot "<PATH>/@@NAME@@/back/public"
</VirtualHost>
<VirtualHost *:80>
  ServerName assets.@@OPS_NAMESPACE@@-@@NAME@@.dev
  DocumentRoot "<PATH>/@@NAME@@/front/public"
</VirtualHost>
```
