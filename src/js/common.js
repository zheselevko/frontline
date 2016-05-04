 $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

  });
 $(function()
{
	$('.scroll-pane').jScrollPane({
		contentWidth: '0px'
	});
});
function setEqualHeight(columns)
{
var tallestcolumn = 0;
columns.each(
function()
{
currentHeight = $(this).height();
if(currentHeight > tallestcolumn)
{
tallestcolumn = currentHeight;
}
}
);
columns.height(tallestcolumn);
}
$(document).ready(function() {
setEqualHeight($(".news .l4"));
});
