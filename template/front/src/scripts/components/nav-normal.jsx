let toggled = false;

Util.ready(() => {
  Util.findId('nav-toggle').onclick = () => {
    toggled = !toggled;
    Util.toggleClass(document.body, 'nav-toggled', toggled);
  }
});
