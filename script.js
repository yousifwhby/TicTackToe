window.addEventListener('DOMContentLoaded',()=>{
    const tiles=Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['','','','','','','','',''];
    let CurrentPlayer ='X';
    let isGameActive =true;

    const PlayerX_Won='PLAYERX_WON';
    const PlayerO_Won='PLAYERO_WON';
    const TIE='TIE';


    const WiningConditions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function handleResultValidation (){
        let roundWon= false;
        for (let index = 0; index <=7; index++) {
            const WiningCondition=WiningConditions[index];
            const a= board[WiningCondition[0]];
            const b= board[WiningCondition[1]];
            const c= board[WiningCondition[2]];
            if (a===''||b===''||c==='')
            {
                continue;
            }
            if(a===b&&b===c)
            {
                roundWon=true;
                break;
            }
        }
        if(roundWon)
        {
            announce(CurrentPlayer==='X'?PlayerX_Won:PlayerO_Won);
            isGameActive=false;
            return;
        }
        if(!board.includes(''))
         announce(TIE);
    }

    const announce =(type)=>{
        switch (type) {
            case PlayerO_Won:
                announcer.innerHTML='Player <span class="playerO">O </span>Won'
                
                break;
            case PlayerX_Won:
            announcer.innerHTML='Player <span class="playerX">X </span>Won'
            
            break;
        
        case TIE:
            announcer.innerHTML='TIE'
            
            break;
        }
        announcer.classList.remove('hide');
    }
    const isValidAction=(tile)=>{
        if(tile.innerText==='X'||tile.innerText==='O')
        {
            return false;
        }
        return true;
    };

    const updateBoard=(index)=>{
        board[index]=CurrentPlayer;
    };

    const resetBoard =()=>{
         board = ['','','','','','','','',''];
          isGameActive =true;
          announcer.classList.add('hide');

          if(CurrentPlayer==='O')
          {
            changePlayerTurn();
          }
        tiles.forEach(tile=>{
            tile.innerText='';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });

    }

    const changePlayerTurn=()=>{
        playerDisplay.classList.remove(`player${CurrentPlayer}`);
        CurrentPlayer=CurrentPlayer==='X'?'O':'X';
        playerDisplay.innerText=CurrentPlayer;
        playerDisplay.classList.add(`player${CurrentPlayer}`);
    }

    const userAction=(tile,index)=>{
        if(isValidAction(tile)&& isGameActive)
        {
            tile.innerText=CurrentPlayer;
            tile.classList.add(`player${CurrentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayerTurn();
        }
    }

    tiles.forEach((tile,index)=>{
        tile.addEventListener('click',()=>userAction(tile,index));
    });

    resetButton.addEventListener('click',resetBoard);

    

})