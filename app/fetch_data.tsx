'use server'
import { google } from 'googleapis';

const SHEET_ID = process.env.SHEET_ID;
const RANGE = process.env.RANGE;
const SERVICE_ACCOUNT = process.env.SERVICE_ACCOUNT;
const PRIVATE_KEY = process.env.PRIVATE_KEY?.replace(/\\n/g, "\n");

export async function fetchSheetData() {
    try {
        const auth = new google.auth.JWT(SERVICE_ACCOUNT, undefined, PRIVATE_KEY, [
        "https://www.googleapis.com/auth/spreadsheets",
        ]);
        
  
        const sheets = google.sheets({ version: 'v4', auth });
        const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE,
      });
  
      return response.data.values;
    } catch (err) {
      console.error('The API returned an error: ' + err);
      return [];
    }
  }

export async function updateSheetData(shortcut: string, expansion: string) {
    try {
      const auth = new google.auth.JWT(SERVICE_ACCOUNT, undefined, PRIVATE_KEY, [
        "https://www.googleapis.com/auth/spreadsheets",
      ]);
  
      const sheets = google.sheets({ version: 'v4', auth });
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: RANGE,
        valueInputOption: "RAW",
        requestBody: {
          values: [[shortcut, expansion]],
        },
      });
      
  } catch (err) {
    console.error('The API returned an error: ' + err);
  }
}

export async function deleteSheetData(shortcut: string) {
    try {
      const auth = new google.auth.JWT(SERVICE_ACCOUNT, undefined, PRIVATE_KEY, [
        "https://www.googleapis.com/auth/spreadsheets",
      ]);
  
      const sheets = google.sheets({ version: 'v4', auth });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE,
      });
  
      const rows = response.data.values;
      if (rows) {
        const newRows = rows.filter((row) => row[0] !== shortcut);
        await sheets.spreadsheets.values.clear({
          spreadsheetId: SHEET_ID,
          range: RANGE,
        });
    
        await sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: RANGE,
          valueInputOption: "RAW",
          requestBody: {
            values: newRows,
          },
        });
      } 
      }
    catch (err) {
      console.error('The API returned an error: ' + err);
    }
  
      
  }