//                              APPNAME, APPMODE ("STA" or "AP")
var flashair = require("./lib")("localhost", "STA");

// SD カードのルートディレクトリ直下のディレクトリ、ファイル一覧
flashair.command.getSSID( function (err,res) {
  if (err)
  {
    console.log( "Error:" , err );
    throw err;
  }

  // 一覧
  console.log(res);
  // ファイル、ディレクトリ数
  //console.log(res.length);

/*
  // 拡張子を指定して絞り込み
  var photos = res.filter(function (photo) {
    return photo.name.slice(-4) === ".JPG";
  });

  console.log(photos);
  console.log(photos.length);
*/
});
