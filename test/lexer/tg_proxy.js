urlfmt = (fix, e) => fix + e.user + fix + ": " + e.text + (if e.url then "[URL](" + e.url + ")" else "")

log2mkd = (type, e) => {
  //type, user, text, url
  console.log("log data", e);
  if(type === event_msg)
    then urlfmt("*", e)
  else if(type === event_me)
    then urlfmt("_", e)
  else if(type === event_dm)
    then urlfmt("", e)
  else if(type === event_join)
    then e.user + " join the room"
  else if(type === event_leave)
    then e.user + " leave the room"
  else if(type === event_newhost)
    then e.user + " become the room owner"
}

sendTg = (token, chat_id, type, e) => {
  $.ajax({
    "type": "POST",
    "url": "https://api.telegram.org/bot" + token + "/sendMessage",
    "dataType": "json",
    "data": {
      "chat_id": chat_id,
      "text": log2mkd(type, e),
      "parse_mode": "Markdown",
      "disable_web_page_preview": false,
    },
    "success": (data) => console.log("logged:", data),
    "error": (data) => console.log("failed:", data)
  });
}

update = (token) => {
  $.ajax({
    "type": "GET",
    "url": "https://api.telegram.org/bot" + token + "/getUpdates",
    "dataType": "json",
    "success": (data) => {
      if(data.ok) then {
        print(data)
      }
    },
    "error": (err) => {
      data = err.responseJSON
      print(data)
    }
  });
}
