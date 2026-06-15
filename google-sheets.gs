/**
 * Google Apps Script для записи ответов формы в Google Таблицу.
 *
 * Настройка (один раз):
 * 1. Создайте Google Таблицу: https://sheets.google.com
 * 2. Расширения → Apps Script
 * 3. Вставьте этот код, сохраните
 * 4. Запустите функцию setupSheet (разрешите доступ)
 * 5. Развернуть → Новое развертывание → Веб-приложение
 *    - Запуск от имени: Me
 *    - Кто имеет доступ: Anyone (Anyone with the link)
 * 6. Скопируйте URL веб-приложения в index.html (GOOGLE_SHEETS_URL)
 */

function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  sheet.setName('Ответы');
  sheet.clear();
  sheet.getRange(1, 1, 1, 6).setValues([[
    'Дата',
    'Время отправки',
    'Имя и Фамилия',
    'Присутствие',
    'Напитки (текст)',
    'Напитки (выбор)'
  ]]);
  sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Ответы') || ss.getSheets()[0];

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.timestamp || '',
      data.name || '',
      data.attendance || '',
      data.drinksText || '',
      data.drinks || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
