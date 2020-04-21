require('./renderer.js');
const {ipcRenderer} = require('electron'); 

const CHANNEL_NAMES = ["compilerun", "res"];

    const _ide = document.getElementById('ide');
    const _res = document.getElementById('res');

