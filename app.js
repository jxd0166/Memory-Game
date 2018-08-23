/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 
   let moves = 0;
   let toggledCards =[];
   let clockOff= true;
   let time= 0;
   let clockId;
   let matched= 0;


 time=0;
 displayTimer();
 moves=0;
 scoreChecker();
 writeModalStats()
 toggleModal();


 const deck= document.querySelector('.deck');

 function writeModalStats(){
   const timeStat = document.querySelector('.m_time')
   const clockTime = document.querySelector('.clock').innerHTML;
   const movesStat = document.querySelector('.m_moves');
   const starsStat = document.querySelector('.m_stars');
   const stars = getStars();

   timeStat.innerHTML = `Time = ${clockTime}`;
   movesStat.innerHTML =`Moves = ${moves}`;
   starsStat.innerHTML =`Stars = ${stars}`;
 }



 document.querySelector('.modal_cancel').addEventListener('click', ()=> {
 toggleModal();
 });

 document.querySelector('.modal_replay').addEventListener('click', replayGame);

 document.querySelector('.restart').addEventListener('click', resetGame);



 function checkForMatch() {
     if (
         toggledCards[0].firstElementChild.className ===
         toggledCards[1].firstElementChild.className
     )
     {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards =[];
        matched++;
        const total_pairs = 8;
        if(matched === total_pairs){
        gameOver();
        }
      }else{
        setTimeout(() => {
        toggleCard(toggledCards[0]);
        toggleCard(toggledCards[1]);
        toggledCards=[];

      }, 1000);
   }
 }


 function gameOver(){
   stopClock();
   writeModalStats();
   toggleModal();
 }

 function replayGame(){
   resetGame();
   toggleModal();
   resetCards();
   location.reload(true);
 }


 function resetGame(){
   resetTimeAndClock();
   resetMoves();
   resetStars();
   shuffleDeck();
   resetCards();
   location.reload(true);
 }

 function resetCards(){
   const cards=document.querySelectorAll('.deck li');
   for (let card of cards){
     card.className='card';
   }
 }

 function resetTimeAndClock(){
   stopClock();
   clockOff=true;
   time=0;
   displayTimer();
 }

 function resetMoves(){
   moves= 0;
   document.querySelector('.moves').innerHTML = moves;
 }

 function resetStars(){
   stars=0;
   const starList = document.querySelectorAll('.stars li');
   for (star of starList){
     star.style.display = 'inline';
   }
 }

 function getStars() {
   stars= document.querySelectorAll('.stars li');
   starCount = 0;
   for (star of stars){
     if (star.style.display !== 'none'){
       starCount++;
     }
   }
 return starCount;
 }


 function toggleModal(){
   const modal= document.querySelector('.modal__background');
   modal.classList.toggle('hide');
 }
 toggleModal()


 function scoreChecker(){
   if (moves ===12 || moves ===26)
 {removeStar();
 }
 }


 function removeStar(){
   const starList = document.querySelectorAll('.stars li');
   for (star of starList){
     if(star.style.display !== 'none'){
       star.style.display = 'none';
       break;
     }
   }
 }

 function displayTimer(){
   const clock= document.querySelector('.clock');
   clock.innerHTML=time;
 const minutes= Math.floor(time/60);
 const seconds= time % 60;
 if (seconds < 10){
   clock.innerHTML= `${minutes}:0${seconds}`;
 }else{
   clock.innerHTML = `${minutes}:${seconds}`;
   console.log(clock);
 }
 }

 function setTimer(){
   clockId = setInterval(() => {
     time++;
     displayTimer();
 console.log(time);
   },1000);
 }

 function stopClock(){
   clearInterval(clockId);
 }


 function shuffleDeck() {
   const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
   const shuffledCards = shuffle(cardsToShuffle);
   for (card of shuffledCards) {
     deck.appendChild(card);
   }
 }
 shuffleDeck();

 function addMove() {
   moves++;
   const movesText = document.querySelector('.moves');
   movesText.innerHTML = moves;
 }


 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }

 deck.addEventListener('click', function(event) {
 const clickTarget= event.target;
 if (isClickValid(clickTarget)){
 if (clockOff) {
   setTimer();
   clockOff=false;
 }
   toggleCard(clickTarget);
   addToggleCard(clickTarget);
   if(toggledCards.length ===2){
     checkForMatch();
     addMove();
     scoreChecker();
     }
 }
 });

 function toggleCard(card){
   card.classList.toggle('open');
   card.classList.toggle('show');
 }

 function addToggleCard(clickTarget){
   toggledCards.push(clickTarget);
   console.log(toggledCards);
 }

 function isClickValid(clickTarget){
   return(
     clickTarget.classList.contains('card') &&
     !clickTarget.classList.contains('match') &&
     toggledCards.length < 2 &&
     !toggledCards.includes(clickTarget)
   );
 }

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
