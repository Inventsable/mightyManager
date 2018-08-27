var csInterface = new CSInterface();
var menu_ContextXML = '<Menu> \
   <MenuItem Id="refresh" Label="Refresh panel" Enabled="true" Checked="false"/> \
   <MenuItem Id="rollcall" Label="Roll call" Enabled="true" Checked="false"/> \
   <MenuItem Label="---" /> \
  </Menu>';
csInterface.setContextMenu(menu_ContextXML, setContextMenuCallback);

function setContextMenuCallback(event) {
  if (event == "refresh") {
    location.reload();
  } else if (event === 'rollcall') {
    app.sendRollCall();
  } else {
    console.log(event);
  }
}
