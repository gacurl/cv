(function(){
  const key = "ct-theme";
  const root = document.documentElement;
  function apply(theme){
    const sun  = document.getElementById("ct-icon-sun");
    const moon = document.getElementById("ct-icon-moon");
    if(theme === "dark"){ root.setAttribute("data-theme","dark"); if(sun) sun.style.display="none"; if(moon) moon.style.display="block"; }
    else { root.removeAttribute("data-theme"); if(sun) sun.style.display="block"; if(moon) moon.style.display="none"; }
    localStorage.setItem(key, theme);
  }
  const saved = localStorage.getItem(key);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  apply(saved ? saved : (prefersDark ? "dark" : "light"));
  const btn = document.getElementById("ct-theme-toggle");
  if(btn) btn.addEventListener("click", ()=> apply(root.getAttribute("data-theme")==="dark" ? "light" : "dark"));
})();
