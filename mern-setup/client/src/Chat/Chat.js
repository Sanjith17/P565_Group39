import React, { useEffect } from "react";

const Chat = () => {
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "18ee96d91b091b0440e975e3c2d468446",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      if (!window.kommunicate) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      }
    })(document, window.kommunicate || {});
  }, []);

  return <div></div>;
};

export default Chat;