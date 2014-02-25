const xhtmlNS = "http://www.w3.org/1999/xhtml";
var aioOldX, aioOldY;
var aioGrid = 15;
var aioStrokes = [], aioLocaleGest = [], aioShortGest = [];
var aioTrailDot;
var aioTrailCont = null;
var aioTrailCnt;
var aioTrailX, aioTrailY, aioDocX, aioDocY;
var rv, gestureStarted, iframe;
var aioFxV10, aioFxV36;

function init() {
  const httpProtocolHandler = Components.classes["@mozilla.org/network/protocol;1?name=http"]
                               .getService(Components.interfaces.nsIHttpProtocolHandler);
  var geckoVersion = httpProtocolHandler.misc.match(/rv:([0-9.]+)/)[1];
  var versionComparator = null;
  if ("nsIVersionComparator" in Components.interfaces)
     versionComparator = Components.classes["@mozilla.org/xpcom/version-comparator;1"]
                          .getService(Components.interfaces.nsIVersionComparator);
  else
     versionComparator = Components.classes["@mozilla.org/updates/version-checker;1"]
                          .getService(Components.interfaces.nsIVersionChecker);
  aioFxV10 = versionComparator.compare(geckoVersion, "1.8") < 0;
  aioFxV36 = versionComparator.compare(geckoVersion, "1.9.2") >= 0;
  iframe = document.getElementById("gestDrawArea");
  var aioBundle = document.getElementById("allinonegestbundle");
  aioShortGest["R"] = aioBundle.getString("abbreviation.right");
  aioShortGest["L"] = aioBundle.getString("abbreviation.left");
  aioShortGest["U"] = aioBundle.getString("abbreviation.up");
  aioShortGest["D"] = aioBundle.getString("abbreviation.down");
  rv = window.arguments[0];
  iframe.addEventListener("mousedown", startGesture, true);
  iframe.addEventListener("mouseup", endGesture, true);
  gestureStarted = false;
}

function startGesture(e) {
  if (e.button != rv.mousebutton) return;
  gestureStarted = true;
  iframe.addEventListener("mousemove", gestMove, true);
  aioOldX = e.screenX; aioOldY = e.screenY;
  var targetDoc = e.target.ownerDocument;
  var insertionNode = targetDoc.documentElement;
  if (aioFxV36) {
     var insertBounds = insertionNode.getBoundingClientRect();
     aioDocX = targetDoc.defaultView.mozInnerScreenX + insertBounds.left;
     aioDocY = targetDoc.defaultView.mozInnerScreenY + insertBounds.top;
  }
  else {
     var docBox = targetDoc.getBoxObjectFor(insertionNode);
     aioDocX = docBox.screenX;
     aioDocY = docBox.screenY;
     if (aioFxV10) {
        aioDocX -= targetDoc.defaultView.pageXOffset;
        aioDocY -= targetDoc.defaultView.pageYOffset;
     }
  }
  aioTrailCont = targetDoc.createElementNS(xhtmlNS, "aioTrailContainer");
  insertionNode.appendChild(aioTrailCont);
  aioTrailDot = targetDoc.createElementNS(xhtmlNS, "aioTrailDot");
  aioTrailDot.style.width = rv.trailSize + "px";
  aioTrailDot.style.height = rv.trailSize + "px";
  aioTrailDot.style.background = rv.trailColor;
  aioTrailDot.style.border = "0px";
  aioTrailDot.style.position = "absolute";
  aioTrailX = e.screenX;
  aioTrailY = e.screenY;
  aioTrailCnt = 0;
}

function gestMove(e) {
  var x_dir = e.screenX - aioOldX; var absX = Math.abs(x_dir);
  var y_dir = e.screenY - aioOldY; var absY = Math.abs(y_dir);
  var tempMove;
  if (absX < aioGrid && absY < aioGrid) return;
  drawTrail(e);
  var pente = absY <= 5 ? 100 : absX / absY;
  if (pente < 0.58 || pente > 1.73) {
     if (pente < 0.58) tempMove = y_dir > 0 ? "D" : "U";
     else tempMove = x_dir > 0 ? "R" : "L";
     if (!aioStrokes.length || aioStrokes[aioStrokes.length-1] != tempMove) {
        aioStrokes.push(tempMove); aioLocaleGest.push(aioShortGest[tempMove]);
     }
  }
  aioOldX = e.screenX; aioOldY = e.screenY;
}

function endGesture() {
  if (gestureStarted) {
     eraseTrail();
     window.arguments[0].gestString = aioLocaleGest.join("");
  }
  window.close();
}

function drawTrail(e) {
  function appendDot(x, y) {
    if ((++aioTrailCnt & 1) || rv.trailSize == 1) {
      var dot = aioTrailDot.cloneNode(true);
      dot.style.left = x + "px";
      dot.style.top = y + "px";
      aioTrailCont.appendChild(dot);
    }
  }
  if (!aioTrailCont) return;
  var xMove = e.screenX - aioTrailX;
  var yMove = e.screenY - aioTrailY;
  var xDecrement = xMove < 0 ? 1 : -1;
  var yDecrement = yMove < 0 ? 1 : -1;
  var i, currX = e.screenX - aioDocX, currY = e.screenY - aioDocY;
  if (Math.abs(xMove) >= Math.abs(yMove))
    for (i = xMove; i != 0; i += xDecrement)
      appendDot(currX - i, currY - Math.round(yMove * i / xMove));
  else
    for (i = yMove; i != 0; i += yDecrement)
      appendDot(currX - Math.round(xMove * i / yMove), currY - i);
  aioTrailX = e.screenX; aioTrailY = e.screenY;
}

function eraseTrail() {
  if (aioTrailCont && aioTrailCont.parentNode)
    aioTrailCont.parentNode.removeChild(aioTrailCont);
  aioTrailCont = null;
}
