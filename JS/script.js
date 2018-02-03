window.onload = () =>{
    document.querySelector('.board');

    //Initial setup
    let startPoint = document.querySelector("[id='16']");

    //Positioner
    let positioner = document.createElement('div');
    positioner.className = 'position';

    //Place start point
    startPoint.append(positioner)
}
