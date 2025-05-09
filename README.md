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

Other record types will show a friendly error message.

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
```json
"permissions": ["activeTab", "tabs"],
