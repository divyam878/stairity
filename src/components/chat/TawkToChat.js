"use client";
import { useEffect } from "react";

const TawkToChat = () => {
  useEffect(() => {
    // Tawk.to Script
    var Tawk_API = window.Tawk_API || {};
    var Tawk_LoadStart = new Date();
    
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      // Replace with your Tawk.to Property ID and Widget ID
      // Get these from: Tawk.to Dashboard > Administration > Channels > Chat Widget
      s1.src = "https://embed.tawk.to/695ca3d83baf27197ea4fb60/1je8u023v";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Cleanup on unmount
    return () => {
      // Remove Tawk.to script if needed
      const tawkScript = document.querySelector('script[src*="tawk.to"]');
      if (tawkScript) {
        tawkScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default TawkToChat;
