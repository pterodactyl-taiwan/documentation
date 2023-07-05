# 使用 Docker 搭建

[[toc]]

翼龍面板執行在您自己的 Web 伺服器上。為了執行和使用這個面板，您需要對您的伺服器具有 root 訪問許可權。

您需要了解如何閱讀文件以使用此面板。我們花了很多時間詳細介紹如何安裝或升級我們的軟體；
所以你也要花點時間去閱讀而不是複製貼上，然後在事情不起作用時候而抱怨。
此面板不作為執行伺服器的拖放服務存在。
這是一個高度複雜的系統，需要多個依賴項，並且使用搭建他的網站管理人員需要付出一些時間學習如何使用它。**如果您希望能夠在不瞭解基本 linux 系統管理的情況下安裝它，您現在應該停下來然後出門左拐。**

## 選擇伺服器作業系統

翼龍可在多種作業系統上執行，因此請選擇最適合您使用的作業系統。

::: warning
由於與 Docker 不相容，翼龍不支援大多數 OpenVZ 系統。如果您計劃在基於 OpenVZ 的系統上執行此軟體，您將很大機率不會成功。  
不過本頁的教程並不會有太多的限制，只要閣下前端伺服器能裝 `Docker` 和 `Docker Compose`，就可以採用本頁教程來搭建翼龍面板前端了。一般伺服器均能滿足前端的搭建要求。   
只要能裝 **Docker Compose** 並執行，就沒有系統的限制。
:::

## 安裝 Docker

如需快速安裝 Docker 社群版，您可以執行以下命令：

```bash
curl -sSL https://get.docker.com/ | CHANNEL=stable bash
# 如果速度過慢可以嘗試阿里雲源
curl -sSL https://get.docker.com/ | CHANNEL=stable bash -s docker --mirror Aliyun
```

如果您希望手動安裝，請參考官方 Docker 文件瞭解如何在您的伺服器上安裝 Docker 社群版。下面列出了一些常用系統支援的快速連結。

- [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce)
- [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/#install-docker-ce)
- [Debian](https://docs.docker.com/install/linux/docker-ce/debian/#install-docker-ce)

::: warning 檢查你的核心
請注意，某些主機安裝了不支援 docker 重要功能的修改核心。 請透過執行 `uname -r` 檢查您的核心。 如果您的核心以 `-xxxx-grs-ipv6-64` 或 `-xxxx-mod-std-ipv6-64` 結尾，您可能使用的是不受支援的核心。 檢視我們的 [核心修改](../../../daemon/0.6/kernel_modifications.md) 指南瞭解詳細資訊。
:::

### 在啟動時啟動 Docker

如果您使用的是帶有 systemd 的作業系統（Ubuntu 16+、Debian 8+、CentOS 7+），請執行以下命令以在您啟動機器時啟動 Docker。

```bash
systemctl enable --now docker
```

## 安裝 Docker Compose

雖然 `yum` `apt` 有快速安裝的軟體包，但版本一般不是最新的。最新發行的版本地址：https://github.com/docker/compose/releases。

執行以下命令來下載 Docker Compose 的當前穩定版本：

``` bash
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 若閣下在上條指令上無法正常拉取壓縮包或者拉取緩慢 可使用 gh-proxy 提供的CF反向代理來拉取
curl -L "https://ghproxy.com/https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 將可執行許可權應用於二進位制檔案並建立軟鏈
chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

## 下載檔案
在進行此步驟之前，我們要為 `docker-compose.yml` 建立一個放置目錄。  
此過程的第一步是建立面板所在的資料夾，然後進入新建立的資料夾中。以下是如何執行此操作的示例。  
::: warning
以下命令使用的路徑僅為示例，閣下大可自己自定義路徑，但是我在此提醒您，若您不用我示例使用的路徑，請務必記住自己設定的程式所在的目錄，並在後續各種涉及到程式執行目錄的地方靈活操作！
:::

``` bash
mkdir -p /var/www/pterodactyl
cd /var/www/pterodactyl
```

在為面板建立好它的放置目錄後，我們將使用 `curl` 命令，從 Github 拉取翼龍臺灣臺灣化完成的 ` docker-compose.yml` 檔案並賦予該檔案的可執行許可權。

``` bash
curl -Lo docker-compose.yml https://raw.githubusercontent.com/pterodactyl-taiwan/panel/1.0-develop/docker-compose.example.yml
# 將可執行許可權應用於yml檔案
chmod +x docker-compose.yml
```

### 環境變數
當您不提供自己的 `.env` 檔案時，有多個環境變數可以配置面板，有關每個可用選項的詳細資訊

在 `docker-compose.yml` 檔案中可以設定，具體變數的詳細資訊可檢視 在 [GitHub 倉庫中提供的文件](https://github.com/pterodactyl-taiwan/panel/blob/1.0-develop/.github/docker/README.md) 或檢視 [Gitee 映象倉庫中提供的文件(可能不是最新的)](https://gitee.com/vlssu/pterodactyl-panel/blob/1.0-develop/.github/docker/README.md)

如果你想變更資料的儲存目錄，可以自行檢視檔案，如果你並不會或不懂，請不要更改

## 部署執行

在設定完環境變數，我們就可以透過 Docker Compose 使用 `docker-compose.yml` 檔案來啟動面板了

``` bash
# 在後臺執行該服務
# -d 引數是讓該程式在後臺執行，如果你需要排查錯誤等情況你可以去除該引數
docker-compose up -d
```

### 新增首位使用者

您需要為面板建立一個管理使用者，以便您可以登入面板。 為此，請執行以下命令。 並保證賬戶密碼滿足以下要求：8 個字元，大小寫混合，至少一個數字。

``` bash
docker-compose exec panel php artisan p:user:make
```

現在，你已經全部設定完畢，直接輸入你的網站地址，即可訪問翼龍面板

#### 下一步：[Wings (後端) 安裝](../../wings/installing.md)
