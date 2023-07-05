# 升級 Wings

升級Wings並不困難，只需不到一分鐘就可以完成。

## Wings 版本需求

每個翼龍面板版本要求的最低版本Wings都不相同，具體情況可參考下方圖表，在大多數情況下Wings版本保持跟面板版本相匹配即可。

| 面板版本 | Wings版本 | 支援狀況 |
|---------------|---------------|-----------|
| 1.0.x         | 1.0.x         |           |
| 1.1.x         | 1.1.x         |           |
| 1.2.x         | 1.2.x         |           |
| 1.3.x         | 1.3.x         |           |
| 1.4.x         | 1.4.x         |           |
| 1.5.x         | 1.4.x         |           |
| 1.6.x         | 1.4.x         |           |
| 1.7.x         | 1.5.x         |           |
| 1.8.x         | 1.6.x         |           |
| 1.9.x         | 1.6.x         |           |
| **1.10.x**    | **1.7.x**     | ✅         |
| **1.11.x**    | **1.11.x**    | ✅         |

*注意：Wings 沒有 1.8.x、1.9.x 或 1.10.x 版本。*


首先，下載最新的 wings 二進位制檔案到 `/usr/local/bin`。您將需要短暫停止 Wings。 _您正在執行的伺服器**不會**受到影響。_

``` bash
systemctl stop wings
curl -L -o /usr/local/bin/wings "https://github.com/pterodactyl-taiwan/wings/releases/latest/download/wings_linux_$([[ "$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "arm64")"
chmod u+x /usr/local/bin/wings

# 若閣下在上條指令上無法正常拉取壓縮包或者拉取緩慢 可使用 gh-proxy 提供的CF反向代理來拉取
curl -L -o /usr/local/bin/wings "https://ghproxy.com/https://github.com/pterodactyl-taiwan/wings/releases/latest/download/wings_linux_$([[ "$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "arm64")"
```

## 重啟程序

最後，重啟 wings 程序。正在執行的伺服器不會受到影響，與例項的連線將會自動重新連線。

``` bash
systemctl restart wings
```
