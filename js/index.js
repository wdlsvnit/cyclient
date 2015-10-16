'use strict';
const path = require('path');
const fs = require('fs');
const app = require('app');
const BrowserWindow = require('browser-window');
const shell = require('shell');
const Menu = require('menu');
const appMenu = require('./menu');

require('electron-debug')();
require('crash-reporter').start();

let mainWindow;


function createMainWindow() {
	const win = new BrowserWindow({
		'title': app.getName(),
		'show': false,
		'width': 400,
		'height': 600,
		'icon': path.join(__dirname, 'media', 'Icon.png'),
		'min-width': 400,
		'min-height': 600,
		'transparent': true, 
		'frame': true,
		'resizable':false,
		'title':'Cyberoam Client',
		'title-bar-style': 'hidden-inset',
		'web-preferences': {
			// fails without this because of CommonJS script detection
			'node-integration': false,
			'preload': path.join(__dirname, 'browser.js'),
			'preload': path.join(__dirname, 'jquery.js'),
			'preload': path.join(__dirname, 'main.js'),
			'preload': path.join(__dirname, 'cy.js'),
			'web-security': false,
			'plugins': true
		}
	});
	win.setTitle("title");
	win.loadUrl('http://172.50.1.1:8090/httpclient.html');
	win.on('closed', app.quit);
	// win.on('page-title-updated', (e, title) => updateBadge(title));
	return win;
}

app.on('ready', () => {
	Menu.setApplicationMenu(appMenu);

	mainWindow = createMainWindow();

	const page = mainWindow.webContents;

	page.on('dom-ready', () => {
		page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
		page.insertCSS(fs.readFileSync(path.join(__dirname, 'sweet.css'), 'utf8'));
		page.executeJavaScript(fs.readFileSync(path.join(__dirname, 'jquery.js'), 'utf8'));
		page.executeJavaScript(fs.readFileSync(path.join(__dirname, 'main.js'), 'utf8'));
		page.executeJavaScript(fs.readFileSync(path.join(__dirname, 'sweet.js'), 'utf8'));
		mainWindow.show();
	});

	page.on('did-finish-load',() => {  
    mainWindow.setTitle("Cyberoam Client");
});


	page.on('did-fail-load',() => {  
 
    console.log("Failed to load");
});


	page.on('new-window', (e, url) => {
		e.preventDefault();
		shell.openExternal(url);
	});
});



 
