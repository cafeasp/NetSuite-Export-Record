# NetSuite Sales Order Exporter (Chrome Extension)

This script is part of a Chrome Extension that allows users to export **NetSuite Sales Orders** as CSV files directly from a NetSuite record page.

## 🧩 How It Works

When you click the extension's **"Export"** button:
1. It checks if you're on a `netsuite.com` URL.
2. It appends `&xml=T` to the current tab's URL to get the XML representation of the record.
3. It fetches and parses the XML.
4. If the record type is `salesorder`, it extracts line-item data and generates a CSV file.
5. The CSV is automatically downloaded to your device.

## 🧪 Supported Record Types

Currently supports:
- `salesorder`
- `itemfulfillment`

Other record types will show a friendly error message. Developer can add other types (see popup.js line 27). Open your transaction and view the xml of the record by adding &xml=T then you can create a function similar to the sales order to pull the data.

## 📁 CSV Output

The CSV includes fields like:
- Entity Name
- Sales Order ID
- Item Details (quantity, rate, location, etc.)
- Status and other header-level metadata

## 💡 Customization

- You can adjust the fields in the `ProcessSalesOrderData` function.
- Additional record types can be added with their own processing logic in the `switch` statement in `GetData`.

## 🛠️ Technologies Used

- JavaScript (ES6+)
- `X2JS` for XML → JSON conversion
- Chrome Extension APIs

## 📸 UI Elements

- A Bootstrap spinner appears during processing.
- Friendly messages shown on error or unsupported types.

## 🔐 Permissions

Make sure your `manifest.json` includes:

"permissions": ["activeTab", "tabs"],

## 🔧 How to Install This Chrome Extension

Follow these steps to install the extension manually in Chrome:

## 📦 1. Clone or Download the Repository

git clone https://github.com/cafeasp/NetSuite-Export-Record.git

Or download it as a ZIP and extract it.

## 🧭 2. Open Chrome Extensions Page

Open Chrome

Go to: chrome://extensions/

Turn on Developer mode (top-right corner)

## 📁 3. Load the Extension

Click "Load unpacked"

Select the folder where the extension is located (the one that contains manifest.json)

## ✅ 4. Use the Extension

Navigate to a NetSuite Sales Order record

Click the "Export Record" button in the extension popup

A CSV will be downloaded with the sales order details

## 📌 Requirements

Google Chrome browser

Access to NetSuite (with records to test)

## 🚫 Uninstall

Go to chrome://extensions/ and click Remove on the extension card.