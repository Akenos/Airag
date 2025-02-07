/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
// var qr = require('qr-image');
import qr from "qr-image";
 
var qr_svg = qr.image('I love QR!', { type: 'png' });
qr_svg.pipe(require('fs').createWriteStream('JABU.png'));
 
var svg_string = qr.imageSync('I love QR!', { type: 'png' });
