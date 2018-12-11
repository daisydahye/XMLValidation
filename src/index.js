/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/
exports.isValidXML = xmlString => {
  if (xmlString.length === 0) {
    return false;
  }
  xmlString = '<root>'+xmlString+'</root>';   // for multiple root nodes
  var oParser = new DOMParser();
  var oDOM = oParser.parseFromString(xmlString, "application/xml");
  if(oDOM.documentElement.nodeName == "parsererror") return false;
  var arr = xmlString.match(/<.+?>/g);
  var last = '';
  var level = 0;
  for(let i=0;i<arr.length;i++) {
    if(last === arr[i]) return false;
    if(arr[i].slice(0,2) === '</') {
      last = arr[i];
      level--;
    } else {
      level++;
      if(level > 3) return false;
    }
  }
  return true;
};
