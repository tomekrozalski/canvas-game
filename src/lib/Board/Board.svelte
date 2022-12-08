<script lang="ts">
	import { onMount } from 'svelte';
  import { boardSize, scrollData } from './store';

	let pixelRatio = 1;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

  let isDragable = false;
  let verticalOffset = 0;
	let dragData = {
		beforeXPosition: 0,
		currentXPosition: 0,
    beforeYPosition: 0,
		currentYPosition: 0
	};


	const setCanvasDimensions = () => {
    boardSize.set({
      width: window.innerWidth,
	    height: window.innerHeight,
    })

		pixelRatio = window.devicePixelRatio ?? 1;
	};

	const draw = () => {
    ctx.translate($scrollData.horizontalMove, 0)
    ctx.clearRect(-20000, -20000, $boardSize.width * pixelRatio + 40000, $boardSize.height * pixelRatio + 40000);



    const rectSize = 50;
    let xPos = 0;
    let yPos = 0;

    for (let i = 0; i <= 255; i = i + 1) {
      for (let j = 0; j <= 255; j = j + 1) {
        ctx.fillStyle = `rgb(${i}, ${j}, 50)`;
        ctx.fillRect(xPos, yPos, rectSize, rectSize);

        xPos = xPos + rectSize + 5;
      }

      xPos = 0;
      yPos = yPos + rectSize + 5;
    }

    window.requestAnimationFrame(draw);
	};

  const moveBoard = (e: Event) => {
		if (isDragable) {
      dragData.beforeXPosition = dragData.currentXPosition;
			dragData.currentXPosition = e.clientX;

      dragData.beforeYPosition = dragData.currentYPosition;
			dragData.currentYPosition = e.clientY;

      if (!dragData.beforeYPosition || !dragData.beforeYPosition) {
        return;
      }

      const horizontalDiff = dragData.beforeXPosition - dragData.currentXPosition;
      const verticalDiff =  dragData.currentYPosition - dragData.beforeYPosition;

      console.log('horizontalDiff', horizontalDiff)

      scrollData.update(data => {
        // console.log('first', data.offsetLeft, horizontalDiff);


          return {
            horizontalMove: data.offsetLeft - horizontalDiff <= 0 ?  0 : horizontalDiff,
            verticalMove: 0,
            offsetLeft: data.offsetLeft - horizontalDiff <= 0 ? data.offsetLeft : data.offsetLeft - horizontalDiff,
            offsetRight: 0,
          }

      });

		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		setCanvasDimensions();
    draw();

		window.addEventListener('resize', setCanvasDimensions);
    return () => window.removeEventListener('resize', setCanvasDimensions);
	});

  const stopMove = () => {
    isDragable = false;

    scrollData.update(data => ({
      ...data,
      horizontalMove: 0,
      verticalMove: 0,
  }));

  }
</script>

<canvas
	width={$boardSize.width * pixelRatio}
	height={$boardSize.height * pixelRatio}
	style="width: {$boardSize.width}px; height: {$boardSize.height}px"
  on:pointerup={stopMove}
  on:pointerdown={() => (isDragable = true)}
  on:pointerout={stopMove}
  on:pointermove={moveBoard}
	bind:this={canvas}
/>
