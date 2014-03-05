/*
 * gestimp.js
 * For licence information, read licence.txt
 *
 * code for gesture functions
 *
 */
var aioGestTable;
// aioActionTable's 3rd column denotes rocker multiple operations. 0: Not allowed, 1: Allowed 2: Conditional
// 4th column denotes the buddy action if any 
var aioActionTable = [
      [function(){aioBackForward(true);}, "g.browserBack", 2, "1"], // 0
      [function(){aioBackForward(false);}, "g.browserForward", 2, "0"], // 1
      [function(){BrowserReload();}, "g.browserReload", 0, ""], // 2
      [function(){BrowserReloadSkipCache();}, "g.browserReloadSkipCache", 0, ""], // 3
      [function(){BrowserStop();}, "g.browserStop", 0, ""], // 4
      [function(){aioHomePage();}, "g.browserHome", 0, ""], // 5
      [function(){aioOpenNewWindow(false);}, "g.openNewWindow", 0, ""], // 6
      [function(){aioDupWindow();}, "g.duplicateWindow", 0, ""], // 7
      [function(){aioUpDir();}, "g.upDir", 2, ""], // 8
      [function(){aioOpenInNewTab(false);}, "g.browserOpenTabInFg", 0, ""], // 9
      [function(){aioDupTab();}, "g.duplicateTab", 0, ""], // 10
      [function(){aioContent.mTabContainer.advanceSelectedTab(+1, true);}, "g.nextTab", 1, "12"], // 11
      [function(){aioContent.mTabContainer.advanceSelectedTab(-1, true);}, "g.previousTab", 1, "11"], // 12
      [function(){aioRemoveAllTabsBut();}, "g.closeOther", 0, ""], // 13
      [function(){aioRestMaxWin();}, "g.restMaxWin", 1, ""], // 14
      [function(){window.minimize();}, "g.minWin", 0, ""], // 15
      [function(){BrowserFullScreen();}, "g.fullScreen", 1, ""], // 16
      [function(){aioSelectionAsURL();}, "g.openSelection", 0, ""], // 17
      [function(){aioCloseCurrTab(true);}, "g.closeDoc", 0, ""], // 18
      [function(){aioViewSource(0);}, "g.viewPageSource", 0, ""], // 19
      [function(){aioViewSource(1);}, "g.viewFrameSource", 0, ""], // 20
      [function(){aioViewCookies();}, "g.viewSiteCookies", 0, ""], // 21
      [function(){BrowserPageInfo();}, "g.pageInfo", 0, ""], // 22
      [function(){toJavaScriptConsole();}, "g.jsConsole", 0, ""], // 23
      [function(){aioNullAction();}, "g.nullAction", 0, ""], // 24
      [function(){aioBookmarkCurrentPage();}, "g.addBookmark", 0, ""], // 25
      [function(){aioDoubleWin();}, "g.doubleStackWin", 0, ""], // 26
      [function(){aioSetImgSize(true,false);}, "g.doubleImageSize", 1, "28"], // 27
      [function(){aioSetImgSize(false,false);}, "g.halveImageSize", 1, "27"], // 28
      [function(){aioNukeAnything();}, "g.hideObject", 0, ""], // 29
      [function(){aioZoomEnlarge();}, "g.zoomIn", 1, "31"], // 30
      [function(){aioZoomReduce();}, "g.zoomOut", 1, "30"], // 31
      [function(){aioZoomReset();}, "g.resetZoom", 1, ""], // 32
      [function(){aioActionOnPage(0);}, "g.w3cValidate", 0, ""], // 33
      [function(){aioLinksInWindows();}, "g.linksInWindows", 0, ""], // 34
      [function(){aioLinksInTabs();}, "g.linksInTabs", 0, ""], // 35
      [function(){aioMetaInfo();}, "g.metaInfo", 0, ""], // 36
      [function(){aioVScrollDocument(true,1);}, "g.scrollDown", 1, "38"], // 37
      [function(){aioVScrollDocument(true,-1);}, "g.scrollUp", 1, "37"], // 38
      [function(){aioVScrollDocument(false,0);}, "g.scrollToTop", 0, ""], // 39
      [function(){aioVScrollDocument(false,1000000);}, "g.scrollToBottom", 0, ""], // 40
      [function(){aioResetImgSize(false);}, "g.resetImage", 1, ""], // 41
      [function(){aioNullAction();}, "g.nullAction", 0, ""], // 42
      [function(){aioNukeFlash();}, "g.hideFlash", 0, ""], // 43
      [function(){aioCopyURLToClipBoard();}, "g.URLToClipboard", 0, ""], // 44
      [function(){getWebNavigation().gotoIndex(0);}, "g.firstPage", 0, ""], // 45
      [function(){aioGesturesPage();}, "g.showGestures", 0, ""], // 46
      [function(){aioCloseCurrTab(false);}, "g.closeTab", 0, ""], // 47
      [function(){aioIncURL(1);}, "g.incURL", 2, "49"], // 48
      [function(){aioIncURL(-1);}, "g.decURL", 2, "48"], // 49
      [function(){aioSchemas={};}, "g.clearDigitFlipper", 0, ""], // 50
      [function(){aioLinksInFiles();}, "g.linksInFiles", 0, ""], // 51
      [function(){aioUndoCloseTab();}, "g.undoCloseTab", 0, ""], // 52
      [function(){BrowserPrintPreview();}, "g.printPreview", 0, ""], //53
      [function(){aioOpenInNewTab(true);}, "g.browserOpenTabInBg", 0, ""], // 54
      [function(){aioDeleteCookies();}, "g.deleteSiteCookies", 0, ""], // 55
      [function(){aioUndoNukeAnything();}, "g.undoHideObject", 0, ""], // 56
      [function(){aioFavoriteURL('1');}, "g.openFav1", 0, ""], // 57
      [function(){aioFavoriteURL('2');}, "g.openFav2", 0, ""], // 58
      [function(){BrowserOpenTab();}, "g.openBlankTab", 0, ""], // 59
      [function(){aioCloseWindow();}, "g.closeWindow", 0, ""], // 60
      [function(){aioOpenNewWindow(true);}, "g.openWindowInBg", 0, ""], // 61
      [function(){aioFrameInfo();}, "g.frameInfo", 0, ""], // 62
      [function(){aioOpenAioOptions();}, "g.aioOptions", 0, ""], // 63
      [function(){aioNullAction();}, "g.nullAction", 0, ""], // 64
      [function(){aioOpenBookmarksManager();}, "g.bookmarkMgr", 0, ""], // 65
      [function(){aioActionOnPage(1);}, "g.translate", 0, ""], // 66
      [function(){aioOpenDownloadManager();}, "g.downloadMgr", 0, ""], // 67
      [function(){saveDocument(window.content.document);}, "g.savePageAs", 0, ""], // 68
      [function(){aioNullAction();}, "g.nullAction", 0, ""], // 69
      [function(){aioShowHideStatusBar();}, "g.showHideStatusBar", 1, ""], // 70
      [function(){aioSrcEvent.target.ownerDocument.location.reload();}, "g.reloadFrame", 0, ""], // 71
      [function(){aioSetImgSize(true,true);}, "g.enlargeObject", 1, "73"], // 72
      [function(){aioSetImgSize(false,true);}, "g.reduceObject", 1, "72"], // 73
      [function(){aioResetImgSize(true);}, "g.resetSize", 1, ""], //74
      [function(){aioNullAction();}, "g.nullAction", 0, ""], // 75
      [function(){aioContent.reloadAllTabs();}, "g.reloadAllTabs", 0, ""], // 76
      [function(){aioNextPrevLink(true);}, "g.nextLink", 0, ""], // 77
      [function(){aioFastForward();}, "g.fastForward", 0, ""], // 78
      [function(){aioSelectionAsSearchTerm();}, "g.searchSelection", 0, ""], // 79
      [function(){aioSaveImageAs();}, "g.saveImageAs", 0, ""], // 80
      [function(){aioNextPrevLink(false);}, "g.prevLink", 0, ""], // 81
      [function(){aioGotoLastTab();}, "g.lastTab", 0, ""], // 82
      [function(){aioCopyClipBoardToURLBar();}, "g.pasteAndGo", 0, ""], // 83
      [function(){aioSmartBackForward(-1, false);}, "g.smartBack1", 1, "86"], // 84
      [function(){aioSmartBackForward(-1, true);}, "g.smartBack2", 1, "87"], // 85
      [function(){aioSmartBackForward(+1, false);}, "g.smartForward1", 1, "84"], // 86
      [function(){aioSmartBackForward(+1, true);}, "g.smartForward2", 1, "85"], // 87
      [function(){PrintUtils.print();}, "g.print", 0, ""], //88
      [function(){aioImageInTab();}, "g.openImageInTab", 0, ""], //89
      [function(){aioImageInWindow();}, "g.openImageInWin", 0, ""], //90
//      [function(){aioCloseRightTabs(true);}, "g.CloseAllRightTab", 0, ""], // 89
//      [function(){aioCloseLeftTabs(true);}, "g.CloseAllLeftTab", 0, ""], // 90
//      [function(){aioCloseRightTabs(false);}, "g.CloseRightTab", 0, ""], // 91
//      [function(){aioCloseLeftTabs(false);}, "g.CloseLeftTabs", 0, ""], // 92
//      [function(){aioCloseAllTabs(false);}, "g.CloseAllTabs", 0, ""], // 93
//      [function(){aioHScrollDocument(false,0);}, "g.scrollToLeft", 0, ""], // 94
//      [function(){aioHScrollDocument(false,1000000);}, "g.scrollToRight", 0, ""], // 95
//      [function(){aioCScrollDocument(1000000,1000000);}, "g.scrollToCenter", 0, ""], // 96
//      [function(){aioFullZoomOperation(1);}, "g.FullZoomEnlarge", 0, ""], // 97
//      [function(){aioFullZoomOperation(2);}, "g.FullZoomReduce", 0, ""], // 98
//      [function(){aioFullZoomOperation(0);}, "g.FullZoomReset", 0, ""], // 99
//      [function(){aioOpenAddonManager();}, "g.addOnMgr", 0, ""] // 100
     ];
var aioSchemas = {};
var aioLastTabInfo = [];
var aioUndoHide = [];
var aioUnique = 0;
var aioOrigBlurTab;
const aioKGestures = aioDir + "aiogest.html";

function aioStatusMessage(msg, timeToClear) {
  if (!aioStatusBar) return;
  aioStatusBar.label = msg;
  if (timeToClear) setTimeout(function(){aioStatusMessage("", 0);}, timeToClear );
}

function aioInitGestTable() {
  var i, func, len;
  len = aioActionTable.length;
  if (aioFirstInit)
     for (i = 0; i < len; ++i) aioActionTable[i][1] = aioGetStr(aioActionTable[i][1])
  var gestTable = aioActionString.split("|");
  var funcTable = aioFuncString.split("|");
  aioGestTable = [];
  for (i = 0; i < gestTable.length; ++i) {
    func = funcTable[i] - 0;
    if (gestTable[i] && func >= 0 && func < len) aioGestTable[gestTable[i]] = func;
  }
}

function aioFireGesture(aGesture) {
  var index = aioGestTable[aGesture];
  if (index == null) {
     index = aioGestTable["+" + aGesture.substr(-2)];
     if (index == null)
        index = aioGestTable["+" + aGesture.substr(-3)];
  }
  if (index == null) {
     index = aioGestTable["/" + aGesture];
     if (index == null) aioStatusMessage(aioUnknownStr + ": " + aGesture, 2000);
     else aioStatusMessage(aioGetStr("g.disabled") + ": " + aioActionTable[index][1], 2000);
  }
  else
     try {
       aioStatusMessage(aioActionTable[index][1], 2000);
       aioActionTable[index][0]();
     }
     catch(err) {}
  aioKillGestInProgress();
  aioDownButton = aioNoB;
}

function aioSetTabId(node) {
  if (!node) return null;
  var nodeId = node.getAttribute("aioTabId");
  if (!nodeId) {
     nodeId = "t" + aioUnique++;
     node.setAttribute("aioTabId", nodeId);
  }
  return nodeId;
}

function aioCorrectFocus(e) {
  var tabs = aioContent.mTabContainer.childNodes;
  for (var i = 0; i < tabs.length; ++i)
     if (tabs[i].selected && (aioRendering.selectedIndex != i)) {
        aioRendering.selectedIndex = i;
        aioContent.mTabBox.removeEventListener('select', aioCorrectFocus, true);
        return;
     }
}

/*  Gesture actions */

function aioBackForward(back) {
  back ? BrowserBack() : BrowserForward();
  content.focus();
}

function aioFavoriteURL(suffix) {
  var shortcutURL = null;
  var bmsvc = Components.classes["@mozilla.org/browser/nav-bookmarks-service;1"].getService(Components.interfaces.nsINavBookmarksService);
  var keyword = aioGetStr("g.keywordForGesture") + suffix;
  var shortcutURI = bmsvc.getURIForKeyword(keyword);
  if (shortcutURI) shortcutURL = shortcutURI.spec;
  if (!shortcutURL) {
    alert(aioGetStr("g.keywordMissing") + " " + keyword);
    return;
  }
  
  loadURI(shortcutURL);
}

function aioIncURL(inc) { // derived from MagPie by Ben Goodger
  var currSchema, newValue, newIndex, str, url; 
  var currSpec = aioContent.selectedBrowser.webNavigation.currentURI.spec;
  for (var i in aioSchemas) {
     if (currSpec.substr(0, i.length) != i) continue;
     currSchema = aioSchemas[i];
     newValue = parseInt(currSpec.substring(currSchema.startIndex, currSchema.endIndex), 10);
     inc > 0 ? ++newValue : --newValue;
     if (newValue < 0) {
        alert(aioGetStr("noDecrement"));
        return;
     }
     newIndex = newValue.toString();
     str = "";
     for (var j = newIndex.length; j < currSchema.selectedLength; ++j) str += "0";
     str += newIndex;
     url = currSpec.substr(0, currSchema.startIndex) + str + currSpec.substr(currSchema.endIndex);
     aioSchemas[i].endIndex = currSchema.startIndex + str.length;
     aioContent.selectedBrowser.loadURI(url);
     return;
  }

  if (aioTrustAutoSelect) {
     var RE = /\d+/g;
     var rtn, startIndex = -1, endIndex;
     while ((rtn = RE.exec(currSpec)) != null) {
       startIndex = rtn.index;
       endIndex = startIndex + rtn[0].length;
     }
     if (startIndex == -1) return;
     var key = currSpec.substr(0, startIndex);
     aioSchemas[key] = {startIndex: startIndex, endIndex: endIndex, selectedLength: endIndex - startIndex};
     aioIncURL(inc);
     return;
  }

  var rv = { };
  openDialog(aioDir + "aioSchemaBuilder.xul", "", "chrome,centerscreen,modal=yes", currSpec, rv);
  if ("key" in rv) {
     aioSchemas[rv.key] = {startIndex: rv.startIndex, endIndex: rv.endIndex, selectedLength: rv.endIndex - rv.startIndex};
     aioIncURL(inc);
  }
}

function aioShowLocalizedGestures(doc) {
  var imageName;
  const K2 = '<td class="row1" valign="middle" height="30"><span class="forumlink">';
  const K3 = '</span></td><td class="row2" valign="middle"><span class="forumlink">'
  const K4 = '</span></td><td class="row3" valign="middle" align="center">';
  function localized(aStr) {
    if (!aStr) {
       imageName = "nomov";
       return "&nbsp;";
    }
    var lStr = ""; imageName = "";
    for (var i = 0; i < aStr.length; ++i)
        if (aioShortGest[aStr.charAt(i)] == null) {
           imageName = "nomov"; lStr += aStr.charAt(i);
        }
        else lStr += aioShortGest[aStr.charAt(i)];
    if (!imageName)
       if (aStr.length < 5) imageName = aStr.toLowerCase(); else imageName = "nomov";
    return lStr;
  }
  var locGest = aioGetStr("w.gesture").replace(/\'/g, "&#39;");
  var locFunc = aioGetStr("w.function").replace(/\'/g, "&#39;");
  var locMove = aioGetStr("w.move").replace(/\'/g, "&#39;");
  const K1 = '<th width="100" class="thTop" nowrap="nowrap">&nbsp;' + locGest + '&nbsp;</th>';
  const imgURL = '<img src="http://pagesperso-orange.fr/marc.boullet/ext/';
  var divCode = '<div class="buttons">';
  divCode += '<button onclick="openOptions()">' + aioGetStr('g.aioOptions') + '</button>';
  divCode += '<button onclick="openHelp(2)">Help</button>';
  divCode += '</div>';
  divCode += '<table width="100%" cellpadding="2" cellspacing="1" class="forumline">';
  divCode += '<tr><th class="thCornerL" height="30" nowrap="nowrap">&nbsp;' + locFunc + '&nbsp;</th>';
  divCode += K1 + '<th width="50" class="thTop" nowrap="nowrap">&nbsp;' + locMove + '&nbsp;</th>';
  divCode += '<th class="thTop" height="30" nowrap="nowrap">&nbsp;' + locFunc + '&nbsp;</th>';
  divCode += K1 + '<th width="50" class="thCornerR" nowrap="nowrap">&nbsp;' + locMove + '&nbsp;</th></tr>';
  var gestTable = aioActionString.split("|");
  var funcTable = aioFuncString.split("|");
  var func, actionName, j = 0;
  for (var i = 0; i < gestTable.length; ++i) {
     func = funcTable[i] - 0;
     if (func < 0 || func >= aioActionTable.length) {j++; continue;}
     actionName = aioActionTable[func][1].replace(/\'/g, "&#39;");
     if (!((i - j) & 1)) divCode +='<tr>';
     divCode += K2 + actionName + K3 + localized(gestTable[i]) + K4;
     divCode += imgURL + imageName + '.png"></td>';
     if ((i-j) & 1) divCode += '</tr>'
  }
  if ((gestTable.length - j) & 1) {
     divCode += K2 + "&nbsp;" + K3 + "&nbsp;" + K4;
     divCode += imgURL + 'nomov.png"></td></tr>';
  }
  divCode += '</table>';
  var title = aioGetStr("w.gestTable").replace(/\'/g, "&#39;");
  var str = "(function(){window.addEventListener('load',function(e){document.title='" + title +
       "';document.body.innerHTML='" + divCode + "';},false);})();"
  var script = doc.createElement("script");
  script.appendChild(doc.createTextNode(str));
  doc.body.appendChild(script);
}

function aiogestDOMLoaded(e) {  
  var doc = e.originalTarget.defaultView.document;
  if (doc.location.href == aioKGestures) aioShowLocalizedGestures(doc);
//  aioContent.removeEventListener("DOMContentLoaded", aiogestDOMLoaded, false);
}

function aioGesturesPage() {
  aioContent.addEventListener("DOMContentLoaded", aiogestDOMLoaded, false);
  if (window.content.document.location.href != "about:blank") {
    aioLinkInTab(aioKGestures, false, false);
  } else {
    loadURI(aioKGestures);
  }
}

function aioCopyURLToClipBoard() {
  var lstr = "";
  try {
    var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
    if (!str) return;
    if (aioOnLink.length) {
       for (var i = 0; i < aioOnLink.length; ++i) {
           if (lstr) lstr += "\r\n";
           lstr += aioOnLink[i].href;
       }
       str.data = lstr;
    }
    else str.data = window.content.document.location.href;
    var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
    if (!trans) return;
	// Since data from the web content are copied to the clipboard, the privacy context must be set.
	var sourceWindow = aioSrcEvent.target.ownerDocument.defaultView;
    var privacyContext = sourceWindow.QueryInterface(Components.interfaces.nsIInterfaceRequestor).
                                  getInterface(Components.interfaces.nsIWebNavigation).
                                  QueryInterface(Components.interfaces.nsILoadContext);
	if ("init" in trans) trans.init(privacyContext);
    trans.addDataFlavor("text/unicode");
    trans.setTransferData("text/unicode", str, str.data.length * 2);
    var clipId = Components.interfaces.nsIClipboard;
    var clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(clipId);
    if (!clip) return;
    clip.setData(trans, null, clipId.kGlobalClipboard);
  }
  catch(err) {}
}

function aioCopyClipBoardToURLBar() {
  var clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(Components.interfaces.nsIClipboard);
  if (!clip) return;
  var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
  if (!trans) return;
  if ("init" in trans) trans.init(null);
  trans.addDataFlavor("text/unicode");
  clip.getData(trans, clip.kGlobalClipboard);
  var data = {}, dataLen = {};
  try {
    trans.getTransferData("text/unicode", data, dataLen);
  }
  catch(err) {
    alert(aioGetStr("g.clipboardEmpty"));
  }
  if (data) {
     data = data.value.QueryInterface(Components.interfaces.nsISupportsString);
     var url = data.data.substring(0, dataLen.value / 2);
     if (gURLBar) gURLBar.value = url;
     aioLinkInTab(url, true, false);
  }
}

function getElemsByTagNameForAllFrames(frameDoc, tagName) {
  var elsWithTag = [];
  var frames = frameDoc.getElementsByTagName("frame");
  for (var i = 0; i < frames.length; ++ i)
      elsWithTag = elsWithTag.concat(getElemsByTagNameForAllFrames(frames[i].contentDocument, tagName));
  frames = frameDoc.getElementsByTagName("iframe");
  for (i = 0; i < frames.length; ++ i)
      elsWithTag = elsWithTag.concat(getElemsByTagNameForAllFrames(frames[i].contentDocument, tagName));
  var lEls = frameDoc.getElementsByTagName(tagName);
  for (i = 0; i < lEls.length; ++i) elsWithTag.push(lEls[i]);
  return elsWithTag;
}

function aioNukeFlash() {
  var currFlash, height, width, top, next, span, text, view, disp, style;
  var topDocument = aioSrcEvent.target.ownerDocument.defaultView.top.document;
  var embeds = getElemsByTagNameForAllFrames(topDocument, "embed");
  for (var i = 0; i < embeds.length; ++i) {
    currFlash = embeds[i];
    if (currFlash.getAttribute("type") != "application/x-shockwave-flash") continue;
    if (currFlash.parentNode.nodeName.toLowerCase() == "object") {
       top = currFlash.parentNode.parentNode; next = currFlash.parentNode;
    }
    else {
       top = currFlash.parentNode; next = currFlash;
    }
    if (next.previousSibling && next.previousSibling.nodeName.toLowerCase() == "span"
        && next.previousSibling.hasAttribute("aioFlash")) continue;
    view = next.ownerDocument.defaultView;
    width = parseInt(view.getComputedStyle(next, "").getPropertyValue("width"));
    height = parseInt(view.getComputedStyle(next, "").getPropertyValue("height"));
    disp = view.getComputedStyle(next, "").getPropertyValue("display");
    if (height && width) {
       style = next.getAttribute("style") || "";
       next.setAttribute("style", style + "display:none;");
       span = document.createElementNS(xhtmlNS, "span");
       text = document.createTextNode("[" + aioGetStr("g.clickToView") + "]");
       span.appendChild(text);
       top.insertBefore(span, next);
       span.setAttribute("style", "height:" + (height - 2) + "px;width:" + (width - 2) + "px;border:1px solid black;display:-moz-inline-box;");
       span.setAttribute("aioFlash", disp);
       span.addEventListener("click", aioPlayFlash, true);
    }
  }
}

function aioPlayFlash(e) {
  e.currentTarget.removeEventListener("click", aioPlayFlash, true);
  var flashNode = e.currentTarget.nextSibling;
  var disp = e.currentTarget.getAttribute("aioFlash");
  e.currentTarget.parentNode.removeChild(e.currentTarget);
  var style = flashNode.getAttribute("style") || "";
  flashNode.setAttribute("style", style + "display:" + disp + ";");
}

function aioNukeAnything() {
  var node = aioSrcEvent.target;
  if (!node) return;
  var view = node.ownerDocument.defaultView;
  var disp = view.getComputedStyle(node, "").getPropertyValue("display");
  node.setAttribute("aioDisp", "display:" + disp + ";");
  var style = node.getAttribute("style") || "";
  node.setAttribute("style", style + "display:none;");
  aioUndoHide.push(node);
}

function aioUndoNukeAnything() {
  try {
    var node = aioUndoHide.pop();
    if (!node || !node.hasAttribute("aioDisp")) return;
    var style = node.getAttribute("style") || "";
    node.setAttribute("style", style + node.getAttribute("aioDisp"));
  }
  catch(err) {}
}

function aioVScrollDocument(relativeScroll, aValue) {
  var scrollObj = aioFindNodeToScroll(aioSrcEvent.target);
  if (scrollObj.scrollType >= 2) return;
  var useScrollToBy = scrollObj.isXML || scrollObj.isBody;
  if (relativeScroll) {
     var val = Math.round(scrollObj.realHeight * 0.8 * aValue)
     if (!val) val = aValue;
	 if (useScrollToBy) scrollObj.clientFrame.scrollBy(0, val);
     else scrollObj.nodeToScroll.scrollTop += val;
  }     
  else
	 if (useScrollToBy) scrollObj.clientFrame.scrollTo(scrollObj.clientFrame.pageXOffset, aValue);
     else scrollObj.nodeToScroll.scrollTop = aValue;
}

function aioHScrollDocument(relativeScroll, aValue) { // contributed by Ingo Fröhlich aka get-a-byte
  var scrollObj = aioFindNodeToScroll(aioSrcEvent.target);
  if (scrollObj.scrollType & 1) return; // 1 = vertical scroll only  3 = no scrolling
  var useScrollToBy = scrollObj.isXML || scrollObj.isBody;
  if (relativeScroll) {
     var val = Math.round(scrollObj.realWidth * 0.8 * aValue);
     if (!val) val = aValue;
     if (useScrollToBy) scrollObj.clientFrame.scrollBy(val, 0);
     else scrollObj.nodeToScroll.scrollLeft += val;
  }
  else
     if (useScrollToBy) scrollObj.clientFrame.scrollTo(aValue, 0)
     else scrollObj.nodeToScroll.scrollLeft = aValue;
}

function aioCScrollDocument(aValueH, aValueV) { // contributed by Ingo Fröhlich aka get-a-byte
  var scrollObj = aioFindNodeToScroll(aioSrcEvent.target);
  if (scrollObj.scrollType == 3) return;
  var useScrollToBy = scrollObj.isXML || scrollObj.isBody;
  if (useScrollToBy)
     scrollObj.clientFrame.scrollTo(aValueH, aValueV);
  else {
     scrollObj.nodeToScroll.scrollLeft = aValueH;
     scrollObj.nodeToScroll.scrollTop = aValueV;
  }
  if (useScrollToBy)
     scrollObj.clientFrame.scrollTo(Math.round(aioSrcEvent.view.scrollLeft / 2),
                                    Math.round(aioSrcEvent.view.scrollTop / 2));
  else {
     scrollObj.nodeToScroll.scrollLeft = Math.round(scrollObj.nodeToScroll.scrollLeft / 2);
     scrollObj.nodeToScroll.scrollTop = Math.round(scrollObj.nodeToScroll.scrollTop / 2);
  }
}

function aioSelectionAsURL() {
  var focusedWindow = document.commandDispatcher.focusedWindow;
  var winWrapper = new XPCNativeWrapper(focusedWindow, 'getSelection()');
  var url = winWrapper.getSelection().toString();
  if (!url) return;
  // the following by Ted Mielczarek
  url = url.replace(/\s/g, ""); // Strip any space characters
  url = url.replace(/^[^a-zA-Z0-9]+/, ""); // strip bad leading characters
  url = url.replace(/[\.,\'\"\)\?!>\]]+$/, ""); // strip bad ending characters
  if (!url) return;
  url.replace(/\\/g,"/"); // change \ to /
  if (url.indexOf(".") == -1) return; // can't be valid
  if (url.search(/^\w+:/) == -1) // make sure it has some sort of protocol
     if (url.indexOf("@") == -1) url = "http://" + url;
     else url = "mailto:" + url;
  aioLinkInTab(url, true, false);
}

function aioSelectionAsSearchTerm() {
  var focusedWindow = document.commandDispatcher.focusedWindow;
  var winWrapper = new XPCNativeWrapper(focusedWindow, 'getSelection()');
  var searchStr = winWrapper.getSelection().toString();
  if (!searchStr) return;
  if (typeof(BrowserSearch) == "undefined") {
     var searchBar = document.getElementById("searchbar");
     if (!searchBar) return;
     searchBar = searchBar.mTextbox;
     if (!searchBar) return;
     searchBar.value = searchStr;
     searchBar.mEnterEvent = null;
     if (typeof(SearchButton) == "undefined") BrowserOpenTab();
     searchBar.onTextEntered();
  }
  else {
    searchBar = BrowserSearch.searchBar;
    if (!searchBar) return;
    searchBar.value = searchStr;
    BrowserSearch.loadSearch(searchStr, true);
  }
}

function aioZoomEnlarge() {
  var toggleZoom = ZoomManager.useFullZoom;
  if (toggleZoom) ZoomManager.useFullZoom = false;
  FullZoom.enlarge();
  ZoomManager.useFullZoom = toggleZoom;
  return;
}

function aioZoomReduce() {
  var toggleZoom = ZoomManager.useFullZoom;
  if (toggleZoom) ZoomManager.useFullZoom = false;
  FullZoom.reduce();
  ZoomManager.useFullZoom = toggleZoom;
  return;
}

function aioZoomReset() {
  FullZoom.reset();
  return;
}

function aioFullZoomOperation(aOper) {
  if (aOper) {
     var toggleZoom = ZoomManager.useFullZoom;
     if (!toggleZoom) ZoomManager.useFullZoom = true;
     if (aOper == 1) FullZoom.enlarge();
     else FullZoom.reduce();
     ZoomManager.useFullZoom = toggleZoom;
  }
  else FullZoom.reset();
}

function aioImageResize(s) {
  aioOnImage.removeAttribute("width");
  aioOnImage.removeAttribute("height");
  var style = aioOnImage.getAttribute("style") || "";
  aioOnImage.setAttribute("style", style + s);
}

function aioSetImgSize(aEnlarge, aMixed) {
  if (!aioOnImage) {
     if (!aMixed) return;
     if (aEnlarge) aioZoomEnlarge();
     else aioZoomReduce();
     return;
  }
  var imgStr = aioOnImage.getAttribute("aioImgSize");
  if (!imgStr) {
     var view = aioOnImage.ownerDocument.defaultView;
     var w = parseInt(view.getComputedStyle(aioOnImage, "").getPropertyValue("width"));
     var h = parseInt(view.getComputedStyle(aioOnImage, "").getPropertyValue("height"));
     var imgTab = [];
     imgTab[0] = w; imgTab[1] = h; imgTab[2] = 1;
  }
  else imgTab = imgStr.split("|");
  imgTab[2] *= aEnlarge ? 2 : 0.5;
  aioOnImage.setAttribute("aioImgSize", imgTab.join("|"));
  w = Math.round(imgTab[0] * imgTab[2]); h = Math.round(imgTab[1] * imgTab[2]);
  if (w && h) aioImageResize("width:" + w + "px; height:" + h + "px;");
  else aioResetImgSize(false);
}

function aioResetImgSize(aMixed) {
  if (!aioOnImage) {
     if (!aMixed) return;
     aioZoomReset();
     return;
  }
  var imgStr = aioOnImage.getAttribute("aioImgSize");
  if (!imgStr) return;
  var imgTab = imgStr.split("|");
  imgTab[2] = "1";
  aioOnImage.setAttribute("aioImgSize", imgTab.join("|"));
  aioImageResize("width:" + imgTab[0] + "px; height:" + imgTab[1] + "px;");
}

function aioSaveImageAs() {
  if (!aioOnImage) return;
  if (aioFxV18) saveImageURL(aioOnImage.src, null, "SaveImageTitle", false, false,
                         aioOnImage.ownerDocument.documentURIObject, aioOnImage.ownerDocument);
  else 
     saveImageURL(aioOnImage.src, null, "SaveImageTitle", false,
       false, aioOnImage.ownerDocument.documentURIObject);

}

function aioCloseCurrTab(lastTabClosesWindow) {
  if (aioContent.mTabContainer.childNodes.length > 1 || !lastTabClosesWindow) aioContent.removeCurrentTab();
  else if (typeof(BrowserCloseWindow) == "function") BrowserCloseWindow();
       else closeWindow(true);
}

function aioUndoCloseTab() {
  try { // Fx
    undoCloseTab();
  }
  catch (e) { // SM
    gBrowser.restoreTab(0);
  }
}

function aioGotoLastTab() {
  aioContent.selectedTab = aioContent.mTabContainer.childNodes[aioContent.mTabContainer.childNodes.length - 1];
}

function aioWarnOnCloseMultipleTabs(numToClose) {
     return true;
     // the below doesn't work in SM, it's non-standard anyway, so probably we don't need it
     /* var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                   .getService(Components.interfaces.nsIPromptService);
     var bundle = aioContent.mStringBundle;
     window.focus();
     var button = promptService.confirmEx(
              window,
              bundle.getString("tabs.closeWarningTitle"),
              bundle.getFormattedString("tabs.closeWarningMultipleTabs", [numToClose]),
              (promptService.BUTTON_TITLE_IS_STRING * promptService.BUTTON_POS_0)
              + (promptService.BUTTON_TITLE_CANCEL * promptService.BUTTON_POS_1),
              bundle.getString("tabs.closeButtonMultiple"),
              null, null, null,
              {value : 0});
     return button == 0; */
}

function aioRemoveAllTabsBut() {
  var ltab = aioContent.mCurrentTab;
  if (ltab.pinned) return;
  var childNodes = aioContent.mTabContainer.childNodes;
  var numToClose = childNodes.length - 1;
  if (!aioNeverWarnOnCloseOtherTabs && numToClose > 1)
     var reallyClose = aioWarnOnCloseMultipleTabs(numToClose);
  else reallyClose = true;
  if (!reallyClose) return;
  for (var i = childNodes.length - 1; i >= 0; --i)
    if (childNodes[i] != ltab && !childNodes[i].pinned) aioContent.removeTab(childNodes[i]);
}

function aioCloseRightTabs(all) { // contributed by Holger Kratz
  var childNodes = aioContent.mTabContainer.childNodes;
  var tabPos = aioContent.mCurrentTab._tPos;
  if (tabPos >= childNodes.length - 1) return;
  if (all) {
     var numToClose = childNodes.length - tabPos - 1;
     if (!aioNeverWarnOnCloseOtherTabs && numToClose > 1)
        var reallyClose = aioWarnOnCloseMultipleTabs(numToClose);
     else reallyClose = true;
     if (!reallyClose) return;
     for (var i = childNodes.length - 1; i > tabPos; --i)
       aioContent.removeTab(childNodes[i]);
  }
  else aioContent.removeTab(childNodes[tabPos + 1]);
}

function aioCloseLeftTabs(all) { // contributed by Holger Kratz
  var childNodes = aioContent.mTabContainer.childNodes;
  var tabPos = aioContent.mCurrentTab._tPos;
  if (tabPos == 0) return;
  if (all) var end = 0; else end = tabPos - 1;
  var numToClose = tabPos - end;
  if (!aioNeverWarnOnCloseOtherTabs && numToClose > 1)
     var reallyClose = aioWarnOnCloseMultipleTabs(numToClose);
  else reallyClose = true;
  if (!reallyClose) return;
  for (var i = tabPos - 1; i >= end; --i)
    aioContent.removeTab(childNodes[i]);
}

function aioCloseAllTabs() { // contributed by Holger Kratz
  var childNodes = aioContent.mTabContainer.childNodes;
  var numToClose = childNodes.length;
  if (!aioNeverWarnOnCloseOtherTabs && numToClose > 1)
     var reallyClose = aioWarnOnCloseMultipleTabs(numToClose);
  else reallyClose = true;
  if (!reallyClose) return;
  for (var i = childNodes.length - 1; i >= 0; --i)
    aioContent.removeTab(childNodes[i]);
}

function aioGetReferrer() {
  try {
    var refURL = aioSrcEvent.target.ownerDocument.location.href;
    var ioService = Components.classes["@mozilla.org/network/io-service;1"]
                    .getService(Components.interfaces.nsIIOService);
    if (refURL) return ioService.newURI(refURL, null, null);
  }
  catch (e) {}
  return null;
}

function aioLinkInTab(url, usePref, bg) {
  var tab = aioContent.addTab(url, aioGetReferrer());
  var loadInBg = (usePref && (aioPrefRoot.getBoolPref("browser.tabs.loadInBackground") != bg)) || (!usePref && bg);
  if (!loadInBg) aioContent.selectedTab = tab;
}

function aioDupTab() {
  aioLinkInTab(window.content.document.location.href, true, false);
}

function aioMarkLinkVisited(href, linkNode) {
  if (typeof(markLinkVisited) == "function") markLinkVisited(href, linkNode);
}

function aioOpenInNewTab(bg) {
  if (aioOpenLinkInNew && aioOnLink.length) {
     aioLinkInTab(aioOnLink[0].href, false, bg);
     aioMarkLinkVisited(aioOnLink[0].href, aioOnLink[0].node);
  }
  else {
     if (!bg) BrowserOpenTab();
     else aioLinkInTab("about:blank", false, true);
  }
}

function aioLinksInTabs() {
  for (var i = 0; i < aioOnLink.length; ++i) {
    aioContent.addTab(aioOnLink[i].href, aioGetReferrer());
    aioMarkLinkVisited(aioOnLink[i].href, aioOnLink[i].node);
  }
}

function aioLinksInFiles() {
  var hRefLC, dontAskBefore;
  try {dontAskBefore = aioPrefRoot.getBoolPref("browser.download.useDownloadDir");}
  catch(err) {dontAskBefore = false;}
  for (var i = 0; i < aioOnLink.length; ++i) {
    hRefLC = aioOnLink[i].href.toLowerCase();
    if (hRefLC.substr(0, 7) != "mailto:" && hRefLC.substr(0, 11) != "javascript:" &&
        hRefLC.substr(0, 5) != "news:" && hRefLC.substr(0, 6) != "snews:")
       if (aioFxV18) saveURL(aioOnLink[i].href, aioGetTextForTitle(aioOnLink[i].node), null, true, dontAskBefore,
	                      aioOnLink[i].node.ownerDocument.documentURIObject, aioOnLink[i].node.ownerDocument);
	   else saveURL(aioOnLink[i].href, aioGetTextForTitle(aioOnLink[i].node), null, true, dontAskBefore);

  }
}

function aioNewWindow(url, flag) {
  if (window.content && window.content.document) {
     var charsetArg = "charset=" + window.content.document.characterSet;
     return window.openDialog("chrome://navigator/content/", "_blank", "chrome,all,dialog=no" + flag, url, charsetArg);
  }
  return window.openDialog("chrome://navigator/content/", "_blank", "chrome,all,dialog=no" + flag, url);
}

function aioLinksInWindows() {
  if (!aioOnLink.length) return;
  if (aioSingleNewWindow) {
    var win = aioNewWindow(aioOnLink[0].href, "");
    
    var gestureLinks = [];
    for (var i = 1; i < aioOnLink.length; ++i) {
      gestureLinks.push(aioOnLink[i].href);
    }
    
    win.addEventListener("load", function () {
      setTimeout(function() {
        for (var i = 0; i < gestureLinks.length; ++i) {
          win.gBrowser.addTab(gestureLinks[i]);
        }
      }, 100);
    }, true);
//  aioMarkLinkVisited(aioOnLink[i].href, aioOnLink[i].node);
  }
  else
     for (i = 0; i < aioOnLink.length; ++i) {
        aioNewWindow(aioOnLink[i].href, "");
        aioMarkLinkVisited(aioOnLink[i].href, aioOnLink[i].node);
     }
}

function aioSetToNormalZ(aWindow) {
  window.focus();
  var treeowner = aWindow.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebNavigation)
                     .QueryInterface(Components.interfaces.nsIDocShellTreeItem).treeOwner;
  var xulwin = treeowner.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIXULWindow);
  xulwin.zLevel = xulwin.normalZ;
}

function aioOpenNewWindow(background) {
  var s = (background && aioIsWin) ? ",alwaysLowered" : "";
  var win;
  if (aioOpenLinkInNew && aioOnLink.length) {
     win = aioNewWindow(aioOnLink[0].href, s);
     aioMarkLinkVisited(aioOnLink[0].href, aioOnLink[0].node);
  }
  else {
     if (aioOnImage) win = aioNewWindow(aioOnImage.src, s);
     else win = aioNewWindow("", s);
  }
  if (background) {
    if (aioIsWin) {
      setTimeout(function(a){aioSetToNormalZ(a);}, 500, win);
    } else {
      win.addEventListener('load', function() {
        setTimeout(function() {
          window.focus();
        }, 400);
        setTimeout(function() {
          window.focus();
        }, 800);
      }, true);
    }
  }
}

function aioDupWindow() {
  aioNewWindow(window.content.document.location.href, "");
}

function aioCloseWindow() {
  if ("BrowserTryToCloseWindow" in window)
      window.setTimeout(function() { BrowserTryToCloseWindow(); }, 10);
    else
      window.setTimeout(function() { window.close(); }, 10);
}

function aioDoubleWin() {
  if (!aioOnLink.length) return;
  window.moveTo(0, 0);
  var width = aioIsWin ? (screen.availWidth / 2) : (screen.availWidth / 2 - 5);
  window.resizeTo(width, screen.availHeight);
  var win = aioNewWindow(aioOnLink[0].href, "");
  win.moveTo(screen.availWidth / 2, 0);
  aioMarkLinkVisited(aioOnLink[0].href, aioOnLink[0].node);
}

function aioNextPrevLink(next) { // submitted by Christian Kruse
  if (next && document.getElementById("nextPleasePopupMenu")) {
     document.getElementById("nextPleasePopupMenu").doCommand();
     return;
  }
  if (!next && document.getElementById("prevPleasePopupMenu")) {
     document.getElementById("prevPleasePopupMenu").doCommand();
     return;
  }
  var re = [];
  var relStr = next ? "next" : "prev" ;
  var doc = aioSrcEvent.target.ownerDocument;
  var links = doc.getElementsByTagName("link");
  var imgElems;
  for (var i = 0; i < links.length; ++i)
    if (links[i].getAttribute("rel") && links[i].getAttribute("rel").toLowerCase() == relStr)
       if (links[i].href) {loadURI(links[i].href); return;}
  if (!aioNextsString) return;
  var nextArray = next ? aioNextsString.split("|") : aioPrevsString.split("|");
  for (var j = 0; j < nextArray.length; ++j)
     re[j] = new RegExp(nextArray[j], "i");
  links = doc.links;
  for (j = 0; j < re.length; ++j)
    for (i = 0; i < links.length; ++i) // search for exact match
      if (links[i].textContent && links[i].textContent.search(re[j]) != -1 &&
          nextArray[j].length == links[i].textContent.length && links[i].href) {
         loadURI(links[i].href);
         return;
      }
  for (j = 0; j < re.length; ++j)
    for (i = 0; i < links.length; ++i) { // search for partial match
      if (links[i].textContent && links[i].textContent.search(re[j]) != -1 && links[i].href) {
         loadURI(links[i].href);
         return;
      }
      imgElems = links[i].getElementsByTagName("img"); // Is it an image tag?
      if (imgElems.length > 0 && imgElems[0].src && imgElems[0].src.search(re[j]) != -1 && links[i].href) {
         loadURI(links[i].href);
         return;
      }
    }
}

function aioSmartBackForward(aRwnd, aCurrDomainEndPoint) { // derived from SHIMODA "Piro" Hiroshi Rewind/Fastforward buttons
  var webNav = getWebNavigation();
  var sessionH = webNav.sessionHistory;
  var lURI = sessionH.getEntryAtIndex(sessionH.index, false).URI;
  var c_host = lURI ? lURI.host : null ;
  var check = (aRwnd == -1) ? function(aInd) {return aInd >= 0;} : function(aInd) {return aInd < sessionH.count;}
  var start = sessionH.index + aRwnd;
  var t_host;
  for (var i = start; check(i); i += aRwnd) {
     lURI  = sessionH.getEntryAtIndex(i, false).URI;
     t_host = lURI ? lURI.host : null ;
     if ((c_host && !t_host) || (!c_host && t_host) || (c_host != t_host)) {
        if (aCurrDomainEndPoint) {
           if (i == start) {
              c_host = t_host;
              continue;
           }
           i -= aRwnd;
        }
	webNav.gotoIndex(i);
        return;
     }
  }
  webNav.gotoIndex((aRwnd == -1) ? 0 : sessionH.count - 1 );
}

function aioFastForward() {
  var sessionH = getWebNavigation().sessionHistory;
  if (sessionH.index < 0 || sessionH.count <= 0) return; // Firefox bug
  if (sessionH.index + 1 < sessionH.count) BrowserForward();
  else aioNextPrevLink(true);
}

function aioHomePage() {
  var url = aioGetHomePageUrl();
  
  if (url) {
    if (aioGoUpInNewTab && window.content.document.location.href != "about:blank") {
      aioLinkInTab(url, false, false);
    }
    else {
      loadURI(url);
    }
  }
}

function aioGetHomePageUrl() {
  var prefb = Components.classes["@mozilla.org/preferences-service;1"]
                       .getService(Components.interfaces.nsIPrefService);

  var uri = prefb.getComplexValue("browser.startup.homepage",
                                  Components.interfaces.nsISupportsString).data;
  return uri;
}

function aioUpDir() { // from Stephen Clavering's GoUp
  function getUp(url) {
    var origUrl = url;
    // trim filename (this makes subdriectory digging easier)
    var matches = url.match(/(^.*\/)(.*)/);
    if (!matches) return ""; //only fails if "url" has no /'s
    url = matches[1];
    if (url != origUrl && !/(index|main)\.(php\d?|html?)/i.test(url)) return url;
    // dig through subdirs
    matches = url.match(/^([^\/]*?:\/\/.*\/)[^\/]+?\//);
    if (matches) return matches[1];
    // we've reach (ht|f)tp://foo.com/, climb up through subdomains
    // split into protocol and domain
    matches = url.match(/([^:]*:\/\/)?(.*)/);
    var protocol = matches[1];
    var domain = matches[2];
    matches = domain.match(/^[^\.]*\.(.*)/);
    if (matches) return (protocol + matches[1]);
    // nothing found
    return "";
  }
  var url = getUp(window.content.document.location.href);
  if (!url) return;
  if (aioGoUpInNewTab) aioLinkInTab(url, false, false);
  else loadURI(url);
}

function aioRestMaxWin() {
  if (window.windowState == STATE_MAXIMIZED) window.restore();
  else window.maximize();
}

function aioFrameInfo() {
  var targetDoc = aioSrcEvent.target.ownerDocument;
  if (targetDoc.defaultView.frameElement) BrowserPageInfo(targetDoc); // it's a frame
  else BrowserPageInfo();
}

function aioShowHideStatusBar() {
  var bar = document.getElementById("status-bar");
  if (bar) bar.hidden = !bar.hidden;
}

function aioViewSource(frame) {
   if (frame) BrowserViewSourceOfDocument(aioSrcEvent.target.ownerDocument);
   else BrowserViewSourceOfDocument(window.content.document);
}

function aioViewCookies() { //Contributed by Squarefree.com
  if (window.content.document.cookie)
    alert(aioGetStr("cookies") + "\n\n" +
       window.content.document.cookie.replace(/; /g,"\n"));
  else alert(aioGetStr("noCookies"));
}

function aioDeleteCookies() { //Contributed by Squarefree.com
  var d, sl, p, i, cookie;
  var cookieStr = window.content.document.cookie;
  if (!cookieStr) alert(aioGetStr("noCookies"));
  var cookies = cookieStr.split("; ");
  for (d = "." + window.content.document.location.host; d; d = ("" + d).substr(1).match(/\..*$/))
    for (sl = 0; sl < 2; ++sl)
      for (p = "/" + window.content.document.location.pathname; p; p = p.substring(0, p.lastIndexOf('/')))
        for (i in cookies) {
          cookie = cookies[i];
          if (cookie) window.content.document.cookie = cookie + ";domain = " + d.slice(sl) + "; path=" +
                   p.slice(1) + "/" + "; expires=" + new Date((new Date).getTime()-1e11).toGMTString();
        }
}

function aioBookmarkCurrentPage() {
  PlacesCommandHook.bookmarkCurrentPage(true, PlacesUtils.bookmarksMenuFolderId);
}

function aioMetaInfo() {
  var metas, metastr, mymeta;
  metas = window.content.document.getElementsByTagName("meta");
  if (metas.length) {
    metastr = aioGetStr("meta") + "\n\n";
    for (var i = 0; i < metas.length; ++i) {
      mymeta = metas.item(i);
      metastr += "<META ";
      if (mymeta.name) metastr += "name=\"" + mymeta.name + "\" ";
      if (mymeta.httpEquiv) metastr+= "http-equiv=\"" + mymeta.httpEquiv + "\" ";
      if (mymeta.content) metastr += "content=\"" + mymeta.content + "\" ";
      if (mymeta.scheme) metastr += "scheme=\"" + mymeta.scheme + "\" ";
      metastr += ">\n";
    }
    alert(metastr);
  }
  else alert(aioGetStr("noMeta"));
}

function aioActionOnPage(caseNb) { // code by Ben Basson aka Cusser
  var service, serviceDomain;
  switch(caseNb) {
    case 0: service = "http://validator.w3.org/check?uri=";
            serviceDomain = "validator.w3.org";
            break;
    case 1: service = aioGetStr("g.translateURL");
            serviceDomain = "translate.google.com";
  }
  var targetURI = getWebNavigation().currentURI.spec; 
  if (targetURI.indexOf(serviceDomain) >= 0) BrowserReload(); // already activated
  else loadURI(encodeURI(service + targetURI));
}

function aioOpenAioOptions() {
  window.openDialog(aioDir + "pref/aioOptions.xul", "", "chrome,dialog,modal,resizable");
}

function aioOpenBookmarksManager() {
  toOpenWindowByType("bookmarks:manager",
    "chrome://communicator/content/bookmarks/bookmarksManager.xul");
}

function aioOpenAddonManager() {
  BrowserOpenAddonsMgr();
}

function aioOpenDownloadManager() {
  toOpenWindowByType("Download:Manager",
                          "chrome://communicator/content/downloads/downloadmanager.xul",
                          "chrome,dialog=no,resizable");
}

function aioImageInWindow() {
   if (aioOnImage) aioNewWindow(aioOnImage.src);
}

function aioImageInTab() {
   if (aioOnImage) aioLinkInTab(aioOnImage.src, false, false);
}

function aioNullAction() {
  alert("This action does not exist");
}