// usage:
// "join", "", "", "script", ["action/wb.js"]

if !env.init then {
	env.guests = drrr.users.map((x)=>x.name);
  env.init = true;
}

if env.guests.includes(env.evt.user)
then drrr.print("welcome back, " + env.evt.user)
else env.guests.push(env.evt.user)
