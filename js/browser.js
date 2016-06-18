'use strict';
const ipc = require('ipc');

ipc.on('login', () => {
	//login
	document.querySelector('#logincaption').click();
});

ipc.on('log-out', () => {
	//log-out
	document.querySelector('.button').click();
});

