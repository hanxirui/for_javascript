$(document).ready(function(){
	// 元素原则器
	$('#selected-plays > li').addClass('horizontal');
	$('#selected-plays > li:not(.horizontal)').addClass('sub-level');

	// 属性选择器
	$('a[href^="mailto:"]').addClass('mailto');
    $('a[href$=".pdf"]').addClass('pdflink');
    $('a[href^="http"][href*="henry"]').addClass('henrylink');

// $('tr:even').addClass('alt');
$('tr:nth-child(odd)').addClass('alt');
$('td:contains(Henry)').addClass('highlight');



});