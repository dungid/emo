/**
 * talEmoti.js : defining of talEmoti object, supports Blogger to display emoticons/smilies
 * Version 1.0.3, added more default icons
 * Author by dungid
 * @2012 BellaJS Group
 */

;(function(){
  var _sers = 'http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/';
	var _emos = [		
		['yeah',			'\\m/',			'111'],		
		['confused',		':-/',			'7'],
		['waiting',			':-w',			'45'],
		['time out',		':-t',			'104'],
		['thinking',		':-?',			'39'],
		['day dreaming',	'8->',			'105'],
		['rolling eyes',	'8-|',			'29'],
		['hee hee',			';))',			'71'],
		['sleepy',			'I-)',			'28'],
		['loser',			'L-)',			'30'],
		['silly',			'8-}',			'35'],
		['no talking',		'[-(',			'33'],
		['broken heart',	'=((',			'12'],
		['surprise',		':-O',			'13'], 
		['shame on you',		'[-X',		'68'],
		['cool',				'B-)',		'16'],
		['crying',				':((',		'20'],
		['laughing',			':))',		'21'],
		['laughing',			'=))',		'21'],
		['kiss',				':-*',		'11'],
		['nail biting',			':-SS',		'42'],
		["don\\'t tell anyone",	':-$',		'32'],
		['yawn',				'(:|',		'37'],
		['nerd',				':-B',		'26'],
		['chatterbox',			':-@',		'76'],
		['applause',			'=D>',		'41'],
		['blushing',			':">',		'9'],		
		['money eyes',			'$-)',		'64'],
		['oh go on',			':-j',		'78'],
		["I don\\'t know",		':-??',		'106'],
		['thumbs down',			':-q',		'112'],
		['bring it on',			'>:/',		'70'],
		['hurry up!',			':!!',		'110'],
		['thumbs up',			':-bd',		'113'],
		['coffee',				'~O)',		'57'],
		['batting eyelashes',	';;)',		'5'],
		["d\\'oh",				'#-o',		'40'],
		['on the phone',		':)]',		'100'],
		['call me',				':-c',		'101'],
		['big hug',				'>:D<',		'6'],
		['good luck',			'%%-',		'54'],
		['rose',				'@};-',		'53'],
		['daydreaming',			'8->',		'105'],
		['praying',				'[-O<',		'63'],
		['skull',				'8-X',		'59'],
		['bee',					':bz',		'115'],
		['bug',					'=:)',		'60'],
		['pig',					':@)',		'49'],
		['idea',				'*-:)',		'58'],
		['angel',				'O:)',		'25'],
		['sick',				':-&',		'31'],
		['monkey',				':(|)',		'51'],
		['chicken',				'~:>',		'52'],
		['puppy dog eyes',		':o3',		'108'],
		['cow',					'3:-O',		'50'],
		['whistling',			':-"',		'65'],		
		['star',				'(*)',		'79'],
		['tongue',				':P',		'10'],
		['worried',				':-S',		'17'],
		['happy',				':)',		'1'],
		['sad',					':(',		'2'],
		['big grin',			':D',		'4'],
		['love struck',			':x',		'8'],	
		['straight face',		':|',		'22'],
		['angry',				'X(',		'14'],			
		['winking',				';)',		'3']
                         ['rolling on the floor',				'=))',		'116']
	];
	var replaceAll = function(a, b, c){
		var aa = a.split(b);
		return aa.join(c);
	}	
	var getElementsByClass = function (className, tag, elm){
		if(document.getElementsByClassName){
		  var getElementsByClassName = function (className, tag, elm){
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)){
					returnElements.push(current);
				}
			}
			return returnElements;
		  };
		}
		else if (document.evaluate) {
		  var getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		  };
		}
		else {
		  var getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		  };
		}
		return getElementsByClassName(className, tag, elm);
	}		
	
	var classItems = ['entry-content', 'comment-content', 'owner-Body', 'comment-body'];
	var forceStyle = 'position:relative;top:0px;left:0px;margin:0px;padding:0px;border:none;background:none !important;background-color:transparent !important;display:inline-block;min-width:16px;min-height:16px;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;';
	
	var talEmoti = window['talEmoti'] = {
		emos : [],
		setIcon : function(sign, path, title){
			var ob = {
				sign : sign||'',
				path : path||'',
				title : title||''
			}
			this.emos.push(ob);	
		},
		run : function(classToParse){
			var ctp = classToParse instanceof Array?classToParse:[];
			ctp = ctp.concat(classItems);
			var els = [];
			for(var i=0;i<ctp.length;i++){
				var _els = getElementsByClass(ctp[i]);
				els = els.concat(_els);
			}
			if(els.length>0){			
				var emos = talEmoti.emos;
				function _addIcon(ss){
					for(var j=0;j<emos.length;j++){
						var emo = emos[j];
						var img = '<img style="'+forceStyle+'" src="'+emo.path+'" title="'+emo.title+'">';
						var s = emo.sign;
						ss = replaceAll(ss, s, img);
						ss = replaceAll(ss, s.toLowerCase(), img);		
					}
					return ss;
				}				
				function _parseNode(n){
					if(n.childNodes.length>0){
						for(var i=0;i<n.childNodes.length;i++){
							_parseNode(n.childNodes[i]);
						}
					}
					else{
						if(n.nodeType==3){
							n.nodeValue = _addIcon(n.nodeValue);	
							var ch = document.createElement('SPAN');
							ch.innerHTML = _addIcon(n.nodeValue);
							n.parentNode.replaceChild(ch, n);
						}					
					}
				}
				for(var i=0;i<els.length;i++){
					_parseNode(els[i]);
				}
			}			
		}
	}
	;(function(){
		for(var i=0;i<_emos.length;i++){
			talEmoti.setIcon(_emos[i][1], _sers+_emos[i][2]+'.gif', _emos[i][0]);
		}
	})();
})();
