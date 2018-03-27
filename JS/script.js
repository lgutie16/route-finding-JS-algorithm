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

    //Calc Adjacent cells
    const cellWithAdj = Array.from(cells).map(cell => {
        const adjacent =  []
        const cellAdj = Array.from(cells).filter(destination => {
            const isWall = destination.classList.contains('wall')
            const adjTop = parseInt(cell.dataset.col,10) === parseInt(destination.dataset.col,10) && parseInt(cell.dataset.row,10) + 1 === parseInt(destination.dataset.row, 10)
            const adjDown = parseInt(cell.dataset.col,10) === parseInt(destination.dataset.col,10) && parseInt(cell.dataset.row,10) - 1  === parseInt(destination.dataset.row, 10)
            const adjRight = parseInt(cell.dataset.row,10) === parseInt(destination.dataset.row,10) && parseInt(cell.dataset.col,10) + 1 === parseInt(destination.dataset.col, 10)
            const adjLeft = parseInt(cell.dataset.row,10) === parseInt(destination.dataset.row,10) && parseInt(cell.dataset.col,10) - 1  === parseInt(destination.dataset.col, 10)

           if(!isWall && (adjDown|| adjLeft|| adjRight|| adjTop)){
            adjacent.push(destination)
            return destination
           } 
           return
        })   
        
        cell.dataset.adjacent = adjacent

        return cell
    })
    
    //Destination class
    let destinationCell = startingPoint
    cells.forEach(cell => {
        cell.addEventListener('click',() => {
            destinationCell.classList.remove('destination')
            cell.classList.add('destination')
            destinationCell = cell

            bfs(cellWithAdj, destinationCell)
            //moveBall()
        });
    });

    
    //G = set of cells
    //s destination point
    const bfs = (G, s) => {
        //Painting cell
        G.forEach(cell => {
            if(cell !== s){
                cell.dataset.color = "white"
                cell.classList.add('white')
                cell.dataset.distance = null
                cell.dataset.parent = null
            }
        })

        s.dataset.color = "gray"
        s.classList.add('gray')
        s.dataset.distance = 0
        s.dataset.parent = null

        var Q = []
        Q.push(s)

        while(Q.length !== 0){
            const u = Q.shift()
            Array.from(u.dataset.adjacent).forEach(v => {
                console.log(v)
                if(v.dataset.color === "white"){
                    v.dataset.color = "gray"
                    v.classList.add('gray')
                    v.dataset.distance = u.dataset.distance + 1
                    v.dataset.parent = u
                    Q.push(v)
                }
            })
            u.dataset.color = "black"
            u.classList.add('black')
        }

    }
}
