window.onload = () =>{
    document.querySelector('.board');

    //Initial setup
    let startingPoint = document.querySelector("[id='16']");

        //Positioner
    let positioner = document.createElement('div');
    positioner.className = 'position';

        //Place start point
    startingPoint.append(positioner)
    startingPoint.dataset.isStartPoint = true

        //Add event listener
    const cells =  document.querySelectorAll('.cell')
    
    //Destination class
    let destinationCell = startingPoint
    cells.forEach(cell => {
        cell.addEventListener('click',() => {
            destinationCell.classList.remove('destination')
            cell.classList.add('destination')
            destinationCell = cell

            routeFinding(null, startingPoint, destinationCell, 1)
            //Moveball()
        });
    });

    const routeFinding = (father,startingPoint, destination, index) => {
        //Cells 
        console.log(destination)
        if(destination.dataset.isStartPoint) return
        //console.log("DESTINATION",destination)
        const adjacents = Array.from(cells).filter(cell => {
            const isWall = cell.classList.contains('wall')
            const adjTop = parseInt(cell.dataset.col,10) === parseInt(destination.dataset.col,10) && parseInt(cell.dataset.row,10) + 1 === parseInt(destination.dataset.row, 10)
            const adjDown = parseInt(cell.dataset.col,10) === parseInt(destination.dataset.col,10) && parseInt(cell.dataset.row,10) - 1  === parseInt(destination.dataset.row, 10)
            const adjRight = parseInt(cell.dataset.row,10) === parseInt(destination.dataset.row,10) && parseInt(cell.dataset.col,10) + 1 === parseInt(destination.dataset.col, 10)
            const adjLeft = parseInt(cell.dataset.row,10) === parseInt(destination.dataset.row,10) && parseInt(cell.dataset.col,10) - 1  === parseInt(destination.dataset.col, 10)
            
            const isAdj = !isWall && (adjDown|| adjLeft|| adjRight|| adjTop) && cell !== father &&  !cell.dataset.weight 
            //console.log("ADJACENT",cell.dataset, isAdj)
            return isAdj
        })

        console.log("\n\n\n",index, '\n\n')
        console.log(adjacents)
        const indexMod = index+1
        adjacents.forEach((adjacent) => {
            if(!adjacent.dataset.weight){
                adjacent.dataset.weight = index
                adjacent.innerHTML = index.toString()
            }

        })

        adjacents.forEach((adjacent) => {
            routeFinding(destination, startingPoint,adjacent, indexMod)
        })        
    }
}
