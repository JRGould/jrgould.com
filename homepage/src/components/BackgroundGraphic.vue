<template>
	<div>
		<canvas></canvas>
	</div>
</template>

<script>
	export default {
		mounted() {
			let canvas = this.$el.children[0];
			let context = canvas.getContext('2d');
			let mid = Math.random();
			mid = .15 + (Math.random() * .2) ;

			let size = Math.max( document.body.scrollWidth, document.body.scrollHeight ) * 2;
			let step = 70;

			canvas.width = size;
			canvas.height = size;
			
			function draw(x, y, width, height, leftToRight) {

			if( leftToRight ) {
				context.moveTo(x, y );
				context.lineTo(x + width, y + height );    
			} else {
				context.moveTo(x + width, y);
				context.lineTo(x, y + height);
			}
			context.lineWidth = 2;
			context.strokeStyle = '#ddd';

			context.stroke();
			}
			for( let y = 0; y < size; y += step) {
				for( let x = 0; x < size; x+= step ) {
					let leftToRight = Math.random() >= mid;
					let stuff = {x,y,step, leftToRight}
					
					if( leftToRight ) {
						draw(stuff.x, stuff.y, stuff.step, stuff.step, stuff.leftToRight);
						continue;
					}
					setTimeout( () => draw(stuff.x, stuff.y, stuff.step, stuff.step, stuff.leftToRight), Math.random()*100000 );
				}
			}

		}
	}
</script>

<style scoped >
	div{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		
		overflow: hidden;
	}
	canvas {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100vmax;
		height: 100vmax;
	}
</style>