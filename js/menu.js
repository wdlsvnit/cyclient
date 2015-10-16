'use strict';
const os = require('os');
const app = require('app');
const Menu = require('menu');
const BrowserWindow = require('browser-window');
const shell = require('shell');
const appName = app.getName();

function sendAction(action) {
	const win = BrowserWindow.getAllWindows()[0];
	win.restore();
	win.webContents.send(action);
}

const darwinTpl = [
	{
		label: appName,
		submenu: [
			{
				label: `About ${appName}`,
				role: 'about'
			},
			{
				type: 'separator'
			},
			{
				label: 'Log Out',
				click() {
					sendAction('log-out');
				}
			},
			{
				type: 'separator'
			},
			{
				label: `Hide ${appName}`,
				accelerator: 'Cmd+H',
				role: 'hide'
			},
			{
				type: 'separator'
			},
			{
				label: `Quit ${appName}`,
				accelerator: 'Cmd+Q',
				click() {
					app.quit();
				}
			}
		]
	},
	{
		label: 'File',
		submenu: [
			{
				label: 'login',
				accelerator: 'CmdOrCtrl+N',
				click() {
					sendAction('login');
				}
			}
		]
	},
	{
		label: 'Window',
		role: 'window',
		submenu: [
			{
				label: 'Minimize',
				accelerator: 'CmdOrCtrl+M',
				role: 'minimize'
			},
			{
				label: 'Close',
				accelerator: 'CmdOrCtrl+W',
				role: 'close'
			},
			{
				type: 'separator'
			},
			{
				label: 'Bring All to Front',
				role: 'front'
			}
		]
	},
	{
		label: 'Help',
		role: 'help'
	}
];

const linuxTpl = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Login',
				accelerator: 'CmdOrCtrl+N',
				click() {
					sendAction('login');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Log Out',
				click() {
					sendAction('log-out');
				}
			}
		]
	},
	{
		label: 'Help',
		role: 'help'
	}
];

const helpSubmenu = [
	{
		label: `About ${appName}`,
		click() {
			shell.openExternal('https://github.com/akashnimare/cyclient');
		}
	},
	{
		label: 'Report an Issue...',
		click() {
			const body = `
**Please succinctly describe your issue and steps to reproduce it.**

-

${app.getName()} ${app.getVersion()}
${process.platform} ${process.arch} ${os.release()}`;

			shell.openExternal(`https://github.com/akashnimare/cyclient/issues/new?body=${encodeURIComponent(body)}`);
		}
	}
];

let tpl;
if (process.platform === 'darwin') {
	tpl = darwinTpl;
} else if (process.platform === 'linux') {
	tpl = linuxTpl;
}

tpl[tpl.length - 1].submenu = helpSubmenu;

module.exports = Menu.buildFromTemplate(tpl);
