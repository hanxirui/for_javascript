var existsFlag = null;

function showTab1(tabHeadId, tabContentId) {
  if (isCustom === '0') {
    changeTab(tabHeadId, tabContentId);
  } else {
    //判断当前指标是否存在
    if (existsFlag === null) {
      existsFlag = checkMetricIdExists();
    }
    if (checkMetricInfoNoNull() && existsFlag) {
      changeTab(tabHeadId, tabContentId);
    }
  }
}

function changeTab(tabHeadId, tabContentId) {
  var tabDiv = document.getElementById("tabDivAdd");
  var taContents = tabDiv.childNodes;
  for (i = 0; i < taContents.length; i++) {
    if (taContents[i].id != null && taContents[i].id != 'tabsHeada') {
      taContents[i].style.display = 'none';
    }
  }
  document.getElementById(tabContentId).style.display = 'block';
  var tabHeads = document.getElementById('tabsHeada')
    .getElementsByTagName('a');

  for (i = 0; i < tabHeads.length; i++) {
    tabHeads[i].className = 'tabsa';
  }
  document.getElementById(tabHeadId).className = 'curtaba';
  document.getElementById(tabHeadId).blur();
}