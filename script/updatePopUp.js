
setTimeout(showPopUp, 2000);

function showPopUp () 
{
	let refPopUp = document.getElementById('update-info');

	refPopUp.style.left = '0';
}

function hidePopUp () 
{
	let refPopUp = document.getElementById('update-info');

	refPopUp.style.left = '-100%';
}