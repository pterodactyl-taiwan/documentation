# 構建面板資源

:::warning
**請勿在您的生產**節點上執行以下步驟。
:::

在 [BUILDING.md](https://github.com/pterodactyl-taiwan/panel/blob/develop/BUILDING.md) 檔案中也提供了有關如何構建面板的說明。

面板的前端是用 React 構建的。對原始檔所做的任何更改都需要重新編譯。
這也適用於樣式表。以下部分解釋瞭如何執行此操作。

## 安裝依賴項

以下命令將安裝必要的依賴項以構建面板資源。

構建工具需要 NodeJS，使用 yarn 作為包管理器。

```bash
# Ubuntu/Debian
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt install -y nodejs

# CentOS
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs yarn # CentOS 7
sudo dnf install -y nodejs yarn # CentOS 8
```

安裝所需的 JavaScript 軟體包。

```bash
npm i -g yarn # 安裝 Yarn

cd /var/www/pterodactyl
yarn # 安裝面板構建依賴項
```

## 構建面板資源

以下命令將重建面板前端。 對於 NodeJS 版本 17 及更高版本，您必須在構建之前啟用 `--openssl-legacy-provider` 選項。

```bash
cd /var/www/pterodactyl
export NODE_OPTIONS=--openssl-legacy-provider # 對於 NodeJS v17+
yarn build:production # 構建面板
```

您可以使用 `yarn run watch` 命令，可以幾乎實時地檢視更改進度，以便於開發。一旦您對此更改感到滿意，可以使用前面提到的 `yarn build:production` 命令構建面板。
