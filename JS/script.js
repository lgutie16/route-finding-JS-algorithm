window.onload = () =>{
    document.querySelector('.board');

    //Initial setup
    let startPoint = document.querySelector("[id='16']");

        //Positioner
    let positioner = document.createElement('div');
    positioner.className = 'position';

        //Place start point
    startPoint.append(positioner)

        //Add event listener
    const cells =  document.querySelectorAll('.cell')
    //console.log("CELL",cells)
    let destinationCell = startPoint
    cells.forEach(function(cell) {
        cell.addEventListener('click',() => {
            destinationCell.classList.remove('destination')
            cell.classList.add('destination')
            destinationCell = cell
        });
    });

    
}
