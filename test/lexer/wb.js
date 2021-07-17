// usage:
//   welcome_back();

welcome_back = () => {
  guests = drrr.users.map((x)=>x.name);
  event join (user) => {
    if( guests.includes(user)
   ) drrr.print("welcome back, " + user)
    else guests.push(user)
  }
}
