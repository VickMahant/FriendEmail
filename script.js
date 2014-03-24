window.onload = function(){
 //data
   var rawCsvData = "";
   var recordsArray = [];
   var lastNameFirstArray = [];
   var firstNameArray = [];
   var emailArray = [];
   var ajax = new XMLHttpRequest();
   
 //=====================================
   //event handler
   //Select dropdownBox
   id('selectEmail').onchange = function(){
     var i = id('selectEmail').selectedIndex;
       var chosenPerson = id('selectEmail').options[i].text;
       var pieces = chosenPerson.split(',');
       chosenPerson = " "+pieces[0] + " " + pieces[1]+" "+pieces[2];
       var yes = confirm('Send Email ' + pieces[1] + " " + pieces[0]+"?");    
     if(yes){
        
        email(emailArray[i-1]);
     }
     id('selectEmail').selectedIndex = 0;
     
   };
 //ajax event handlers get csv populate email list
 ajax.onload = function()
 {
   if(ajax.status === 200 || ajax.status === 0){
     rawCsvData = ajax.responseText;
     recordsArray = rawCsvData.split("\n");
     createArray(recordsArray);
     populateDropDownList(lastNameFirstArray);
     
   }else{
     alert('not Working');
   }
 
 }
 //=====================================
 //functions
 
   //emails selective person
   function email(name){
     window.location.assign("mailto: " + name);
   }
   //create three arrays
   function createArray(array){
      //create lastnameFirstArray
      for(var i = 1;i < array.length;i++){
        var pieces = array[i].split(",");
        lastNameFirstArray.push(pieces[0]+ ',' +pieces[1]+ ' ' +pieces[2]);        
      }
      lastNameFirstArray.sort();//sort augmented lastNameFirstArray
      /*for(var i = 1;i < array.length;i++){
        var pieces = array[i].split(",");
        firstNameArray.push(pieces[1]+ ',' +pieces[0]+ ' ' +pieces[2]);        
      }
      firstNameArray.sort();*/
      for(var i = 0;i < lastNameFirstArray.length;i++){
        emailArray.push(pieces[1]+ ',' +pieces[0]+ ' ' +pieces[2]);
        
        emailArray[i] = lastNameFirstArray[i]; //assign it to emailArray. swap[1][0] later
        //var swap = emailArray[i].pieces[1].concat(" "+pieces[0]);
        //alert(swap);
        //emailArray.splice(pieces[0],1,pieces[1]);
      }
      
      for(var i = 0;i < lastNameFirstArray.length;i++){
      lastNameFirstArray[i]=lastNameFirstArray[i].replace(/<.*>/g, "");//remove email address
      }
   }

   //populate the Select drop drown list
   function populateDropDownList(lines){
     id('selectEmail').innerHTML = "";
     var heading = document.createTextNode("Choose Below Option");
     var opt0 = document.createElement('option');
     //append textnode to opt0
     opt0.appendChild(heading);
     //now append opt0 to dropdown list
     id('selectEmail').appendChild(opt0);
     
     /*loop through the list of friends
       and add them to the dropdown list
     */
     for(var i=0;i<lines.length;i++){
      //create text node of next friend on the list
      var friend = document.createTextNode(lines[i]);
      //create an option element for that friend
      var opt = document.createElement('option');
      //now append them all to dropdown List
      opt.appendChild(friend);
      id('selectEmail').appendChild(opt);
     }
   }
   //id wrapper
   function id(identifier){
     return document.getElementById(identifier);
   }
   
 //======================================
 //main action
   ajax.open('GET','FriendsList.csv',true);
   ajax.send(null);
}//end of WindowonLoad