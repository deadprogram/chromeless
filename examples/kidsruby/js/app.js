//var server = new KidsRubyServer();
//server.start();  

function selectTab(n) {
  if ($("#tabs").data("mytabs").tabs('option', 'selected') != n) {
    $("#tabs").data("mytabs").tabs('select', n);
  }
}

function deleteLastStdIn() {
  var str = $('#stdin').html();
  var newStr = str.substring(0, str.length-1);
  $('#stdin').html(newStr);
}

function updateStdIn(newHtml) {
  if ( !$('#stdin').length ) { 
    updateStdOut("<div id='stdin'></div>");
  } 
  $('#stdin').append(newHtml);
}

function cutStdInToStdOut() {
  copyStdIntoStdOut();
  removeStdIn();
}

function removeStdIn() {
  $("#stdin").remove();
}

function copyStdIntoStdOut() {
  $("#stdout").append($("#stdin").html());
}

function updateStdOut(newHtml) {
	$("#stdout").append(unescape(newHtml));
};

function updateStdErr(newHtml) {
	$("#stderr").append(unescape(newHtml));
}

function clearOutputs() {
	$.each(["stdout", "stderr"], function(i, item) {
		$("#" + item).html("");
	});
}

function submitRubyCode(editor) {
	var ruby = editor.getCode();
  var runner = new Runner(ruby);
  runner.run();
}

function openRubyCode() {
  // todo: implement this using Titanium
	//QTApi['openRubyFile(QString)']("");
}

function saveRubyCode(editor) {
  // todo: implement this using Titanium
	//var ruby = editor.getCode();
	//QTApi['saveRubyFile(QString)'](ruby);
}

function getEditor() {
  return $("#rubycode").data("editor");
}

function clearCode() {
  getEditor().setCode("");
}

function addCode(code) {
  getEditor().setCode(getEditor().getCode() + "\n" + code);
}

function initTurtle() {
  var turtle = new Pen("turtle-canvas");
  turtle.center();
	$("#turtle").data('turtle', turtle);
  selectTab(2);
}

function callTurtle(arguments) {
  var turtle = $("#turtle").data('turtle');
  var command = Array.prototype.shift.call(arguments);
  return turtle[command].apply(turtle, arguments);
}

function getTurtle() {
  return $("#turtle").data('turtle');
}

function setTurtleBackground(color) {
  $("#turtle").css('backgroundColor', unescape(color));
}


function initServer() {
  // var server = new KidsRubyServer();
  // server.start();  
}

$(document).ready(function() {
	var docWidth = $("body").width();
  var docHeight = $(document).height();

  CodeMirrorConfig.stylesheet = "css/rubycolors.css"; // this will allow us to dynamically change style at runtime
  var editor = CodeMirror.fromTextArea('rubycode', {
	      parserfile: ["../../js/tokenizeruby.js", "../../js/parseruby.js"],
	      path: "codemirror/js/",
	      lineNumbers: true,
	      textWrapping: false,
	      indentUnit: 2,
				tabMode: "indent",
				content: $('#rubycode').val(),
	      parserConfig: {},
	      width: docWidth,
	      height: '95%',
				iframeClass: 'editor-window',
	    	autoMatchParens: true
	  });

	$("#rubycode").data("editor", editor);

	// Set the output width
	$("#output").width = docWidth;

  var tabs = $("#tabs").tabs();
  $("#tabs").data("mytabs", tabs);

  $("#run").click(function(e) {
    selectTab(1);
    clearOutputs();
    submitRubyCode(editor);
  });

	$("#open").click(function(e) {
		openRubyCode(editor);
	});

	$("#save").click(function(e) {
		saveRubyCode(editor);
	});
	
	initTurtle();
	
	initServer();

  selectTab(0); // default to help tab
});
