window.GhostURL = document.body.getAttribute('data-ghost_url')

requirejs.config({
	paths: {
		fluidvids: 	'https://cdn.jsdelivr.net/gh/toddmotto/fluidvids@2.4.1/dist/fluidvids.min',
		velocity: 	'https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.0/velocity.min',
		velocityUI: 'https://cdnjs.cloudflare.com/ajax/libs/velocity/1.5.0/velocity.ui',
		prettify: 	'prettify.min'		
	}
});


requirejs(
[
	'fluidvids',
	'velocity',
	'prettify'	
],
function(fluidvids, prettify){

	require(['velocityUI'])

	fluidvids.init({
		selector: ['iframe', 'object'], // runs querySelectorAll()
		players: ['www.youtube.com', 'player.vimeo.com'] // players to support
	});

	var preBlocks = document.querySelectorAll('pre');

	for (var i = 0; i < preBlocks.length; i++) {
		preBlocks[i].classList.add('prettyprint');
	}

	prettyPrint();

});