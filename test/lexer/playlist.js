API_SERVER = "https://drrr-netease.herokuapp.com"

playlists = []
played = []

play_next = () => {
  if playlists.length then {
    curlist = playlists[0]
    if curlist.length then {
      playMusic(curlist[0][0], curlist[0][1])
      played.unshift(curlist[0])
      curlist.shift()
      if !curlist.length then playlist.shift()
    }
  }
}

play_prev = () => {
  if played.length < 2
  then {
    if !playlists.length
    then playlists.push([])
    playlists[0].unshift(played[0])
    played.shift()
    playlists[0].unshift(played[0])
    played.shift()
    play_next()
  }
  else drrr.print("no previous song")
}

play_repeat = () => {
  if played.length
  then {
    if !playlists.length
    then playlists.push([])
    playlists[0].unshift(played[0])
    played.shift()
    play_next()
  }
  else drrr.print("no song played")
}

event musicend {
  print("music end")
  play_next()
}

try_next = () => {
  sendTab({
    fn: is_playing
  }, false, (status) => {
    active = status[0]
    after = status[1]
    console.log(active, after);
    if !active
    then play_next()
    else print("there's a song playing")
  })
}

fetch_list = id => {
  url = API_SERVER + "/playlist/detail?id=" + id
  print(url)
  $.get(url, d => {
    playlist = d.playlist
    songs = playlist.trackIds.map(track => track.id)
    message = playlist.name + "(" + songs.length + ")"+ "\n" + playlist.description
    drrr.print(message, playlist.coverImgUrl)
    $.get(API_SERVER + "/song/detail?ids=" + songs.join(","),
      data => {
        playlists.push(data.songs.map(s => [s.name, "網 " + s.id]))
        try_next()
      }
    )
  })
}

event [msg, me, dm] (user, cont: "^/list \\d+\\s*$") => {
  fetch_list(cont.split(" ")[1])
}

event [msg, me, dm] (user, cont: "^/next\\s*$") => {
  play_next()
}

event [msg, me, dm] (user, cont: "^/prev\\s*$") => {
  play_prev()
}

event [msg, me, dm] (user, cont: "^/repeat\\s*$") => {
  play_repeat()
}

event [msg, me, dm] (user, cont: "^/del \\d+\\s*$") => {
  if playlists.length then
    playlists[0].splice(parseInt(cont.split(" ")[1]), 1);
  else drrr.print("no playlist now")
}

event [msg, me, dm] (user, cont: "^/dellist \\d+\\s*$") => {
  playlists.splice(parseInt(cont.split(" ")[1]), 1);
}

event [msg, me, dm] (user, cont: "^/list\\s*$") => {
  if playlists.length
  then {
    msg = "current playlist:\n"
    msg += playlists[0]
      .slice(0, 8)
      .map((x, idx) => String(idx) + ". " + x[0])
      .join("\n")
    if playlists[0].length > 8 then
      msg += " ... ..."

    rest = playlists.slice(1)
    if rest.length then
      msg += rest.map((li, idx)
        => "\nplaylist" + (idx + 1) + ": (" + li.length + ")")
    drrr.print(msg)
  }
  else drrr.print("no playlist now")
}

// fetch_list("3005581883")
