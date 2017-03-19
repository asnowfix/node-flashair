FlashAir API Wrapper
====================

`FlashAir` API for `Node.js` API Wrapper

Get Started
-----------
### Step 1
```
npm install flashair2
```

### Step 2
```js
var flashair = require("flashair")(appname, appmode);
```

#### - appname
Specifies the application hostname ( the URL of the CGI server )
In the default `CONFIG` the parameter `APPNAME` default value is `flashair`.

#### - appmode
Wireless mode, available options are : `STA` and `AP`
In the default `CONFIG` the parameter `APPMODE` default value is `STA`.


### Step 3
Write your code!

Support
-------
versione firmware `2.00.00+`

### command.cgi
- [x] Get file list
- [x] Get the number of files
- [x] Get update status
- [x] Get SSID
- [x] Get network password
- [x] Get MAC address
- [x] Set browser language
- [x] Get the firmware version
- [x] Get the control image
- [x] Get Wireless LAN mode
- [x] Set Wireless LAN timeout length
- [x] Get application unique information
- [x] New Get Upload parameters
- [x] Get CID
- [x] New Get time stamp of write event
- [x] Get data from shared memory
- [x] Set data to shared memory
- [x] Get the number of empty sectors
- [x] New Control SD Interface as user I/O
- [x] Enable Photo Share mode
- [x] Disable Photo Share mode
- [x] Get Photo Share mode status
- [x] Get SSID for Photo Share mode


### config.cgi
- [x] Set Connection Timeout
- [x] Set Application's Unique Information
- [x] Set Wireless LAN Mode
- [x] Set Network Security Key
- [x] Set SSID
- [x] Set Network Security Key for Internet Pass-Thru Mode
- [x] Set SSID for Internet Pass-Thru Mode
- [x] Set Wireless LAN Boot Screen Path
- [x] Set Master Code
- [x] Get Wireless LAN mode
- [x] Set Wireless LAN timeout length
- [x] Get application unique information
- [x] New Get Upload parameters
- [x] Get CID
- [x] New Get time stamp of write event
- [x] Get data from shared memory
- [x] Set data to shared memory
- [x] Get the number of empty sectors
- [x] New Control SD Interface as user I/O
- [x] Enable Photo Share mode
- [x] Disable Photo Share mode
- [x] Get Photo Share mode status
- [x] Get SSID for Photo Share mode


### thumbnail.cgi
- [x] Get thumbnail

### upload.cgi
TODO

Document
--------
### command.cgi
#### Acquisizione di elenco di file
##### Example
```js
flashair.command.getFileList("/", function (err, files) {
  if (err)
    throw err;

  console.log(files);
});
```

Resources
---------

* [FlashAir Developper Home](https://flashair-developers.com/)
* [FlashAir Developpers Forum](https://flashair-developers.com/en/support/forum/)
* [FlashAir StackOverflow channel](http://stackoverflow.com/questions/tagged/flashair)

License
-------

The MIT License (MIT)

Copyright (c) 2013 Takenori Nakagawa
Copyright (c) 2016-2017 Francois-Xavier Kowalski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

References
==========

* [Toshiba FlashAir™ W-03](http://www.toshiba-memory.com/cms/en/products/wireless-sd-cards/FlashAir/product_detail.jsp?productid=737)
* [FlashAir™ Developers](https://flashair-developers.com/)
* [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
