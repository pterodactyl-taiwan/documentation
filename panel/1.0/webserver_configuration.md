# 網路伺服器配置

::: warning
使用 SSL 配置時，您必須建立 SSL 證書，否則您的網路伺服器將無法啟動。請參閱 [建立 SSL 證書](/tutorials/creating_ssl_certificates.html) 文件頁面以瞭解如何在繼續之前建立這些證書。
:::

:::: tabs
::: tab "使用 SSL 的 Nginx"
首先，刪除預設的 NGINX 配置。

``` bash
rm /etc/nginx/sites-enabled/default
```

現在，您應該複製下面檔案的內容，將 `<domain>` 替換為您使用的域名後，貼上到名為 `pterodactyl.conf` 的檔案中，並將該檔案放在 `/etc/nginx/sites-available/` 目錄下， 或 &mdash; 如果在 CentOS 上，則為 `/etc/nginx/conf.d/`。

<<< @/.snippets/webservers/nginx-php8.1.conf{5,11,26-27}

### 啟用配置

最後一步是啟用 NGINX 配置並重新啟動它。

```bash
# 如果您使用的是 CentOS，則不需要符號連結此檔案。
sudo ln -s /etc/nginx/sites-available/pterodactyl.conf /etc/nginx/sites-enabled/pterodactyl.conf

# 無論作業系統如何，您都需要重新啟動 nginx。
sudo systemctl restart nginx
```

:::
::: tab "沒有使用 SSL 的 Nginx"
首先，刪除預設的 NGINX 配置。

``` bash
rm /etc/nginx/sites-enabled/default
```

現在，您應該複製下面檔案的內容，將 `<domain>` 替換為您使用的域名後，貼上到名為 `pterodactyl.conf` 的檔案中，並將該檔案放在 `/etc/nginx/sites-available/` 目錄下， 或 &mdash; 如果在 CentOS 上，則為 `/etc/nginx/conf.d/`。

<<< @/.snippets/webservers/nginx-php8.1-nossl.conf{4}

### 啟用配置

最後一步是啟用 NGINX 配置並重新啟動它。

```bash
# 如果您使用的是 CentOS，則不需要符號連結此檔案。
sudo ln -s /etc/nginx/sites-available/pterodactyl.conf /etc/nginx/sites-enabled/pterodactyl.conf

# 無論作業系統如何，您都需要重新啟動 nginx。
sudo systemctl restart nginx
```

:::
::: tab "使用 SSL 的 Apache"
首先，刪除預設的 Apache 配置。

``` bash
a2dissite 000-default.conf
```

現在，您應該複製下面檔案的內容，將 `<domain>` 替換為您使用的域名後，貼上到名為 `pterodactyl.conf` 的檔案中，並將該檔案放在 `/etc/apache2/sites-available` 目錄下， 或 &mdash; 如果在 CentOS 上，則為 `/etc/httpd/conf.d/`。

注意：使用 Apache 時，請確保您已安裝 `libapache2-mod-php` 包，否則 PHP 將不會顯示在您的網路伺服器上。

<<< @/.snippets/webservers/apache.conf{2,10,24-25}

### 啟用配置

建立上面的檔案後，只需執行以下命令。如果你在 CentOS 上_你不需要執行下面的命令！_你只需要執行 `systemctl restart httpd`。

```bash
# 你不需要在 CentOS 上執行這部分的任何命令
sudo ln -s /etc/apache2/sites-available/pterodactyl.conf /etc/apache2/sites-enabled/pterodactyl.conf
sudo a2enmod rewrite
sudo a2enmod ssl
sudo systemctl restart apache2
```

:::
::: tab "沒有使用 SSL 的 Apache"
首先，刪除預設的 Apache 配置。

``` bash
a2dissite 000-default.conf
```

現在，您應該複製下面檔案的內容，將 `<domain>` 替換為您使用的域名後，貼上到名為 `pterodactyl.conf` 的檔案中，並將該檔案放在 `/etc/apache2/sites-available` 目錄下， 或 &mdash; 如果在 CentOS 上，則為 `/etc/httpd/conf.d/`。

注意：使用 Apache 時，請確保您已安裝 `libapache2-mod-php` 包，否則 PHP 將不會顯示在您的網路伺服器上。

<<< @/.snippets/webservers/apache-nossl.conf{2}

### 啟用配置

建立上面的檔案後，只需執行以下命令。如果你在 CentOS 上_你不需要執行下面的命令！_你只需要執行 `systemctl restart httpd`。

```bash
# 你不需要在 CentOS 上執行這部分的任何命令
sudo ln -s /etc/apache2/sites-available/pterodactyl.conf /etc/apache2/sites-enabled/pterodactyl.conf
sudo a2enmod rewrite
sudo systemctl restart apache2
```

:::
::::

#### 下一步：[Wings (後端) 安裝](../../wings/installing.md)
