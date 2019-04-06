var cnvs,dc;
var SCWIDTH = 640, SCHEIGHT = 480;
var CX = -0.6, CY = 0;
var minX = -2.6, maxX = 1.4, minY = -1.5, maxY = 1.5;

function mapping(x,a,b,c,d){
  return ( d - c ) / ( b - a ) * ( x - a) + c;
}

window.onload = function(){

    cnvs = document.getElementById("myCanvas");
    cnvs.addEventListener("click", GetPosition, false);
    dc = cnvs.getContext("2d");

    init();
}

function Draw(){

  dc.fillStyle = "black";
  dc.fillRect(0, 0, 640, 480);

  var xrange = (maxX - minX) / SCWIDTH;
  var yrange = (maxY - minY) / SCHEIGHT;

  var a,b,n,sx,sy,col;

  for (x = minX; x < maxX; x += xrange) {
    for (y = minY; y < maxY; y += yrange) {

      a = x;
      b = y;
      n = 0;
      while (n < 100) {
        var aa = a**2;
        var bb = b**2;
        if ( aa**2 + bb**2 > 16.0 ) break;
        b = 2.0 * a * b + y;
        a = aa - bb + x;
        n++;
      }

      if (n >=100) {
        dc.fillStyle = "rgb(0,0,0)";
      } else {
        col = n/100 * 256;
        dc.fillStyle ="rgb(" + col + "," + col + "," + col + ")";
      }
      sx = mapping(x, minX, maxX, 0, SCWIDTH);
      sy = mapping(y, minY, maxY, SCHEIGHT, 0);
      dc.fillRect (sx,sy,1,1);
    }
  }

  // requestAnimationFrame(Draw);

}

function init(){

  // パラメータ、数式を描画
  var obj =document.getElementById("parameter").querySelectorAll(".value");
  obj[0].innerHTML = Math.round( CX * 100000 )/100000;
  obj[1].innerHTML = Math.round( CY * 100000 )/100000;

  // 描画
  Draw();
}

// マウスイベントで描画
function GetPosition(e) {

  // マウスの座標からパラメータを取得
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;

  CX = mapping(x, 0, SCWIDTH, minX, maxX);
  CY = mapping(y, 0, SCHEIGHT, maxY, minY);

  maxX = CX + (maxX - minX) / 4;
  minX = CX - (maxX - minX) / 4;
  maxY = CY + (maxY - minY) / 4;
  minY = CY - (maxY - minY) / 4;

  init();

}

// ボタンイベント対応
/*

function ChangeParameter(e){

  switch (e.target.eventParam) {
    case "P1":
      p1 = Math.floor( Math.random() * 256 );
      break;
    case "P2":
      p2 = Math.floor( Math.random() * 256 );
      break;
    default:
      break;
  }

}

 */
