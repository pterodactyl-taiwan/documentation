# 建立 SSL 證書

本頁將為您介紹如何為面板和 Wings 建立新的 SSL 證書

:::: tabs
::: tab "方法1: Certbot"
首先,我們將安裝 Certbot,這是一個指令碼檔案,它可以自動更新證書並一鍵建立證書。下面的命令只適合 Ubuntu，但您可以在 [Certbot 官方網站](https://certbot.eff.org/)檢視相關安裝說明,我們這裡包含了安裝 Certbot 必要的Nginx或Apache外掛的指令,這樣媽媽再也不用擔心我需要遷移環境了!

``` bash
sudo apt update
sudo apt install -y certbot
# Nginx 外掛
sudo apt install -y python3-certbot-nginx
# Apache 外掛
sudo apt install -y python3-certbot-apache
```

## 建立證書

安裝Certbot之後我們需要生成一個證書,最簡單的方法就是安裝Web伺服器的Certbot外掛,如果沒有Web伺服器的話就需要DNS驗證了

在下面命令中,請您替換 `example.com` 域名為您自己需要生成證書的域名,當您需要申請多個域名的證書時可以在每個域名前面新增 `-d` 引數 ，列如 `-d anotherdomain.com`，當然您還可以考慮生成萬用字元證書，但本教程未涉及。

### HTTP 驗證

HTTP 驗證需要您開放伺服器 80 埠來進行驗證

``` bash
# Nginx
certbot certonly --nginx -d example.com
# Apache
certbot certonly --apache -d example.com
# 如果以上兩者都不起作用您可以試試這個,但是用之前請確保Web伺服器已經關閉
certbot certonly --standalone -d example.com
```

### DNS 驗證

DNS 驗證要求您去您的域名購買商那裡解析相應的TXT DNS記錄值以驗證域名所有權，而不必公開 80 埠。在執行下面的 certbot 命令時會顯示說明。

```bash
certbot -d example.com --manual --preferred-challenges dns certonly
```

### 自動續簽

您可以配置證書自動續簽以防止證書過期,您可以使用 `sudo crontab -e` 開啟 crontab 來新增下面的程式碼,該程式碼將在每天 23點 (晚上11點)都會檢查一遍SSL證書是否過期並嘗試續簽

部署成功後將會自動重啟 Nginx 並應用新的 SSL 證書,您可以將 `systemctl restart nginx` 中的 `nginx` 更改為 `apache` 或 `wings`

對更高階的使用者來說,我們建議使用 [acme.sh](https://acme.sh) ，它提供了更多更強大的功能

``` text
0 23 * * * certbot renew --quiet --deploy-hook "systemctl restart nginx"
```

### 疑難解答

如果您在嘗試訪問面板或 Wings 時遇到 `不安全連線` 或 SSL/TLS 相關的錯誤時,有可能是您的 SSL 證書過期了,您可以透過更新 SSL 證書來解決,如果您的 80 埠正在被佔用那就無法使用 `certbot-renew` 來完成自動續簽

如果您執行的是 Nginx,在執行 Certbot 並附帶有 `-nginx` 時出現報錯您可以先停止 Nginx 服務後來續簽證書，然後再啟動 Nginx,如果您在為 Wings 續簽證書，那你可以替換為 `wings`

停止 Nginx:

```bash
systemctl stop nginx
```

續簽證書:

```bash
certbot renew
```

在完成續簽後請使用下面的命令來重啟 Nginx:

```bash
systemctl start nginx
```
您可能還需要重新啟動 Wings，因為並非每個服務都能夠自動應用更新的證書：

```bash
systemctl restart wings
```

:::
::: tab "方法2: acme.sh (使用 Cloudflare API)"
該方法適合高階使用者和無法開放80埠的使用者, 下面的命令適用於 Ubuntu 和 Cloudflare API,您可以檢視 [acme.sh 的官方網站](https://github.com/Neilpang/acme.sh) 來獲取相關說明

``` bash
curl https://get.acme.sh | sh
```

### 獲取 Cloudflare API 金鑰

在安裝 acme 後我們需要獲取 Cloudflare 的 API 金鑰,請確保您的 DNS 記錄指向您的節點(Cloudflare 的控制檯中雲朵應該是灰色的),然後找到 API 金鑰,在全域性 API 金鑰的選項中點選檢視您的 Cloudflare 金鑰

### 申請證書

由於配置檔案基於 Certbot,所以我們需要手動建立一個資料夾

```bash
sudo mkdir /etc/letsencrypt/live/example.com
```

安裝 acme 之後執行它並獲取 Cloudflare 的 API 金鑰,然後輸入 Cloudflare 的 API 憑據來生成證書

```bash
export CF_Key="Your_CloudFlare_API_Key"
export CF_Email="Your_CloudFlare_Account@example.com"

```

然後建立證書

```bash
acme.sh --issue --dns dns_cf -d "example.com" --server letsencrypt \
--key-file /etc/letsencrypt/live/example.com/privkey.pem \
--fullchain-file /etc/letsencrypt/live/example.com/fullchain.pem
```

### 自動續簽

第一次執行指令碼後,它將自動新增到 crontab,您可以使用以下命令來編輯自動續訂間隔

```bash
sudo crontab -e
```

:::
::::
