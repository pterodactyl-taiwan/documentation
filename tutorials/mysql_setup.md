# 配置 MySQL
[[toc]]


## 為翼龍建立資料庫
MySQL 是翼龍面板的核心元件，但如果你以前沒有配置過 MySQL，你可能會在配置的過程中感到混亂。這是一個非常基礎的教程，只說明如何使用 MySQL 為面板配置好一個資料庫。如果你有興趣學習更多關於 MySQL 的知識，可以在網上找到很多很好的教程。

### 登入
首先我們需要登入到 MySQL 的命令列，我們需要在此命令列執行一些語句來配置資料庫。登入到 MySQL 命令列十分簡單，只需要輸入下面的命令，然後提供安裝 MySQL 時設定的 root 賬戶密碼。若沒有設定密碼，您很可能只需按 Enter (回車) 鍵，因為沒有設定密碼

``` bash
mysql -u root -p
```

### 建立使用者
為了安全和適應 MySQL 5.7 的改變，你需要為面板建立一個新使用者，為了做到這一點，我們需要讓 MySQL 知道 mysql 資料庫資訊。

接下來，我們會建立一個名為 `pterodactyl` 的使用者，並允許從 localhost 登入，你也可以用 `%` 來允許所有IP登入或者輸入數字IP。同樣的，我們還將密碼設定為 `somePassword`。

``` sql
# 記得將下面的 'somePassword' 設為特定於此賬號的獨有密碼。
CREATE USER 'pterodactyl'@'127.0.0.1' IDENTIFIED BY 'somePassword';
```

### 建立資料庫
接下來, 我們需要為面板建立一個資料庫. 在本教程中，我們會把資料庫命名為 `panel`, 但你也可以將此資料庫命名為其他名字。

``` sql
CREATE DATABASE panel;
```

### 分配許可權
最後，我們需要讓 MySQL 知道，翼龍使用者有許可權訪問去訪問此資料庫。要做到這一點，我們只需要執行下面的命令。如果你還想把這個 MySQL 用於面板上的資料庫主機。你只需要在命令中加入 `WITH GRANT OPTION` (下面的命令已增加此選項)。如果你不打算把這個使用者用作面板上的資料庫主機，則可以將其刪除。

``` sql
GRANT ALL PRIVILEGES ON panel.* TO 'pterodactyl'@'127.0.0.1' WITH GRANT OPTION;
```

## 為節點建立資料庫主機
:::tip
本節介紹如何建立一個具有建立和修改使用者許可權的 MySQL 使用者，這允許面板在給定主機上建立每個伺服器的資料庫。
:::

### 建立使用者
如果您的資料庫與面板或者守護程序安裝在不同的主機上，請確保使用面板執行的主機IP地址(或者直接使用萬用字元 `%`)而不是 `127.0.0.1`。 否則你會收到一個連線拒絕的錯誤。

```sql
# 記得把 'pterodactyluser' 和 'somePassword' 設為獨有的賬號密碼。
CREATE USER 'pterodactyluser'@'127.0.0.1' IDENTIFIED BY 'somepassword';
```

### 分配許可權
下面的命令將使你新建立的使用者具備建立其他使用者，以及建立和銷燬資料庫的能力。如上所述，確保 `127.0.0.1` 換成跟上面命令中使用的 IP 地址同樣喔~

```sql
GRANT ALL PRIVILEGES ON *.* TO 'pterodactyluser'@'127.0.0.1' WITH GRANT OPTION;
```

### 允許外部訪問資料庫
你有可能需要允許外部訪問這個 MySQL 例項，以便允許伺服器連線到它。要做到這一點，我們需要修改 `my.cnf` 來達到這個目的，它的位置取決於你的作業系統和 MySQL 安裝方式，你可以輸入 `find /etc -iname my.cnf` 來找到它。

開啟 `my.cnf`，將下面的文字新增到檔案底部並儲存：
```
[mysqld]
bind-address=0.0.0.0
```
重啟 MySQL/MariaDB 以應用這些變化。這將覆蓋預設的 MySQL 配置，在預設情況下，它只接受來自 localhost 的請求。更新這個將允許所有介面的連線，因此也允許外部連線。請確保在你的防火牆中允許 MySQL 埠（預設為3306）。

如果你的資料庫和 Wings 在同一臺主機上，並且不需要外部訪問，你也可以使用 `docker0` 介面的IP地址而不是 `127.0.0.1`。這個IP地址可以透過執行 `ip addr | grep docker0` 找到，它可能看起來像 `172.x.x.x`。
